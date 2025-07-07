import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';

// Mock the child components
vi.mock('@/components/test/AuthSection', () => ({
  AuthSection: () => <div data-testid="auth-section">Auth Section</div>
}));

vi.mock('@/components/test/TestControls', () => ({
  TestControls: () => <div data-testid="test-controls">Test Controls</div>
}));

vi.mock('@/components/test/ResultsPanel', () => ({
  ResultsPanel: () => <div data-testid="results-panel">Results Panel</div>
}));

// Mock the hooks
vi.mock('@/hooks/useSupabaseAuth', () => ({
  useSupabaseAuth: () => ({
    user: null,
    loading: false
  })
}));

vi.mock('@/hooks/useArticles', () => ({
  useArticles: () => ({
    articles: [],
    loading: false
  })
}));

describe('SupabaseTest', () => {
  it('renders the main components', async () => {
    // Dynamically import the component to ensure it's using our mocks
    const SupabaseTest = (await import('@/app/test-supabase/page')).default;
    
    render(<SupabaseTest />);
    
    // Check that the main components are rendered
    expect(screen.getByTestId('auth-section')).toBeInTheDocument();
    expect(screen.getByTestId('test-controls')).toBeInTheDocument();
    expect(screen.getByTestId('results-panel')).toBeInTheDocument();
  });

  it('displays the articles section', async () => {
    // Dynamically import the component to ensure it's using our mocks
    const SupabaseTest = (await import('@/app/test-supabase/page')).default;
    
    render(<SupabaseTest />);
    
    // Check that the articles section is displayed
    expect(screen.getByText('Latest Articles')).toBeInTheDocument();
    expect(screen.getByText('0 articles found')).toBeInTheDocument();
  });
});
