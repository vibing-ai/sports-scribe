#!/usr/bin/env python3
"""Test script to see detailed narrative planner logging."""

import asyncio
import sys
import os
import logging

# Configure logging to show INFO level with a clear format
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    datefmt='%H:%M:%S'
)

# Add the current directory to the path
sys.path.insert(0, os.path.abspath(os.path.dirname(__file__)))

async def test_narrative_planner_logging():
    """Test narrative planner with detailed logging."""
    print("Starting narrative planner logging test...")

    try:
        from scriber_agents.narrative_planner import NarrativePlanner
        from config.narrative_config import NarrativeConfig

        # Rich test data with multiple storylines
        test_data = {
            "analysis": {
                "storylines": [
                    "Marcus Rashford scored a dramatic winner in the 90th minute against Liverpool",
                    "Manchester United completed a stunning comeback from 2-0 down",
                    "Liverpool dominated possession with 67% but failed to convert chances",
                    "Bruno Fernandes provided two crucial assists in the second half",
                    "The victory puts Manchester United back in the Champions League race"
                ],
                "confidence": 0.9,
                "analysis_type": "comprehensive_match_analysis"
            }
        }

        # Use drama-focused config for more interesting results
        config = NarrativeConfig.get_drama_focused_config()
        planner = NarrativePlanner(config)

        print("\n" + "="*80)
        print("STARTING NARRATIVE PLANNER WITH DETAILED LOGGING")
        print("="*80)

        # Run with timeout
        recommendation = await asyncio.wait_for(
            planner.create_narrative_plan(test_data),
            timeout=120.0  # 2 minutes max
        )

        print("\n" + "="*80)
        print("NARRATIVE PLANNER COMPLETED SUCCESSFULLY")
        print("="*80)
        print(f"Primary angle: {recommendation.writing_guidance.primary_angle}")
        print(f"Writing style: {recommendation.writing_guidance.writing_style}")
        print(f"Intelligence queries generated: {len(recommendation.intelligence_queries)}")
        print(f"Research tasks generated: {len(recommendation.researcher_tasks)}")

        return True

    except asyncio.TimeoutError:
        print("ERROR: Test timed out")
        return False
    except Exception as e:
        print(f"ERROR: {e}")
        import traceback
        print(f"Traceback: {traceback.format_exc()}")
        return False

if __name__ == "__main__":
    result = asyncio.run(test_narrative_planner_logging())
    print(f"\nTest {'PASSED' if result else 'FAILED'}")