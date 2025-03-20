import { BrowserExtension } from '@raycast/api';

export interface BrowserAPI {
  getTabs: () => Promise<Array<{
    id: number;
    active: boolean;
    url?: string;
    title?: string;
  }>>;
  getContent: (options: { cssSelector?: string; format?: string; }) => Promise<string>;
}

/**
 * A wrapper around Raycast's BrowserExtension API that implements our BrowserAPI interface
 */
export const browserWrapper: BrowserAPI = {
  getTabs: async () => {
    return BrowserExtension.getTabs();
  },
  getContent: async ({ cssSelector, format = 'text' }) => {
    return BrowserExtension.getContent({
      cssSelector,
      format: format as 'text' | 'html' | 'markdown',
    });
  },
}; 