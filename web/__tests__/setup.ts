import '@testing-library/jest-dom/vitest';
import { vi, afterEach, beforeAll } from 'vitest';
import { cleanup } from '@testing-library/react';

// Mock environment variables
process.env.NEXT_PUBLIC_SUPABASE_URL = 'http://test-url';
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-key';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    refresh: vi.fn(),
  }),
  useSearchParams: () => ({
    get: vi.fn(),
  }),
  usePathname: () => '/',
}));

// Mock @supabase/supabase-js
vi.mock('@supabase/supabase-js', async () => {
  const actual = await vi.importActual('@supabase/supabase-js');
  return {
    ...actual,
    createClient: vi.fn(() => ({
      auth: {
        signInWithOAuth: vi.fn().mockResolvedValue({ error: null }),
        signOut: vi.fn().mockResolvedValue({ error: null }),
        onAuthStateChange: vi.fn((callback) => {
          // Simulate no user initially
          callback('SIGNED_OUT', null);
          return { 
            data: { 
              subscription: { 
                id: 'test-subscription',
                callback: vi.fn(),
                unsubscribe: vi.fn(),
                startedAt: Date.now(),
                stopped: false
              } 
            } 
          };
        }),
        getUser: vi.fn().mockResolvedValue({ data: { user: null }, error: null }),
      },
      from: vi.fn().mockReturnThis(),
      select: vi.fn().mockReturnThis(),
      insert: vi.fn().mockReturnThis(),
      update: vi.fn().mockReturnThis(),
      delete: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      limit: vi.fn().mockReturnThis(),
      order: vi.fn().mockReturnThis(),
      rpc: vi.fn(),
    })),
  };
});

// Mock next/dynamic
vi.mock('next/dynamic', () => ({
  __esModule: true,
  default: vi.fn().mockImplementation(() => vi.fn().mockReturnValue(null)),
}));

// Mock next/head
vi.mock('next/head', () => {
  const React = require('react');
  const Head = ({ children }: { children: React.ReactNode }) => {
    return React.createElement(React.Fragment, null, children);
  };
  
  return {
    __esModule: true,
    default: Head,
  };
});

// Clean up after each test
afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

// Set up global variables for testing
beforeAll(() => {
  // Mock ResizeObserver
  global.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));

  // Mock matchMedia
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});
