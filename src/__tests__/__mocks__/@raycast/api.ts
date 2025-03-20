import { vi } from 'vitest';

type MockContent = {
  [key: string]: string;
};

export const BrowserExtension = {
  getTabs: vi.fn().mockResolvedValue([
    {
      id: 1,
      active: true,
      url: 'https://www.youtube.com/watch?v=test123',
      title: 'Test Video Title',
    },
  ]),
  getContent: vi.fn().mockImplementation(({ cssSelector }: { cssSelector: string }) => {
    const mockContent: MockContent = {
      'h1.ytd-video-primary-info-renderer': 'Test Video Title',
      'ytd-channel-name yt-formatted-string': 'Test Channel',
      'ytd-channel-name a': 'https://youtube.com/channel/test',
      'ytd-expander#description': 'Test Description',
    };
    return Promise.resolve(mockContent[cssSelector] || '');
  }),
}; 