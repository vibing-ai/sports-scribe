"""
Simple test to check entity extraction without external dependencies
"""
import sys
import os
sys.path.insert(0, os.path.dirname(__file__))

from scriber_agents.narrative_planner import NarrativePlanner

def test_fallback_entity_extraction():
    """Test the fallback entity extraction"""
    print("Testing fallback entity extraction...")
    
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
    
    # Test the fallback entity extraction directly
    print("\nTesting fallback entity extraction...")
    fallback_entities = planner._basic_entity_extraction(storylines)
    print(f"Fallback entities: {fallback_entities}")
    
    # Test fallback analysis
    print("\nTesting fallback analysis...")
    fallback_analysis = planner._create_fallback_analysis(storylines)
    entities_from_fallback = planner._extract_entities_from_analysis(fallback_analysis)
    print(f"Entities from fallback analysis: {entities_from_fallback}")
    
    # Check results
    success = len(entities_from_fallback['player']) > 0 or len(entities_from_fallback['team']) > 0
    print(f"\nTest Result: {'SUCCESS' if success else 'FAILED'}")
    print(f"Players found: {entities_from_fallback['player']}")
    print(f"Teams found: {entities_from_fallback['team']}")
    
    return success

if __name__ == "__main__":
    test_fallback_entity_extraction()

