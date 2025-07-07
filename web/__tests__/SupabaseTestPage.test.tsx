import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SupabaseTestPage from '../app/test-supabase/page';

// Mock the child components
vi.mock('@/components/test/AuthSection', () => ({
  AuthSection: () => <div data-testid="auth-section">Auth Section</div>
}));

vi.mock('@/components/test/TestControls', () => ({
  TestControls: ({ onResult, onTestComplete }: { onResult: (result: string) => void, onTestComplete: () => void }) => (
    <div data-testid="test-controls">
      <button 
        onClick={() => {
          onResult('Test result');
          onTestComplete();
        }}
      >
        Run Test
      </button>
    </div>
  )
}));

vi.mock('@/components/test/ResultsPanel', () => ({
  ResultsPanel: ({ result }: { result: string }) => (
    <div data-testid="results-panel">
      {result ? <div>Result: {result}</div> : <div>No results yet</div>}
    </div>
  )
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

describe('SupabaseTestPage', () => {
  it('renders the main components', () => {
    render(<SupabaseTestPage />);
    
    expect(screen.getByTestId('auth-section')).toBeInTheDocument();
    expect(screen.getByTestId('test-controls')).toBeInTheDocument();
    expect(screen.getByTestId('results-panel')).toBeInTheDocument();
  });

  it('displays the articles section', () => {
    render(<SupabaseTestPage />);
    
    expect(screen.getByText('Latest Articles')).toBeInTheDocument();
    expect(screen.getByText('0 articles found')).toBeInTheDocument();
  });

  it('handles test completion', async () => {
    render(<SupabaseTestPage />);
    
    // Initially should show no results
    expect(screen.getByText('No results yet')).toBeInTheDocument();
    
    // Click the test button
    await userEvent.click(screen.getByText('Run Test'));
    
    // Should now show the test result
    expect(await screen.findByText('Result: Test result')).toBeInTheDocument();
  });
});
