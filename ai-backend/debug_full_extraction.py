#!/usr/bin/env python3
"""Debug full entity extraction process."""

import sys
import os

# Add current directory to Python path
sys.path.insert(0, os.path.dirname(__file__))

def debug_full_extraction():
    """Debug the full entity extraction process."""
    try:
        from scriber_agents.narrative_planner import NarrativePlanner

        # Setup
        planner = NarrativePlanner()

        # Test all storylines like in the actual test
        test_storylines = [
            "Marcus Rashford scored for Manchester United against Liverpool",
            "Arsenal's victory over Chelsea was decided by Bukayo Saka's brilliance",
            "Erling Haaland's hat-trick helped Manchester City beat Newcastle 4-1",
            "Real Madrid defeated Barcelona 3-1 in El Clasico at Santiago Bernabeu"
        ]

        print("=== DEBUGGING ENTITY EXTRACTION ===")
        for i, storyline in enumerate(test_storylines, 1):
            print(f"  {i}. {storyline}")

        # Call the extraction method
        entities = planner._extract_entities_from_storylines(test_storylines)

        print(f"\nFinal result:")
        print(f"  Players: {entities['player']}")
        print(f"  Teams: {entities['team']}")

        # Check if Manchester United is there
        if "Manchester United" in entities['team']:
            print("+ Manchester United found!")
        else:
            print("X Manchester United NOT found!")
            print("Available teams:", entities['team'])

        # Check for Arsenal as well
        if "Arsenal" in entities['team']:
            print("+ Arsenal found!")
        else:
            print("X Arsenal NOT found!")

    except Exception as e:
        print(f"Error: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    debug_full_extraction()