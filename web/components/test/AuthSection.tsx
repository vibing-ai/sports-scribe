import { Button } from '@nextui-org/react';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';

export const AuthSection = () => {
  const { user, status, loading, signInWithGitHub, signOut } = useSupabaseAuth();

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Supabase Connection Test</h1>
        <p className="text-sm text-gray-500 mt-1">Test your Supabase integration and database operations</p>
      </div>
      
      {status === 'authenticated' && user ? (
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="flex items-center">
            <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
            <span className="text-sm text-gray-700">Signed in as: {user.email}</span>
          </div>
          <Button 
            onClick={signOut}
            disabled={loading}
            size="sm"
            variant="ghost"
            className="border border-gray-200 hover:bg-gray-50"
          >
            Sign Out
          </Button>
        </div>
      ) : (
        <Button 
          onClick={signInWithGitHub}
          disabled={loading || status === 'checking'}
          size="sm"
          className="bg-gray-900 text-white hover:bg-gray-800"
        >
          {loading ? 'Signing in...' : 'Sign in with GitHub'}
        </Button>
      )}
    </div>
  );
};
