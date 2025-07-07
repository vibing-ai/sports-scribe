import { Button } from '@heroui/react';
import { useArticles } from '@/hooks/useArticles';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';

type TestControlsProps = {
  onResult: (message: string) => void;
  onTestComplete: () => void;
};

export const TestControls = ({ onResult, onTestComplete }: TestControlsProps) => {
  const { user } = useSupabaseAuth();
  const { 
    loading, 
    testDatabaseConnection, 
    createTestArticle, 
    cleanupTestData,
    createdTestArticles 
  } = useArticles(user?.id);

  const handleTestConnection = async () => {
    if (!user) {
      onResult('⚠️ Please sign in first');
      return;
    }

    try {
      onResult('🔍 Testing database connection...');
      const result = await testDatabaseConnection();
      
      if (result.success) {
        onResult(
          `✅ Success! Found ${result.articleCount} articles\n` +
          `✅ Database version: ${result.databaseVersion}`
        );
      }
    } catch (error) {
      onResult(`❌ Error: ${error instanceof Error ? error.message : 'Test failed'}`);
    } finally {
      onTestComplete();
    }
  };

  const handleTestWrite = async () => {
    if (!user) {
      onResult('⚠️ Please sign in first');
      return;
    }

    try {
      onResult('✍️ Testing write operation...');
      const { success, article, error } = await createTestArticle(user.id);
      
      if (success && article) {
        onResult(`✅ Successfully created test article: "${article.title}"`);
      } else if (error) {
        onResult(`❌ Write failed: ${error}`);
      }
    } catch (error) {
      onResult(`❌ Error: ${error instanceof Error ? error.message : 'Write test failed'}`);
    } finally {
      onTestComplete();
    }
  };

  const handleCleanup = async () => {
    if (createdTestArticles.length === 0) {
      onResult('No test articles to clean up');
      return;
    }

    try {
      onResult('🧹 Cleaning up test data...');
      const { success, error } = await cleanupTestData();
      
      if (success) {
        onResult(`✅ Successfully cleaned up ${createdTestArticles.length} test articles`);
      } else if (error) {
        onResult(`❌ Cleanup failed: ${error}`);
      }
    } catch (error) {
      onResult(`❌ Error during cleanup: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      onTestComplete();
    }
  };

  return (
    <div className="space-y-4 mb-8">
      <div className="flex flex-wrap gap-3">
        <Button
          onClick={handleTestConnection}
          disabled={loading || !user}
          variant="bordered"
          className="border-blue-500 text-blue-600 hover:bg-blue-50"
        >
          Test Connection
        </Button>
        
        <Button
          onClick={handleTestWrite}
          disabled={loading || !user}
          variant="bordered"
          className="border-green-500 text-green-600 hover:bg-green-50"
        >
          Test Write
        </Button>
        
        <Button
          onClick={handleCleanup}
          disabled={loading || createdTestArticles.length === 0}
          variant="bordered"
          className="border-red-500 text-red-600 hover:bg-red-50"
        >
          Cleanup Test Data
        </Button>
      </div>
    </div>
  );
};
