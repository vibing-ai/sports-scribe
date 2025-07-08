#!/usr/bin/env python3
"""
Test script for the new DataCollectorAgent implementation with the four main functions
"""

import asyncio
import sys
import os
from dotenv import load_dotenv

# Add the current directory to the Python path
sys.path.insert(0, os.path.abspath(os.path.dirname(__file__)))

from scriber_agents.data_collector import DataCollectorAgent

load_dotenv()

async def test_data_collector_functions():
    """Test the four main functions of DataCollectorAgent with English prompts."""
    
    print("🧪 Testing DataCollectorAgent with English natural language prompts...")
    
    # Initialize the agent
    agent = DataCollectorAgent()
    agent.initialize({})
    
    # Test 1: get_fixtures with English league name and date
    print("\n⚽ Test 1: get_fixtures with English league name and date")
    try:
        task = {
            "user_prompt": "Get all Premier League matches for 2024-01-15"
        }
        result = await agent.execute(task)
        print("✅ get_fixtures (English league name) completed successfully")
        print(f"Result type: {type(result)}")
        print(f"Result: {result}")
    except Exception as e:
        print(f"❌ get_fixtures (English league name) failed: {e}")
    
    # Test 2: get_fixtures with another league
    print("\n⚽ Test 2: get_fixtures with La Liga and date")
    try:
        task = {
            "user_prompt": "Get all La Liga matches for 2024-02-01"
        }
        result = await agent.execute(task)
        print("✅ get_fixtures (La Liga) completed successfully")
        print(f"Result type: {type(result)}")
        print(f"Result: {result}")
    except Exception as e:
        print(f"❌ get_fixtures (La Liga) failed: {e}")
    
    # Test 3: get_fixtures with league ID
    print("\n⚽ Test 3: get_fixtures with league ID and date")
    try:
        task = {
            "user_prompt": "Get all matches for league 39 on 2024-01-15"
        }
        result = await agent.execute(task)
        print("✅ get_fixtures (league ID) completed successfully")
        print(f"Result type: {type(result)}")
        print(f"Result: {result}")
    except Exception as e:
        print(f"❌ get_fixtures (league ID) failed: {e}")
    
    print("\n🎉 All tests completed!")

if __name__ == "__main__":
    asyncio.run(test_data_collector_functions()) 