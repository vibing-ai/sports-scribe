"""Quick runner script to demonstrate Narrative Planner output.

This script runs a simplified version of the narrative planner tests
to show what kind of output it generates without requiring full API access.
"""

import asyncio
import sys
import os

# Add the current directory to the path
sys.path.insert(0, os.path.abspath(os.path.dirname(__file__)))

def create_sample_storylines():
    """Create sample storylines for demonstration."""
    return {
        "analysis": {
            "storylines": [
                "Marcus Rashford scored a spectacular 90th-minute winner against Liverpool",
                "Manchester United completed a dramatic comeback from 2-0 down",
                "Arsenal's tactical masterclass dismantled Chelsea's defensive setup",
                "Liverpool's unbeaten run extends to 15 matches with dominant victory",
                "Bukayo Saka's inverted wing play caused constant problems for opponents"
            ],
            "confidence": 0.9,
            "analysis_type": "mixed_narrative"
        }
    }

async def demonstrate_narrative_planner_output():
    """Demonstrate what the narrative planner outputs look like."""
    print("="*70)
    print("NARRATIVE PLANNER OUTPUT DEMONSTRATION")
    print("="*70)

    try:
        from scriber_agents.narrative_planner import NarrativePlanner
        from config.narrative_config import NarrativeConfig

        # Test with different configurations
        configs = {
            "Drama-focused": NarrativeConfig.get_drama_focused_config(),
            "Analytical": NarrativeConfig.get_analytical_config(),
            "Balanced": NarrativeConfig.get_balanced_config()
        }

        sample_data = create_sample_storylines()

        for config_name, config in configs.items():
            print(f"\n{'-'*50}")
            print(f"TESTING: {config_name.upper()} CONFIGURATION")
            print(f"{'-'*50}")

            try:
                planner = NarrativePlanner(config)
                recommendation = await planner.create_narrative_plan(sample_data)

                print(f"\nNARRATIVE GUIDANCE:")
                print(f"   Primary Angle: {recommendation.writing_guidance.primary_angle.value}")
                print(f"   Writing Style: {recommendation.writing_guidance.writing_style.value}")
                print(f"   Target Audience: {recommendation.writing_guidance.target_audience.value}")
                print(f"   Confidence: {recommendation.confidence_score:.2f}")

                print(f"\nKEY THEMES ({len(recommendation.key_themes)}):")
                for theme in recommendation.key_themes:
                    print(f"   - {theme}")

                print(f"\nEMOTIONAL ELEMENTS ({len(recommendation.emotional_elements)}):")
                for element in recommendation.emotional_elements:
                    print(f"   - {element}")

                print(f"\nINTELLIGENCE QUERIES ({len(recommendation.intelligence_queries)}):")
                for i, query in enumerate(recommendation.intelligence_queries[:3], 1):  # Show top 3
                    print(f"   {i}. {query.query_text}")
                    print(f"      Type: {query.query_type}")
                    print(f"      Stats: {', '.join(query.supported_stats)}")

                print(f"\nRESEARCH TASKS ({len(recommendation.researcher_tasks)}):")
                for i, task in enumerate(recommendation.researcher_tasks[:3], 1):  # Show top 3
                    print(f"   {i}. {task.task_description}")
                    print(f"      Source: {task.data_source}")

                print(f"\nSTORY ARC:")
                for section, description in recommendation.story_arc.items():
                    print(f"   {section.title()}: {description}")

                # Show entity extraction
                entities = planner._extract_entities_from_storylines(sample_data["analysis"]["storylines"])
                print(f"\nDETECTED ENTITIES:")
                print(f"   Players: {', '.join(entities['player'][:3]) if entities['player'] else 'None'}")
                print(f"   Teams: {', '.join(entities['team'][:3]) if entities['team'] else 'None'}")

            except Exception as e:
                print(f"FAILED to test {config_name}: {e}")

        print(f"\n{'='*70}")
        print("DEMONSTRATION COMPLETE")
        print("="*70)
        print("This shows how the Narrative Planner:")
        print("* Selects appropriate narrative angles based on storyline content")
        print("* Generates relevant intelligence queries for external data")
        print("* Creates research tasks for internal data analysis")
        print("* Extracts entities (players/teams) from storylines")
        print("* Provides structured writing guidance for different audiences")
        print("* Adapts recommendations based on configuration settings")

    except ImportError as e:
        print(f"ERROR - Import error: {e}")
        print("Make sure you're running from the correct directory with all dependencies installed")
    except Exception as e:
        print(f"ERROR - Error during demonstration: {e}")
        import traceback
        print(f"Traceback: {traceback.format_exc()}")

async def main():
    """Main demonstration function."""
    await demonstrate_narrative_planner_output()

if __name__ == "__main__":
    asyncio.run(main())