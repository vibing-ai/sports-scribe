#!/usr/bin/env python3
"""Quick test script to verify entity extraction fix."""

import sys
import os

# Add current directory to Python path
sys.path.insert(0, os.path.dirname(__file__))

def test_entity_extraction():
    """Test entity extraction functionality."""
    try:
        from scriber_agents.narrative_planner import NarrativePlanner

        # Setup
        planner = NarrativePlanner()

        # Test cases with known entities
        test_storylines = [
            "Marcus Rashford scored for Manchester United against Liverpool",
            "Arsenal's victory over Chelsea was decided by Bukayo Saka's brilliance",
            "Erling Haaland's hat-trick helped Manchester City beat Newcastle 4-1",
            "Real Madrid defeated Barcelona 3-1 in El Clasico at Santiago Bernabeu"
        ]

        entities = planner._extract_entities_from_storylines(test_storylines)

        print("Test Storylines:")
        for i, storyline in enumerate(test_storylines, 1):
            print(f"  {i}. {storyline}")

        print(f"\nExtracted Entities:")
        print(f"  Players: {entities['player']}")
        print(f"  Teams: {entities['team']}")

        # Expected entities
        expected_teams = ["Manchester United", "Arsenal"]
        expected_players_partial = ["Marcus Rashford", "Bukayo Saka", "Erling Haaland"]

        # Check for expected teams
        print(f"\nExpected teams: {expected_teams}")
        missing_teams = []
        for team in expected_teams:
            if team not in entities['team']:
                missing_teams.append(team)

        if missing_teams:
            print(f"X MISSING TEAMS: {missing_teams}")
            return False
        else:
            print(f"+ All expected teams found!")

        # Check for expected players (partial check)
        print(f"\nExpected players (partial): {expected_players_partial}")
        found_players = 0
        for player in expected_players_partial:
            if any(player in found_player for found_player in entities['player']) or player in entities['player']:
                found_players += 1
                print(f"+ Found: {player}")
            else:
                print(f"X Missing: {player}")

        print(f"\nPlayer extraction: {found_players}/{len(expected_players_partial)} found")

        # Overall result
        teams_passed = len(missing_teams) == 0
        players_passed = found_players >= 2  # At least 2 out of 3 expected players

        overall_passed = teams_passed and players_passed
        print(f"\nOverall entity extraction test: {'PASSED' if overall_passed else 'FAILED'}")
        return overall_passed

    except Exception as e:
        print(f"Error: {e}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    result = test_entity_extraction()
    print(f"\nTest result: {'PASSED' if result else 'FAILED'}")