"""
Test script to verify entity extraction fix
"""
import asyncio
import sys
import os

# Add the current directory to Python path
sys.path.insert(0, os.path.dirname(__file__))

from scriber_agents.narrative_planner import NarrativePlanner

async def test_entity_extraction():
    print("Testing entity extraction fix...")
    
    planner = NarrativePlanner()
    
    # Test storylines with clear entities
    storylines = [
        'Marcus Rashford scored for Manchester United against Liverpool',
        'Arsenal defeated Chelsea 2-1 with Bukayo Saka scoring the winner', 
        'Erling Haaland completed his hat-trick to help Manchester City beat Newcastle'
    ]
    
    print(f"Testing with storylines:")
    for i, storyline in enumerate(storylines, 1):
        print(f"  {i}. {storyline}")
    
    try:
        # Test content analysis
        print("\nTesting LLM content analysis...")
        analysis = await planner._analyze_content_angles(storylines)
        print(f"Analysis result keys: {list(analysis.keys())}")
        
        entities_from_analysis = analysis.get('entities', {})
        print(f"Entities from LLM: {entities_from_analysis}")
        
        # Test entity extraction
        print("\nTesting entity extraction from analysis...")
        entities = planner._extract_entities_from_analysis(analysis)
        print(f"Final extracted entities: {entities}")
        
        # Test results
        success = len(entities['player']) > 0 or len(entities['team']) > 0
        print(f"\nTest Result: {'SUCCESS' if success else 'FAILED'}")
        print(f"Players found: {entities['player']}")
        print(f"Teams found: {entities['team']}")
        
    except Exception as e:
        print(f"Error during testing: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    asyncio.run(test_entity_extraction())

