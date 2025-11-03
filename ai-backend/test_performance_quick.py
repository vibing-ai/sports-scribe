#!/usr/bin/env python3
"""Quick test script to verify team performance narrative angle detection."""

import asyncio
import sys
import os

# Add current directory to Python path
sys.path.insert(0, os.path.dirname(__file__))

async def test_team_performance():
    """Test team performance angle detection."""
    try:
        from scriber_agents.narrative_planner import NarrativePlanner, NarrativeAngle
        from config.narrative_config import NarrativeConfig

        # Test data - team performance storylines
        research_output = {
            "analysis": {
                "storylines": [
                    "Liverpool extended their unbeaten run to 15 matches with a 2-0 victory",
                    "Liverpool's defensive solidity has been key to their recent success",
                    "The team has scored 25 goals while conceding only 8 in their last 10 games",
                    "Liverpool's current form puts them 5 points clear at the top of the table",
                    "The victory showcased Liverpool's tactical maturity and squad depth"
                ],
                "confidence": 0.88,
                "analysis_type": "team_performance"
            }
        }

        # Initialize planner
        config = NarrativeConfig.get_balanced_config()
        planner = NarrativePlanner(config)

        print("Testing team performance storylines:")
        for i, storyline in enumerate(research_output["analysis"]["storylines"], 1):
            print(f"  {i}. {storyline}")

        # Test angle scoring
        storylines = research_output["analysis"]["storylines"]
        angle_scores = {}

        for angle in NarrativeAngle:
            score = 0.0

            # Add weighted scores from storyline keywords
            for storyline in storylines:
                storyline_lower = storyline.lower()
                for keyword, weights in planner.angle_weights.items():
                    if keyword in storyline_lower and angle.value in weights:
                        score += weights[angle.value] * 0.1
                        print(f"    '{keyword}' in '{storyline[:50]}...' -> {angle.value}: +{weights[angle.value] * 0.1:.3f}")

            angle_scores[angle] = score

        # Print final scores
        print("\nFinal angle scores:")
        sorted_angles = sorted(angle_scores.items(), key=lambda x: x[1], reverse=True)
        for angle, score in sorted_angles:
            print(f"  {angle.value}: {score:.3f}")

        primary_angle = sorted_angles[0][0]
        print(f"\nPrimary angle would be: {primary_angle.value}")
        print(f"Expected: performance")
        print(f"Test {'PASSED' if primary_angle == NarrativeAngle.PERFORMANCE else 'FAILED'}")

        return primary_angle == NarrativeAngle.PERFORMANCE

    except Exception as e:
        print(f"Error: {e}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    result = asyncio.run(test_team_performance())
    print(f"\nOverall test result: {'PASSED' if result else 'FAILED'}")