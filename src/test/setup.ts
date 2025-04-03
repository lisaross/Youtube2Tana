import { vi } from 'vitest';

// Mock browser environment
vi.stubGlobal('window', {
  location: {
    href: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
});

// Mock console methods
vi.spyOn(console, 'log');
vi.spyOn(console, 'error');
vi.spyOn(console, 'warn'); 