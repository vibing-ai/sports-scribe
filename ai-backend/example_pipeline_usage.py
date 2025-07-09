"""
Example Pipeline Usage.

This script demonstrates how to use the streamlined SportsScribe pipeline
to generate a game recap article from raw fixture data.
"""

import asyncio
import logging
import os
import sys
from datetime import datetime

# Add the project root to the Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from scriber_agents.pipeline import AgentPipeline
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)

logger = logging.getLogger(__name__)


async def generate_game_recap_example():
    """Example of generating a game recap using the pipeline."""
    
    logger.info("🎯 SportsScribe Pipeline Example")
    logger.info("=" * 50)
    
    try:
        # Initialize the pipeline
        logger.info("🔧 Initializing pipeline...")
        pipeline = AgentPipeline()
        logger.info("✅ Pipeline initialized successfully")
        
        # Check pipeline status
        status = await pipeline.get_pipeline_status()
        logger.info(f"📊 Pipeline Status: {status['pipeline_status']}")
        logger.info(f"🤖 Agents: {list(status['agents'].keys())}")
        
        # Generate a game recap
        logger.info("📝 Generating game recap...")
        game_id = "239625"  # Example game ID
        
        start_time = datetime.now()
        result = await pipeline.generate_game_recap(game_id)
        end_time = datetime.now()
        
        duration = (end_time - start_time).total_seconds()
        
        # Display results
        if result.get("success", False):
            logger.info("✅ Game recap generated successfully!")
            logger.info(f"⏱️  Generation time: {duration:.2f} seconds")
            logger.info(f"📄 Article type: {result.get('article_type')}")
            logger.info(f"📊 Storylines generated: {len(result.get('storylines', []))}")
            
            # Display the article content
            content = result.get("content", "")
            logger.info(f"📝 Article length: {len(content)} characters")
            
            print("\n" + "=" * 50)
            print("📰 GENERATED ARTICLE")
            print("=" * 50)
            print(content)
            print("=" * 50)
            
            # Display storylines
            storylines = result.get("storylines", [])
            if storylines:
                print("\n🎯 KEY STORYLINES:")
                for i, storyline in enumerate(storylines, 1):
                    print(f"  {i}. {storyline}")
            
            # Display metadata
            metadata = result.get("metadata", {})
            print(f"\n📊 METADATA:")
            print(f"  Generated at: {metadata.get('generated_at')}")
            print(f"  Model used: {metadata.get('model_used')}")
            print(f"  Data sources: {metadata.get('data_sources')}")
            
        else:
            logger.error("❌ Failed to generate game recap")
            logger.error(f"Error: {result.get('error', 'Unknown error')}")
            
    except Exception as e:
        logger.error(f"❌ Example failed: {e}")
        raise


async def test_pipeline_components():
    """Test individual pipeline components."""
    
    logger.info("\n🧪 Testing Pipeline Components")
    logger.info("=" * 50)
    
    try:
        # Initialize pipeline
        pipeline = AgentPipeline()
        
        # Test data collection
        logger.info("📊 Testing data collection...")
        game_data = await pipeline._collect_game_data("239625")
        logger.info(f"✅ Data collection: {'Success' if game_data else 'Failed'}")
        
        # Test format manager
        logger.info("🔄 Testing format manager...")
        if game_data:
            formatted_data = await pipeline.format_manager.prepare_data_for_researcher(
                game_data, "game_analysis"
            )
            logger.info(f"✅ Format manager: {'Success' if formatted_data else 'Failed'}")
        
        # Test researcher
        logger.info("🔍 Testing researcher...")
        if game_data:
            storylines = await pipeline.researcher.generate_storylines([game_data])
            logger.info(f"✅ Researcher: {'Success' if storylines else 'Failed'}")
            if storylines:
                logger.info(f"   Generated {len(storylines)} storylines")
        
        logger.info("✅ All component tests completed")
        
    except Exception as e:
        logger.error(f"❌ Component test failed: {e}")


async def main():
    """Main function to run the example."""
    
    # Check environment variables
    required_vars = ["OPENAI_API_KEY", "RAPIDAPI_KEY"]
    missing_vars = [var for var in required_vars if not os.getenv(var)]
    
    if missing_vars:
        logger.error(f"❌ Missing required environment variables: {missing_vars}")
        logger.info("Please set the following environment variables:")
        for var in missing_vars:
            logger.info(f"  - {var}")
        return
    
    # Run the example
    await generate_game_recap_example()
    
    # Run component tests
    await test_pipeline_components()
    
    logger.info("\n🎉 Example completed successfully!")


if __name__ == "__main__":
    asyncio.run(main()) 