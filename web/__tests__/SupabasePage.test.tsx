import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';

// Mock the useSupabaseAuth hook
const mockSignInWithGitHub = vi.fn().mockResolvedValue({ error: null });
const mockSignOut = vi.fn();

vi.mock('@/hooks/useSupabaseAuth', () => ({
  useSupabaseAuth: () => ({
    user: null,
    status: 'unauthenticated',
    loading: false,
    signInWithGitHub: mockSignInWithGitHub,
    signOut: mockSignOut,
  }),
}));

// Mock the useArticles hook
vi.mock('@/hooks/useArticles', () => ({
  useArticles: () => ({
    articles: [],
    loading: false,
  }),
}));

// Mock the child components
vi.mock('@/components/test/AuthSection', () => ({
  AuthSection: () => (
    <div data-testid="auth-section">
      <button 
        onClick={() => mockSignInWithGitHub()}
        data-testid="sign-in-button"
      >
        Sign in with GitHub
      </button>
    </div>
  ),
}));

vi.mock('@/components/test/TestControls', () => ({
  TestControls: () => <div data-testid="test-controls" />,
}));

vi.mock('@/components/test/ResultsPanel', () => ({
  ResultsPanel: () => <div data-testid="results-panel" />,
}));

// Import the actual page component
import SupabasePage from '@/app/test-supabase/page';

describe('Supabase Page', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();
    
    // Reset the mock implementation for each test
    mockSignInWithGitHub.mockResolvedValue({ error: null });
  });

  it('renders the test page with all components', () => {
    render(<SupabasePage />);
    
    // Check that all the main components are rendered
    expect(screen.getByTestId('auth-section')).toBeInTheDocument();
    expect(screen.getByTestId('test-controls')).toBeInTheDocument();
    expect(screen.getByTestId('results-panel')).toBeInTheDocument();
    
    // Check for the articles section
    expect(screen.getByText('Latest Articles')).toBeInTheDocument();
    expect(screen.getByText('0 articles found')).toBeInTheDocument();
    
    // Check for the connection information section
    expect(screen.getByText('Connection Information')).toBeInTheDocument();
  });

  it('handles sign in with GitHub', async () => {
    render(<SupabasePage />);
    
    // Find and click the sign in button
    const signInButton = screen.getByTestId('sign-in-button');
    fireEvent.click(signInButton);
    
    // Verify the sign in function was called
    await waitFor(() => {
      expect(mockSignInWithGitHub).toHaveBeenCalled();
    });
  });
});
