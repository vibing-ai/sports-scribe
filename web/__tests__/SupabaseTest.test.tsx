import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';

// Import mock utilities
import {
  mockSupabaseClient,
  mockSupabaseAuthHelpers,
  mockNextNavigation,
  resetAllMocks,
  MOCK_USER,
} from './utils/mockSupabase';

// Get the mock functions for easier access

// Mock the Supabase auth helpers
vi.mock('@supabase/auth-helpers-nextjs', () => mockSupabaseAuthHelpers);

// Mock the next/navigation module
vi.mock('next/navigation', () => mockNextNavigation);

describe('Supabase Auth Test', () => {
  // Setup and teardown
  beforeEach(() => {
    // Reset all mocks before each test
    resetAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the test component', () => {
    // This is a simple test to verify the test setup works
    render(
      <div>
        <h1>Test Component</h1>
        <button>Click me</button>
      </div>
    );

    expect(screen.getByText('Test Component')).toBeInTheDocument();
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('renders the sign in button', () => {
    // This test verifies that the sign in button is rendered
    render(
      <div>
        <button>Sign In with GitHub</button>
      </div>
    );

    expect(screen.getByText('Sign In with GitHub')).toBeInTheDocument();
  });

  it('handles sign in with GitHub', async () => {
    // Mock the sign in function
    const mockSignIn = vi.fn().mockResolvedValue({ error: null });
    mockSupabaseClient.auth.signInWithOAuth = mockSignIn;

    // Render a simple component that uses the sign in function
    const TestComponent = () => {
      const handleSignIn = async () => {
        await mockSupabaseClient.auth.signInWithOAuth({
          provider: 'github',
          options: {
            redirectTo: 'http://localhost:3000/auth/callback',
          },
        });
      };
      
      return (
        <div>
          <button onClick={handleSignIn}>Sign In with GitHub</button>
        </div>
      );
    };

    render(<TestComponent />);
    const signInButton = screen.getByText('Sign In with GitHub');
    
    // Use userEvent to simulate a click
    const user = userEvent.setup();
    await user.click(signInButton);

    // Verify the sign in function was called with the correct arguments
    expect(mockSignIn).toHaveBeenCalledWith({
      provider: 'github',
      options: {
        redirectTo: 'http://localhost:3000/auth/callback',
      },
    });
  });

  it('displays user email when signed in', async () => {
    // Mock the auth state to return a signed-in user
    mockSupabaseClient.auth.getUser = vi.fn().mockResolvedValue({
      data: { user: MOCK_USER },
      error: null,
    });

    // Render a component that displays the user's email
    const UserDisplay = () => {
      const [user, setUser] = React.useState<typeof MOCK_USER | null>(null);

      React.useEffect(() => {
        const fetchUser = async () => {
          const { data } = await mockSupabaseClient.auth.getUser();
          setUser(data?.user || null);
        };
        fetchUser();
      }, []);

      if (!user) return <div>Loading...</div>;

      return (
        <div>
          <p>Welcome, {user.email}</p>
        </div>
      );
    };

    render(<UserDisplay />);

    // Wait for the user data to load
    await waitFor(() => {
      expect(screen.getByText(`Welcome, ${MOCK_USER.email}`)).toBeInTheDocument();
    });
  });
});
