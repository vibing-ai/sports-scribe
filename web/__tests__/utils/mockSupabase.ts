import { vi } from 'vitest';
import { User } from '@supabase/supabase-js';

// Define types for our mocks
interface MockUser extends Partial<User> {
  id: string;
  email: string;
  user_metadata: { name: string };
  app_metadata: { provider: string };
  created_at: string;
  aud: string;
  role: string;
  confirmed_at: string;
  last_sign_in_at: string;
  phone: string;
  identities: any[];
  updated_at: string;
}

export interface MockArticle {
  id: string;
  title: string;
  content: string;
  status: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  tags: string[];
}

// Mock user data
export const MOCK_USER: MockUser = {
  id: 'user-123',
  email: 'test@example.com',
  user_metadata: { name: 'Test User' },
  app_metadata: { provider: 'github' },
  created_at: new Date().toISOString(),
  aud: 'authenticated',
  role: 'authenticated',
  confirmed_at: new Date().toISOString(),
  last_sign_in_at: new Date().toISOString(),
  phone: '',
  identities: [],
  updated_at: new Date().toISOString(),
} as const;

// Mock article data
export const MOCK_ARTICLE = {
  id: 'article-123',
  title: 'Test Article',
  content: 'This is a test article',
  status: 'published',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  user_id: 'user-123',
  tags: ['test', 'example'],
};

// Mock responses
const MOCK_RESPONSES = {
  signIn: { error: null },
  signOut: { error: null },
  getUser: {
    data: { user: MOCK_USER },
    error: null,
  },
  authState: {
    event: 'SIGNED_IN' as const,
    session: { user: MOCK_USER },
  },
  rpc: {
    data: 'pong',
    error: null,
  },
  articles: {
    data: [MOCK_ARTICLE],
    error: null,
  },
} as const;

// Create mock Supabase client
export const createMockSupabaseClient = () => {
  const mockSignInWithOAuth = vi.fn().mockResolvedValue(MOCK_RESPONSES.signIn);
  const mockSignOut = vi.fn().mockResolvedValue(MOCK_RESPONSES.signOut);
  const mockGetUser = vi.fn().mockResolvedValue(MOCK_RESPONSES.getUser);
  const mockOnAuthStateChange = vi.fn((callback) => {
    // Simulate auth state change after a short delay
    setTimeout(() => {
      callback('SIGNED_IN', { user: MOCK_USER });
    }, 100);
    return { data: { subscription: { unsubscribe: vi.fn() } } };
  });

  const mockFrom = vi.fn().mockReturnThis();
  const mockSelect = vi.fn().mockReturnThis();
  const mockInsert = vi.fn().mockResolvedValue({ data: [MOCK_ARTICLE], error: null });
  const mockUpdate = vi.fn().mockReturnThis();
  const mockDelete = vi.fn().mockResolvedValue({ data: null, error: null });
  const mockEq = vi.fn().mockReturnThis();
  const mockLimit = vi.fn().mockReturnThis();
  const mockOrder = vi.fn().mockReturnThis();
  const mockRpc = vi.fn().mockResolvedValue(MOCK_RESPONSES.rpc);

  // Setup the chainable methods
  mockFrom.mockImplementation(() => ({
    select: mockSelect,
    insert: mockInsert,
    update: mockUpdate,
    delete: mockDelete,
    eq: mockEq,
    limit: mockLimit,
    order: mockOrder,
  }));

  mockSelect.mockImplementation(() => ({
    eq: mockEq,
    limit: mockLimit,
    order: mockOrder,
  }));

  mockUpdate.mockImplementation(() => ({
    eq: mockEq,
  }));

  mockEq.mockImplementation(() => ({
    select: mockSelect,
    update: mockUpdate,
    delete: mockDelete,
  }));

  mockLimit.mockImplementation(() => ({
    order: mockOrder,
  }));

  mockOrder.mockImplementation(() => ({
    limit: mockLimit,
  }));

  return {
    auth: {
      signInWithOAuth: mockSignInWithOAuth,
      signOut: mockSignOut,
      getUser: mockGetUser,
      onAuthStateChange: mockOnAuthStateChange,
    },
    from: mockFrom,
    select: mockSelect,
    insert: mockInsert,
    update: mockUpdate,
    delete: mockDelete,
    eq: mockEq,
    limit: mockLimit,
    order: mockOrder,
    rpc: mockRpc,
    _mocks: {
      signInWithOAuth: mockSignInWithOAuth,
      signOut: mockSignOut,
      getUser: mockGetUser,
      onAuthStateChange: mockOnAuthStateChange,
      from: mockFrom,
      select: mockSelect,
      insert: mockInsert,
      update: mockUpdate,
      delete: mockDelete,
      eq: mockEq,
      limit: mockLimit,
      order: mockOrder,
      rpc: mockRpc,
    },
  };
};

export const mockSupabaseClient = createMockSupabaseClient();

export const mockSupabaseAuthHelpers = {
  createClientComponentClient: vi.fn(() => mockSupabaseClient),
};

export const mockNextNavigation = {
  useRouter: vi.fn(() => ({
    push: vi.fn(),
    replace: vi.fn(),
    refresh: vi.fn(),
  })),
  usePathname: vi.fn(() => '/test-supabase'),
};

export const resetAllMocks = () => {
  // Clear all mocks at once
  vi.clearAllMocks();
  
  // Reset any specific mocks that need special handling
  if (mockSupabaseClient._mocks) {
    mockSupabaseClient._mocks = {
      ...mockSupabaseClient._mocks,
      // Reset any specific mocks that need to be recreated
      onAuthStateChange: vi.fn((callback) => {
        // Simulate auth state change after a short delay
        setTimeout(() => {
          callback('SIGNED_IN', { user: MOCK_USER });
        }, 100);
        return { data: { subscription: { unsubscribe: vi.fn() } } };
      })
    };
  }
};

export type MockSupabaseClient = ReturnType<typeof createMockSupabaseClient>;
