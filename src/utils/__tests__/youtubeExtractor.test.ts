import { describe, it, expect, vi, beforeEach } from 'vitest';
import { extractVideoInfo } from '../youtubeExtractor';
import { VideoInfo } from '../../types/video';
import { BrowserExtension, showToast } from '@raycast/api';

// Define types for mocked functions
type MockedFunction<T extends (...args: Parameters<T>) => ReturnType<T>> = {
  (...args: Parameters<T>): ReturnType<T>;
  mockResolvedValue: (value: Awaited<ReturnType<T>>) => void;
  mockResolvedValueOnce: (value: Awaited<ReturnType<T>>) => void;
};

// Define test data
const mockTab = {
  id: 1,
  active: true,
  url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  title: 'Test Video',
};

const mockGoogleTab = {
  id: 2,
  active: true,
  url: 'https://www.google.com',
  title: 'Google',
};

// Mock the @raycast/api module
vi.mock('@raycast/api', () => {
  return {
    BrowserExtension: {
      getTabs: vi.fn().mockImplementation(async () => Promise.resolve([])),
      getContent: vi.fn().mockImplementation(async () => Promise.resolve('')),
    },
    Toast: {
      Style: {
        Failure: 'failure',
      },
    },
    showToast: vi.fn().mockImplementation(async () => Promise.resolve()),
  };
});

// Type the mocked functions
const mockedGetTabs = BrowserExtension.getTabs as unknown as MockedFunction<typeof BrowserExtension.getTabs>;
const mockedGetContent = BrowserExtension.getContent as unknown as MockedFunction<typeof BrowserExtension.getContent>;
const mockedShowToast = showToast as unknown as MockedFunction<typeof showToast>;

describe('YouTube Extractor', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should extract video information from a valid YouTube URL', async () => {
    // Mock browser tab data
    mockedGetTabs.mockResolvedValue([mockTab]);

    // Mock content extraction
    mockedGetContent
      .mockResolvedValueOnce('Test Video Title') // Title
      .mockResolvedValueOnce('<a href="/channel/UC123">Test Channel</a>') // Channel element
      .mockResolvedValueOnce('Test video description'); // Description

    const expected: VideoInfo = {
      title: 'Test Video Title',
      channelName: 'Test Channel',
      channelUrl: 'https://www.youtube.com/channel/UC123',
      url: mockTab.url,
      description: 'Test video description',
    };

    const result = await extractVideoInfo();
    expect(result).toEqual(expected);
  });

  it('should throw an error when not on a YouTube video page', async () => {
    mockedGetTabs.mockResolvedValue([mockGoogleTab]);

    await expect(extractVideoInfo()).rejects.toThrow(
      'Not a YouTube video page. Please make sure you have a YouTube video page open and active.'
    );
    expect(mockedShowToast).toHaveBeenCalledWith(expect.objectContaining({
      style: 'failure',
      title: 'Failed to extract video information',
      message: 'Not a YouTube video page. Please make sure you have a YouTube video page open and active.',
    }));
  });

  it('should handle missing title gracefully', async () => {
    mockedGetTabs.mockResolvedValue([mockTab]);
    mockedGetContent.mockResolvedValueOnce('');

    await expect(extractVideoInfo()).rejects.toThrow(
      'Could not find video title. Please make sure the video page is fully loaded.'
    );
    expect(mockedShowToast).toHaveBeenCalledWith(expect.objectContaining({
      style: 'failure',
      title: 'Failed to extract video information',
      message: 'Could not find video title. Please make sure the video page is fully loaded.',
    }));
  });

  it('should handle missing channel information gracefully', async () => {
    mockedGetTabs.mockResolvedValue([mockTab]);
    mockedGetContent
      .mockResolvedValueOnce('Test Video Title')
      .mockResolvedValueOnce('');

    await expect(extractVideoInfo()).rejects.toThrow(
      'Could not find channel information. Please make sure the video page is fully loaded.'
    );
    expect(mockedShowToast).toHaveBeenCalledWith(expect.objectContaining({
      style: 'failure',
      title: 'Failed to extract video information',
      message: 'Could not find channel information. Please make sure the video page is fully loaded.',
    }));
  });

  it('should clean up description text properly', async () => {
    mockedGetTabs.mockResolvedValue([mockTab]);
    mockedGetContent
      .mockResolvedValueOnce('Test Video Title')
      .mockResolvedValueOnce('<a href="/channel/UC123">Test Channel</a>')
      .mockResolvedValueOnce('Show more\nTest description\nShow less');

    const result = await extractVideoInfo();
    expect(result.description).toBe('Test description');
  });
}); 