import { vi } from 'vitest';

export const createMockSupabaseClient = () => {
  const mockUnsubscribe = vi.fn();
  
  return {
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
              unsubscribe: mockUnsubscribe,
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
  };
};

const mockSupabaseClient = createMockSupabaseClient();

export const createClient = vi.fn(() => mockSupabaseClient);

export const resetMocks = () => {
  const newMock = createMockSupabaseClient();
  Object.assign(mockSupabaseClient, newMock);
};

export default mockSupabaseClient;
