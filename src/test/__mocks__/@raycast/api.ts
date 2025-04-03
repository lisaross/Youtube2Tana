import { vi } from 'vitest';

export const BrowserExtension = {
  getTabs: vi.fn(),
  getContent: vi.fn(),
};

export const Toast = {
  Style: {
    Failure: 'failure',
  },
};

export const showToast = vi.fn(); 