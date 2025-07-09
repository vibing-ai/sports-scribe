#!/usr/bin/env python3
"""
Test script for data collection functionality.
Tests basic extraction and enhanced data collection features.
"""

import asyncio
import json
import os
import sys
from pathlib import Path

# Add the project root to the Python path
project_root = Path(__file__).parent.parent
sys.path.insert(0, str(project_root))

from scriber_agents.pipeline import AgentPipeline
from dotenv import load_dotenv

load_dotenv()

def create_sample_game_data():
    """Create sample game data for testing."""
    return {
        "get": "fixtures",
        "parameters": {"id": "239625"},
        "errors": [],
        "results": 1,
        "paging": {"current": 1, "total": 1},
        "response": [{
            "fixture": {
                "id": 239625,
                "referee": "R. Jayed",
                "timezone": "UTC",
                "date": "2020-02-06T14:00:00+00:00",
                "timestamp": 1580997600,
                "periods": {"first": 1580997600, "second": 1581001200},
                "venue": {"id": 1887, "name": "Stade Municipal", "city": "Oued Zem"},
                "status": {"long": "Match Finished", "short": "FT", "elapsed": 90}
            },
            "league": {
                "id": 200,
                "name": "Botola Pro",
                "country": "Morocco",
                "logo": "https://media.api-sports.io/football/leagues/200.png",
                "flag": "https://media.api-sports.io/flags/ma.svg",
                "season": 2019,
                "round": "Regular Season - 14"
            },
            "teams": {
                "home": {"id": 967, "name": "Rapide Oued ZEM", "logo": "https://media.api-sports.io/football/teams/967.png", "winner": False},
                "away": {"id": 968, "name": "Wydad AC", "logo": "https://media.api-sports.io/football/teams/968.png", "winner": True}
            },
            "goals": {"home": 1, "away": 2},
            "score": {
                "halftime": {"home": 0, "away": 1},
                "fulltime": {"home": 1, "away": 2},
                "extratime": None,
                "penalty": None
            },
            "events": [
                {
                    "time": {"elapsed": 19, "extra": None},
                    "team": {"id": 968, "name": "Wydad AC", "logo": "https://media.api-sports.io/football/teams/968.png"},
                    "player": {"id": 36549, "name": "Z. El-Moutaraji"},
                    "assist": None,
                    "type": "Goal",
                    "detail": "Normal Goal",
                    "comments": None
                },
                {
                    "time": {"elapsed": 60, "extra": None},
                    "team": {"id": 967, "name": "Rapide Oued ZEM", "logo": "https://media.api-sports.io/football/teams/967.png"},
                    "player": {"id": 36704, "name": "B. El Bahraoui"},
                    "assist": None,
                    "type": "Goal",
                    "detail": "Normal Goal",
                    "comments": None
                },
                {
                    "time": {"elapsed": 90, "extra": 3},
                    "team": {"id": 968, "name": "Wydad AC", "logo": "https://media.api-sports.io/football/teams/968.png"},
                    "player": {"id": 36544, "name": "Y. Jabrane"},
                    "assist": None,
                    "type": "Goal",
                    "detail": "Penalty",
                    "comments": None
                }
            ],
            "lineups": [
                {
                    "team": {"id": 967, "name": "Rapide Oued ZEM", "logo": "https://media.api-sports.io/football/teams/967.png"},
                    "coach": {"id": 7978, "name": "M. Chebil", "photo": "https://media.api-sports.io/football/coachs/7978.png"},
                    "formation": "4-3-3",
                    "startXI": [
                        {"player": {"id": 152487, "name": "M. Akid", "number": 1, "pos": "G", "grid": "1:1"}},
                        {"player": {"id": 152492, "name": "A. Kadi", "number": 14, "pos": "D", "grid": "2:4"}},
                        {"player": {"id": 36704, "name": "B. El Bahraoui", "number": 3, "pos": "F", "grid": "4:1"}}
                    ],
                    "substitutes": [
                        {"player": {"id": 36756, "name": "M. Rouhi", "number": 23, "pos": "M", "grid": None}},
                        {"player": {"id": 152497, "name": "S. Bouhra", "number": 9, "pos": "M", "grid": None}}
                    ]
                },
                {
                    "team": {"id": 968, "name": "Wydad AC", "logo": "https://media.api-sports.io/football/teams/968.png"},
                    "coach": {"id": 370, "name": "S. Desabre", "photo": "https://media.api-sports.io/football/coachs/370.png"},
                    "formation": "4-2-3-1",
                    "startXI": [
                        {"player": {"id": 2703, "name": "A. Tagnaouti", "number": 26, "pos": "G", "grid": "1:1"}},
                        {"player": {"id": 36549, "name": "Z. El-Moutaraji", "number": 7, "pos": "F", "grid": "4:2"}},
                        {"player": {"id": 36544, "name": "Y. Jabrane", "number": 5, "pos": "M", "grid": "3:1"}}
                    ],
                    "substitutes": [
                        {"player": {"id": 146827, "name": "B. Najmeddine", "number": 13, "pos": "D", "grid": None}},
                        {"player": {"id": 146828, "name": "H. El Bahja", "number": 14, "pos": "M", "grid": None}}
                    ]
                }
            ]
        }]
    }

def test_basic_extraction():
    """Test basic team and player information extraction."""
    print("=== Testing Basic Team and Player Extraction ===")
    
    # Create sample data
    sample_data = create_sample_game_data()
    
    try:
        # Initialize pipeline
        pipeline = AgentPipeline()
        
        # Test team extraction
        print("\n--- Testing Team Information Extraction ---")
        team_info = pipeline.extract_team_info(sample_data)
        
        if isinstance(team_info, dict) and "error" not in team_info:
            print("✅ Team extraction successful!")
            print(f"Home Team: {team_info['home_team']['name']} (ID: {team_info['home_team']['id']})")
            print(f"Away Team: {team_info['away_team']['name']} (ID: {team_info['away_team']['id']})")
            print(f"League: {team_info['league']['name']} - {team_info['league']['round']}")
            print(f"Home Formation: {team_info['home_lineup']['formation']}")
            print(f"Away Formation: {team_info['away_lineup']['formation']}")
            print(f"Home Coach: {team_info['home_lineup']['coach']}")
            print(f"Away Coach: {team_info['away_lineup']['coach']}")
        else:
            print(f"❌ Team extraction failed: {team_info.get('error', 'Unknown error')}")
            return None
        
        # Test player extraction
        print("\n--- Testing Player Information Extraction ---")
        player_info = pipeline.extract_player_info(sample_data)
        
        if isinstance(player_info, dict) and "error" not in player_info:
            print("✅ Player extraction successful!")
            print(f"Total Players: {len(player_info['all_players'])}")
            print(f"Home Players: {len(player_info['home_players'])}")
            print(f"Away Players: {len(player_info['away_players'])}")
            print(f"Key Players: {len(player_info['key_players'])}")
            
            print("\nKey Players:")
            for i, player in enumerate(player_info['key_players'][:3], 1):
                name = player.get('name', 'Unknown')
                team = player.get('team', 'Unknown')
                achievement = player.get('key_achievement', {})
                print(f"  {i}. {name} ({team}): {achievement.get('type', 'Event')} - {achievement.get('detail', 'Unknown')}")
            
            print("\nSample Players:")
            all_players = list(player_info['all_players'].values())
            for i, player in enumerate(all_players[:3], 1):
                name = player.get('name', 'Unknown')
                team = player.get('team', 'Unknown')
                position = player.get('position', 'Unknown')
                status = player.get('status', 'Unknown')
                print(f"  {i}. {name} ({team}, {position}) - {status}")
        else:
            print(f"❌ Player extraction failed: {player_info.get('error', 'Unknown error')}")
            return None
        
        return team_info, player_info
        
    except Exception as e:
        print(f"❌ Basic extraction test failed: {e}")
        import traceback
        traceback.print_exc()
        return None

async def test_enhanced_data_collection(team_info, player_info):
    """Test enhanced team and player data collection."""
    print("\n=== Testing Enhanced Data Collection ===")
    
    try:
        # Initialize pipeline
        pipeline = AgentPipeline()
        
        # Test enhanced team data collection
        print("\n--- Testing Enhanced Team Data Collection ---")
        enhanced_team_data = await pipeline.collect_enhanced_team_data(team_info)
        
        if isinstance(enhanced_team_data, dict) and "error" not in enhanced_team_data:
            print("✅ Enhanced team data collection successful!")
            enhanced_data = enhanced_team_data.get("enhanced_data", {})
            home_detailed = "home_team_detailed" in enhanced_data
            away_detailed = "away_team_detailed" in enhanced_data
            print(f"Home team detailed data: {'✅' if home_detailed else '❌'}")
            print(f"Away team detailed data: {'✅' if away_detailed else '❌'}")
            
            if home_detailed:
                home_data = enhanced_data["home_team_detailed"]
                print(f"Home team data type: {type(home_data)}")
                if isinstance(home_data, dict):
                    print(f"Home team data keys: {list(home_data.keys())}")
        else:
            print(f"❌ Enhanced team data collection failed: {enhanced_team_data.get('error', 'Unknown error')}")
        
        # Test enhanced player data collection
        print("\n--- Testing Enhanced Player Data Collection ---")
        enhanced_player_data = await pipeline.collect_enhanced_player_data(player_info)
        
        if isinstance(enhanced_player_data, dict) and "error" not in enhanced_player_data:
            print("✅ Enhanced player data collection successful!")
            enhanced_key_players = len(enhanced_player_data.get("enhanced_key_players", []))
            sample_players = len(enhanced_player_data.get("sample_players_detailed", []))
            print(f"Enhanced key players: {enhanced_key_players}")
            print(f"Sample players detailed: {sample_players}")
            
            if enhanced_key_players > 0:
                print("\nEnhanced Key Players:")
                for i, player in enumerate(enhanced_player_data["enhanced_key_players"][:3], 1):
                    name = player.get('name', 'Unknown')
                    detailed_data = player.get('detailed_data', {})
                    has_detailed = isinstance(detailed_data, dict) and "error" not in detailed_data
                    print(f"  {i}. {name}: {'✅' if has_detailed else '❌'} detailed data")
            
            if sample_players > 0:
                print("\nSample Players:")
                for i, player in enumerate(enhanced_player_data["sample_players_detailed"][:3], 1):
                    name = player.get('name', 'Unknown')
                    team = player.get('team', 'Unknown')
                    detailed_data = player.get('detailed_data', {})
                    has_detailed = isinstance(detailed_data, dict) and "error" not in detailed_data
                    print(f"  {i}. {name} ({team}): {'✅' if has_detailed else '❌'} detailed data")
        else:
            print(f"❌ Enhanced player data collection failed: {enhanced_player_data.get('error', 'Unknown error')}")
        
        return enhanced_team_data, enhanced_player_data
        
    except Exception as e:
        print(f"❌ Enhanced data collection test failed: {e}")
        import traceback
        traceback.print_exc()
        return None, None

def test_data_validation(team_info, player_info, enhanced_team_data, enhanced_player_data):
    """Test data validation and structure."""
    print("\n=== Testing Data Validation ===")
    
    validation_results = {
        "basic_team_info": False,
        "basic_player_info": False,
        "enhanced_team_data": False,
        "enhanced_player_data": False,
        "data_consistency": False
    }
    
    # Validate basic team info
    if isinstance(team_info, dict) and "error" not in team_info:
        required_keys = ["home_team", "away_team", "league", "home_lineup", "away_lineup"]
        if all(key in team_info for key in required_keys):
            validation_results["basic_team_info"] = True
            print("✅ Basic team info validation passed")
        else:
            print("❌ Basic team info validation failed - missing required keys")
    else:
        print("❌ Basic team info validation failed - invalid structure")
    
    # Validate basic player info
    if isinstance(player_info, dict) and "error" not in player_info:
        required_keys = ["home_players", "away_players", "all_players", "key_players"]
        if all(key in player_info for key in required_keys):
            validation_results["basic_player_info"] = True
            print("✅ Basic player info validation passed")
        else:
            print("❌ Basic player info validation failed - missing required keys")
    else:
        print("❌ Basic player info validation failed - invalid structure")
    
    # Validate enhanced team data
    if isinstance(enhanced_team_data, dict) and "error" not in enhanced_team_data:
        if "enhanced_data" in enhanced_team_data:
            validation_results["enhanced_team_data"] = True
            print("✅ Enhanced team data validation passed")
        else:
            print("❌ Enhanced team data validation failed - missing enhanced_data")
    else:
        print("❌ Enhanced team data validation failed - invalid structure")
    
    # Validate enhanced player data
    if isinstance(enhanced_player_data, dict) and "error" not in enhanced_player_data:
        if "enhanced_key_players" in enhanced_player_data and "sample_players_detailed" in enhanced_player_data:
            validation_results["enhanced_player_data"] = True
            print("✅ Enhanced player data validation passed")
        else:
            print("❌ Enhanced player data validation failed - missing required keys")
    else:
        print("❌ Enhanced player data validation failed - invalid structure")
    
    # Test data consistency
    if (validation_results["basic_team_info"] and validation_results["enhanced_team_data"] and
        validation_results["basic_player_info"] and validation_results["enhanced_player_data"]):
        validation_results["data_consistency"] = True
        print("✅ Data consistency validation passed")
    else:
        print("❌ Data consistency validation failed")
    
    return validation_results

async def main():
    """Run all data collection tests."""
    print("🧪 Testing Data Collection Functionality")
    print("=" * 60)
    
    # Test basic extraction
    extraction_result = test_basic_extraction()
    if extraction_result is None:
        print("❌ Basic extraction failed, stopping tests")
        return
    
    team_info, player_info = extraction_result
    
    # Test enhanced data collection
    enhanced_result = await test_enhanced_data_collection(team_info, player_info)
    if enhanced_result[0] is None:
        print("❌ Enhanced data collection failed, stopping tests")
        return
    
    enhanced_team_data, enhanced_player_data = enhanced_result
    
    # Test data validation
    validation_results = test_data_validation(team_info, player_info, enhanced_team_data, enhanced_player_data)
    
    # Save test results
    results = {
        "basic_team_info": team_info,
        "basic_player_info": player_info,
        "enhanced_team_data": enhanced_team_data,
        "enhanced_player_data": enhanced_player_data,
        "validation_results": validation_results,
        "test_timestamp": "2024-01-01T00:00:00Z"
    }
    
    with open("test_data_collection_results.json", "w") as f:
        json.dump(results, f, indent=2, default=str)
    
    print("\n" + "=" * 60)
    print("📄 Results saved to test_data_collection_results.json")
    
    # Summary
    passed_tests = sum(validation_results.values())
    total_tests = len(validation_results)
    print(f"\n🎉 Data Collection Tests Summary: {passed_tests}/{total_tests} tests passed")
    
    if passed_tests == total_tests:
        print("✅ All data collection tests completed successfully!")
    else:
        print("⚠️  Some tests failed, check the results for details")

if __name__ == "__main__":
    asyncio.run(main()) 