import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserExtension } from '@raycast/api';
import { browserWrapper } from '../browserWrapper';

// Define types for mocked functions
type MockedBrowserExtension = {
  getTabs: vi.Mock;
  getContent: vi.Mock;
};

// Mock the BrowserExtension module
vi.mock('@raycast/api', () => ({
  BrowserExtension: {
    getTabs: vi.fn(),
    getContent: vi.fn(),
  },
}));

describe('Browser Wrapper', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should get tabs using BrowserExtension', async () => {
    const mockTabs = [
      { id: 1, active: true, url: 'https://youtube.com', title: 'YouTube' },
      { id: 2, active: false, url: 'https://google.com', title: 'Google' },
    ];

    (BrowserExtension.getTabs as MockedBrowserExtension['getTabs']).mockResolvedValue(mockTabs);

    const result = await browserWrapper.getTabs();
    expect(result).toEqual(mockTabs);
    expect(BrowserExtension.getTabs).toHaveBeenCalledTimes(1);
  });

  it('should get content with default format', async () => {
    const mockContent = 'Test content';
    const mockSelector = '#test-element';

    (BrowserExtension.getContent as MockedBrowserExtension['getContent']).mockResolvedValue(mockContent);

    const result = await browserWrapper.getContent({ cssSelector: mockSelector });
    expect(result).toBe(mockContent);
    expect(BrowserExtension.getContent).toHaveBeenCalledWith({
      cssSelector: mockSelector,
      format: 'text',
    });
  });

  it('should get content with specified format', async () => {
    const mockContent = '<div>Test content</div>';
    const mockSelector = '#test-element';
    const mockFormat = 'html';

    (BrowserExtension.getContent as MockedBrowserExtension['getContent']).mockResolvedValue(mockContent);

    const result = await browserWrapper.getContent({ 
      cssSelector: mockSelector,
      format: mockFormat,
    });
    expect(result).toBe(mockContent);
    expect(BrowserExtension.getContent).toHaveBeenCalledWith({
      cssSelector: mockSelector,
      format: 'html',
    });
  });

  it('should handle errors from BrowserExtension', async () => {
    const mockError = new Error('Failed to get content');
    (BrowserExtension.getContent as MockedBrowserExtension['getContent']).mockRejectedValue(mockError);

    await expect(browserWrapper.getContent({ cssSelector: '#test' }))
      .rejects
      .toThrow('Failed to get content');
  });
}); 