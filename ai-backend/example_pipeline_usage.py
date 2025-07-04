#!/usr/bin/env python3
"""
Example usage of the SportsScribe Article Pipeline.

This script demonstrates how to use the complete pipeline to generate
different types of sports articles.
"""

import asyncio
import os
from dotenv import load_dotenv

from scriber_agents.pipeline import ArticlePipeline

# Load environment variables
load_dotenv()

async def main():
    """Example usage of the article generation pipeline."""
    
    # Configuration for all agents
    config = {
        "openai_api_key": os.getenv("OPENAI_API_KEY"),
        "rapidapi_key": os.getenv("RAPIDAPI_KEY"),
        "supabase_url": os.getenv("SUPABASE_URL"),
        "supabase_key": os.getenv("SUPABASE_SERVICE_ROLE_KEY"),
        "model": "gpt-4",
        "max_tokens": 2000,
        "temperature": 0.7
    }
    
    # Initialize the pipeline
    pipeline = ArticlePipeline(config)
    
    # Example 1: Generate a game recap
    print("=== Generating Game Recap ===")
    try:
        game_recap = await pipeline.generate_game_recap("game_123")
        print(f"Generated recap for game_123")
        print(game_recap['content'])
        print(f"Content length: {len(game_recap['content'])} characters")
        print(f"Metadata: {game_recap['metadata']}")
        with open("recap.txt", "w", encoding="utf-8") as f:
            f.write(game_recap['content'])
    except Exception as e:
        print(f"Error generating game recap: {e}")
    
    print("\n" + "="*50 + "\n")
    
    # Example 2: Generate a preview article
    print("=== Generating Preview Article ===")
    try:
        preview = await pipeline.generate_preview_article("game_456")
        print(f"Generated preview for game_456")
        print(f"Content length: {len(preview['content'])} characters")
        print(f"Metadata: {preview['metadata']}")
    except Exception as e:
        print(f"Error generating preview: {e}")
    
    print("\n" + "="*50 + "\n")
    
    # Example 3: Generate a player spotlight
    print("=== Generating Player Spotlight ===")
    try:
        spotlight = await pipeline.generate_player_spotlight("player_789", "game_123")
        print(f"Generated spotlight for player_789")
        print(f"Content length: {len(spotlight['content'])} characters")
        print(f"Metadata: {spotlight['metadata']}")
    except Exception as e:
        print(f"Error generating player spotlight: {e}")
    
    print("\n" + "="*50 + "\n")
    
    # Example 4: Check pipeline status
    print("=== Pipeline Status ===")
    status = await pipeline.get_pipeline_status()
    print(f"Pipeline status: {status}")

if __name__ == "__main__":
    asyncio.run(main()) 