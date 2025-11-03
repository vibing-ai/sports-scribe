#!/usr/bin/env python3
"""Debug entity extraction for specific case."""

import re

def debug_manchester_united():
    storyline = "Marcus Rashford scored for Manchester United against Liverpool"
    storyline_lower = storyline.lower()

    team_indicators = [
        "Manchester United", "Manchester City", "Arsenal", "Liverpool", "Chelsea", "Tottenham",
        "Barcelona", "Real Madrid", "Bayern Munich", "PSG", "Juventus", "AC Milan", "Inter Milan",
        "Atletico Madrid", "Borussia Dortmund", "Ajax", "Porto", "Benfica", "Valencia", "Sevilla",
        "Napoli", "Roma", "Lazio", "Atalanta", "West Ham", "Newcastle", "Brighton", "Crystal Palace",
        "Fulham", "Wolves", "Nottingham Forest", "Aston Villa", "Leicester", "Everton", "Burnley",
        "Sheffield United", "Luton", "Bournemouth", "Brentford"
    ]

    print(f"Storyline: {storyline}")
    print(f"Storyline lower: {storyline_lower}")
    print(f"\nTesting Manchester United:")

    # Sort team indicators by length (longest first) to avoid partial matches
    sorted_teams = sorted(team_indicators, key=len, reverse=True)

    for team in sorted_teams[:5]:  # Test first 5 teams
        team_lower = team.lower()
        team_pattern = r'\b' + re.escape(team_lower) + r'\b'
        match = re.search(team_pattern, storyline_lower)
        print(f"  {team}: pattern='{team_pattern}' -> {'MATCH' if match else 'NO MATCH'}")
        if match:
            print(f"    Match position: {match.span()}")

if __name__ == "__main__":
    debug_manchester_united()