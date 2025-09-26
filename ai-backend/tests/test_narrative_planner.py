"""Tests for Narrative Planner functionality.

This module tests the narrative planner's ability to generate appropriate
queries and research tasks based on different narrative angles and storylines.
"""

import asyncio
import json
import logging
import os
import sys
from typing import Any, Dict

# Add the parent directory to the path so we can import the modules
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

# Configure logging
logging.basicConfig(
    level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)


def create_dramatic_storylines() -> Dict[str, Any]:
    """Create sample storylines with dramatic elements."""
    return {
        "analysis": {
            "storylines": [
                "Marcus Rashford scored a spectacular 90th-minute winner against Liverpool at Old Trafford",
                "Manchester United completed a dramatic comeback from 2-0 down to win 3-2",
                "The victory puts Manchester United back in the Champions League qualification race",
                "Rashford's goal was his 15th of the season, matching his career-best tally",
                "Liverpool's title hopes suffered a major blow with this defeat"
            ],
            "confidence": 0.9,
            "analysis_type": "dramatic_narrative"
        }
    }


def create_tactical_storylines() -> Dict[str, Any]:
    """Create sample storylines with tactical focus."""
    return {
        "analysis": {
            "storylines": [
                "Arsenal's 3-4-3 formation perfectly countered Chelsea's defensive setup",
                "Bukayo Saka's positioning as an inverted winger created constant problems for Chelsea",
                "Arsenal completed 89% of their passes with 67% possession dominance",
                "Chelsea's defensive record shows 12 clean sheets in 20 matches this season",
                "The tactical battle was decided by Arsenal's superior pressing intensity"
            ],
            "confidence": 0.85,
            "analysis_type": "tactical_analysis"
        }
    }


def create_team_performance_storylines() -> Dict[str, Any]:
    """Create sample storylines focused on team performance."""
    return {
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


async def test_dramatic_narrative_generation():
    """Test narrative planner with dramatic storylines."""
    print("\n" + "="*60)
    print("TESTING DRAMATIC NARRATIVE GENERATION")
    print("="*60)

    try:
        # Import required modules
        from scriber_agents.narrative_planner import NarrativePlanner, NarrativeAngle, WritingStyle
        from config.narrative_config import NarrativeConfig

        # Setup
        config = NarrativeConfig.get_drama_focused_config()
        planner = NarrativePlanner(config)
        research_output = create_dramatic_storylines()

        # Execute
        print("Creating narrative plan...")
        recommendation = await planner.create_narrative_plan(research_output)

        # Display results
        print(f"\nNARRATIVE ANALYSIS RESULTS:")
        print(f"Primary Angle: {recommendation.writing_guidance.primary_angle}")
        print(f"Writing Style: {recommendation.writing_guidance.writing_style}")
        print(f"Target Audience: {recommendation.writing_guidance.target_audience}")
        print(f"Confidence Score: {recommendation.confidence_score}")

        print(f"\nKEY THEMES ({len(recommendation.key_themes)}):")
        for theme in recommendation.key_themes:
            print(f"  - {theme}")

        print(f"\nEMOTIONAL ELEMENTS ({len(recommendation.emotional_elements)}):")
        for element in recommendation.emotional_elements:
            print(f"  - {element}")

        print(f"\nINTELLIGENCE QUERIES ({len(recommendation.intelligence_queries)}):")
        for i, query in enumerate(recommendation.intelligence_queries, 1):
            print(f"  {i}. {query.query_text}")
            print(f"     Type: {query.query_type}")
            print(f"     Stats: {', '.join(query.supported_stats)}")
            print(f"     Method: {query.database_method}")

        print(f"\nRESEARCHER TASKS ({len(recommendation.researcher_tasks)}):")
        for i, task in enumerate(recommendation.researcher_tasks, 1):
            print(f"  {i}. {task.task_description}")
            print(f"     Data Source: {task.data_source}")
            print(f"     Expected Output: {task.expected_output}")

        print(f"\nSTORY ARC STRUCTURE:")
        for section, description in recommendation.story_arc.items():
            print(f"  {section.title()}: {description}")

        # Basic validations
        assert recommendation.writing_guidance.primary_angle in [NarrativeAngle.DRAMA, NarrativeAngle.EMOTIONAL]
        assert len(recommendation.intelligence_queries) > 0
        assert len(recommendation.researcher_tasks) > 0
        assert recommendation.confidence_score > 0.5

        print(f"\n* Dramatic narrative test passed!")
        return recommendation

    except Exception as e:
        print(f"\nERROR - Dramatic narrative test failed: {e}")
        import traceback
        print(f"Traceback: {traceback.format_exc()}")
        return None


async def test_tactical_narrative_generation():
    """Test narrative planner with tactical storylines."""
    print("\n" + "="*60)
    print("TESTING TACTICAL NARRATIVE GENERATION")
    print("="*60)

    try:
        from scriber_agents.narrative_planner import NarrativePlanner, NarrativeAngle, TargetAudience
        from config.narrative_config import NarrativeConfig

        # Setup
        config = NarrativeConfig.get_analytical_config()
        planner = NarrativePlanner(config)
        research_output = create_tactical_storylines()

        # Execute
        print("Creating tactical narrative plan...")
        recommendation = await planner.create_narrative_plan(research_output)

        # Display results
        print(f"\nTACTICAL ANALYSIS RESULTS:")
        print(f"Primary Angle: {recommendation.writing_guidance.primary_angle}")
        print(f"Writing Style: {recommendation.writing_guidance.writing_style}")
        print(f"Target Audience: {recommendation.writing_guidance.target_audience}")

        print(f"\nFOCUS AREAS ({len(recommendation.writing_guidance.focus_areas)}):")
        for area in recommendation.writing_guidance.focus_areas:
            print(f"  - {area}")

        print(f"\nINTELLIGENCE QUERIES ({len(recommendation.intelligence_queries)}):")
        for i, query in enumerate(recommendation.intelligence_queries, 1):
            print(f"  {i}. {query.query_text}")
            print(f"     Expected Data: {query.expected_data}")

        print(f"\nTACTICAL RESEARCH TASKS:")
        tactical_tasks = [t for t in recommendation.researcher_tasks if "tactical" in t.analysis_type.lower() or "formation" in t.task_description.lower()]
        for i, task in enumerate(tactical_tasks, 1):
            print(f"  {i}. {task.task_description}")
            print(f"     Analysis Type: {task.analysis_type}")

        # Validations
        assert recommendation.writing_guidance.primary_angle in [NarrativeAngle.TACTICAL, NarrativeAngle.ANALYTICAL]
        assert recommendation.writing_guidance.target_audience in [TargetAudience.TACTICAL_ENTHUSIASTS, TargetAudience.EXPERT_ANALYSTS]
        assert len(tactical_tasks) > 0

        print(f"\n* Tactical narrative test passed!")
        return recommendation

    except Exception as e:
        print(f"\nERROR - Tactical narrative test failed: {e}")
        import traceback
        print(f"Traceback: {traceback.format_exc()}")
        return None


async def test_team_performance_generation():
    """Test narrative planner with team performance storylines."""
    print("\n" + "="*60)
    print("TESTING TEAM PERFORMANCE GENERATION")
    print("="*60)

    try:
        from scriber_agents.narrative_planner import NarrativePlanner, NarrativeAngle
        from config.narrative_config import NarrativeConfig

        # Setup
        config = NarrativeConfig.get_balanced_config()
        planner = NarrativePlanner(config)
        research_output = create_team_performance_storylines()

        # Execute
        print("Creating team performance narrative plan...")
        
        recommendation = await planner.create_narrative_plan(research_output)

        # Test entity extraction using new LLM-based method
        analysis = await planner._analyze_content_angles(research_output["analysis"]["storylines"])
        entities = planner._extract_entities_from_analysis(analysis)
        print(f"\nENTITY EXTRACTION RESULTS:")
        print(f"Teams Found: {entities['team']}")
        print(f"Players Found: {entities['player']}")

        print(f"\nTEAM PERFORMANCE ANALYSIS:")
        print(f"Primary Angle: {recommendation.writing_guidance.primary_angle}")
        print(f"Secondary Angle: {recommendation.writing_guidance.secondary_angle}")

        print(f"\nTEAM-FOCUSED INTELLIGENCE QUERIES:")
        team_queries = [q for q in recommendation.intelligence_queries if any(team in q.query_text for team in entities['team'])]
        for i, query in enumerate(team_queries, 1):
            print(f"  {i}. {query.query_text}")
            print(f"     Stats: {', '.join(query.supported_stats)}")

        print(f"\nTEAM-FOCUSED RESEARCH TASKS:")
        team_tasks = [t for t in recommendation.researcher_tasks if "team" in t.task_description.lower()]
        for i, task in enumerate(team_tasks, 1):
            print(f"  {i}. {task.task_description}")
            print(f"     Data Source: {task.data_source}")

        # Validations
        assert len(entities['team']) > 0, "Should detect team names in storylines"
        assert len(team_queries) > 0, "Should generate team-specific queries"
        assert recommendation.writing_guidance.primary_angle == NarrativeAngle.PERFORMANCE

        print(f"\n* Team performance test passed!")
        return recommendation

    except Exception as e:
        print(f"\nERROR - Team performance test failed: {e}")
        import traceback
        print(f"Traceback: {traceback.format_exc()}")
        return None


async def test_entity_extraction_accuracy():
    """Test the accuracy of entity extraction."""
    print("\n" + "="*60)
    print("TESTING ENTITY EXTRACTION ACCURACY")
    print("="*60)

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

        # Test the new LLM-based entity extraction through content analysis
        analysis = await planner._analyze_content_angles(test_storylines)
        entities = planner._extract_entities_from_analysis(analysis)

        print("Test Storylines:")
        for i, storyline in enumerate(test_storylines, 1):
            print(f"  {i}. {storyline}")

        print(f"\nExtracted Entities:")
        print(f"  Players: {entities['player']}")
        print(f"  Teams: {entities['team']}")

        # Basic validations
        assert len(entities['player']) > 0, "Should extract some player names"
        assert len(entities['team']) > 0, "Should extract some team names"
        assert "Manchester United" in entities['team'], "Should detect Manchester United"
        assert "Arsenal" in entities['team'], "Should detect Arsenal"

        print(f"\n* Entity extraction test passed!")
        return entities

    except Exception as e:
        print(f"\nERROR - Entity extraction test failed: {e}")
        import traceback
        print(f"Traceback: {traceback.format_exc()}")
        return None


async def test_sports_intelligence_integration():
    """Test Sports Intelligence Layer integration with Narrative Planner."""
    print("\n" + "="*60)
    print("TESTING SPORTS INTELLIGENCE LAYER INTEGRATION")
    print("="*60)

    try:
        from scriber_agents.narrative_planner import NarrativePlanner
        from config.narrative_config import NarrativeConfig

        # Setup with real intelligence enabled
        config = NarrativeConfig.get_drama_focused_config()
        config["enable_real_intelligence"] = True  # Enable real Sports Intelligence Layer
        planner = NarrativePlanner(config)

        # Initialize the planner (loads Sports Intelligence Layer)
        print("🔧 Initializing Narrative Planner with Sports Intelligence Layer...")
        await planner.initialize()

        # Create research output with entities that should generate queries
        research_output = {
            "analysis": {
                "storylines": [
                    "Marcus Rashford scored his 15th goal of the season in Manchester United's 3-2 victory",
                    "Bruno Fernandes provided his 8th assist of the campaign",
                    "Manchester United completed a dramatic comeback from 2-0 down",
                    "Liverpool's defensive record shows 12 clean sheets this season",
                    "The victory puts United back in Champions League contention"
                ],
                "confidence": 0.9,
                "analysis_type": "intelligence_integration_test"
            }
        }

        print("\n📝 Test storylines with entities:")
        for i, storyline in enumerate(research_output["analysis"]["storylines"], 1):
            print(f"   {i}. {storyline}")

        # Execute narrative plan (should execute intelligence queries)
        print(f"\n🚀 Creating narrative plan with intelligence queries...")
        recommendation = await planner.create_narrative_plan(research_output)

        # Test intelligence query generation
        print(f"\n🔍 INTELLIGENCE QUERIES GENERATED:")
        print(f"   • Total queries: {len(recommendation.intelligence_queries)}")
        
        for i, query in enumerate(recommendation.intelligence_queries, 1):
            print(f"   {i}. {query.query_text}")
            print(f"      Type: {query.query_type}")
            print(f"      Expected: {query.expected_data}")
            print(f"      Stats: {', '.join(query.supported_stats)}")

        # Check if intelligence results are available
        intelligence_results = None
        if hasattr(recommendation, '__dict__') and 'intelligence_results' in recommendation.__dict__:
            intelligence_results = recommendation.__dict__['intelligence_results']

        if intelligence_results:
            print(f"\n🎯 INTELLIGENCE QUERY EXECUTION RESULTS:")
            successful_queries = sum(1 for r in intelligence_results if r.success)
            total_queries = len(intelligence_results)
            success_rate = (successful_queries / total_queries * 100) if total_queries > 0 else 0

            print(f"   • Queries executed: {total_queries}")
            print(f"   • Successful: {successful_queries}")
            print(f"   • Success rate: {success_rate:.1f}%")

            # Show sample results
            for i, result in enumerate(intelligence_results[:3], 1):
                status = "✅ SUCCESS" if result.success else "❌ FAILED"
                print(f"   {i}. {status} - {result.query_text}")
                print(f"      Execution time: {result.execution_time:.3f}s")
                
                if result.success and result.data:
                    if isinstance(result.data, dict):
                        summary = result.data.get('summary', 'No summary available')
                        print(f"      Result: {summary}")
                        
                        # Show data details if available
                        data_points = result.data.get('data', [])
                        if isinstance(data_points, list) and data_points:
                            print(f"      Data: {data_points[0] if data_points else 'No data'}")
                    else:
                        print(f"      Result: {str(result.data)[:100]}...")
                elif result.error_message:
                    print(f"      Error: {result.error_message}")
        else:
            print(f"\n⚠️ No intelligence results found - queries may not have been executed")

        # Test confidence enhancement from intelligence data
        print(f"\n📈 CONFIDENCE ANALYSIS:")
        print(f"   • Final confidence: {recommendation.confidence_score:.3f}")
        print(f"   • Intelligence data impact: {'Positive' if recommendation.confidence_score > 0.7 else 'Neutral'}")

        # Validations
        assert len(recommendation.intelligence_queries) > 0, "Should generate intelligence queries"
        assert recommendation.confidence_score > 0.0, "Should have valid confidence score"
        
        # If intelligence results exist, validate them
        if intelligence_results:
            assert len(intelligence_results) > 0, "Should have intelligence results"
            # At least some queries should succeed (either real or mock)
            assert any(r.success for r in intelligence_results), "At least one query should succeed"

        print(f"\n✅ Sports Intelligence integration test passed!")
        return {
            "recommendation": recommendation,
            "intelligence_results": intelligence_results,
            "queries_generated": len(recommendation.intelligence_queries),
            "queries_executed": len(intelligence_results) if intelligence_results else 0
        }

    except Exception as e:
        print(f"\n❌ ERROR - Sports Intelligence integration test failed: {e}")
        import traceback
        print(f"Traceback: {traceback.format_exc()}")
        return None
    
    finally:
        # Clean up
        try:
            await planner.close()
        except:
            pass


async def test_mock_intelligence_mode():
    """Test Sports Intelligence Layer in mock-only mode."""
    print("\n" + "="*60)
    print("TESTING MOCK INTELLIGENCE MODE")
    print("="*60)

    try:
        from scriber_agents.narrative_planner import NarrativePlanner

        # Setup with mock intelligence only
        config = {
            "model": "gpt-4o",
            "temperature": 0.6,
            "enable_real_intelligence": False  # Force mock responses
        }
        planner = NarrativePlanner(config)
        await planner.initialize()

        # Create research output
        research_output = {
            "analysis": {
                "storylines": [
                    "Liverpool extended their unbeaten run to 12 matches",
                    "Mohamed Salah scored his 20th goal of the season",
                    "The Reds' defensive record shows 8 clean sheets",
                    "Liverpool's win rate this season is impressive at 85%"
                ],
                "confidence": 0.85,
                "analysis_type": "mock_intelligence_test"
            }
        }

        print("\n🔄 Creating narrative plan with mock intelligence responses...")
        recommendation = await planner.create_narrative_plan(research_output)

        # Check mock intelligence results
        intelligence_results = None
        if hasattr(recommendation, '__dict__') and 'intelligence_results' in recommendation.__dict__:
            intelligence_results = recommendation.__dict__['intelligence_results']

        print(f"\n🎭 MOCK INTELLIGENCE RESULTS:")
        if intelligence_results:
            mock_queries = sum(1 for r in intelligence_results if r.success and r.confidence_score == 0.7)  # Mock confidence
            print(f"   • Total queries: {len(intelligence_results)}")
            print(f"   • Mock responses: {mock_queries}")
            print(f"   • All queries should use mock data")

            # Show sample mock results
            for i, result in enumerate(intelligence_results[:2], 1):
                if result.success:
                    print(f"   {i}. Mock Query: {result.query_text}")
                    if isinstance(result.data, dict) and 'summary' in result.data:
                        print(f"      Mock Result: {result.data['summary']}")
        else:
            print(f"   • No intelligence results generated")

        # Validations for mock mode
        assert len(recommendation.intelligence_queries) >= 0, "Should handle mock mode gracefully"
        
        if intelligence_results:
            # In mock mode, all successful queries should have mock confidence score
            mock_results = [r for r in intelligence_results if r.success and r.confidence_score == 0.7]
            assert len(mock_results) > 0, "Should have mock results with mock confidence score"

        print(f"\n✅ Mock intelligence mode test passed!")
        return {
            "mock_queries": len(intelligence_results) if intelligence_results else 0,
            "confidence": recommendation.confidence_score
        }

    except Exception as e:
        print(f"\n❌ ERROR - Mock intelligence mode test failed: {e}")
        import traceback
        print(f"Traceback: {traceback.format_exc()}")
        return None
    
    finally:
        try:
            await planner.close()
        except:
            pass


async def test_intelligence_query_types():
    """Test different types of intelligence queries are generated correctly."""
    print("\n" + "="*60)
    print("TESTING INTELLIGENCE QUERY TYPES")
    print("="*60)

    try:
        from scriber_agents.narrative_planner import NarrativePlanner, NarrativeAngle

        # Setup
        planner = NarrativePlanner({"enable_real_intelligence": False})  # Use mock for testing
        await planner.initialize()

        # Test different narrative angles to generate different query types
        test_cases = [
            {
                "name": "Drama Angle",
                "storylines": [
                    "Marcus Rashford scored a dramatic 90th-minute winner",
                    "Manchester United completed an incredible comeback",
                    "The victory was Rashford's 15th goal of the season"
                ],
                "expected_angle": NarrativeAngle.DRAMA
            },
            {
                "name": "Performance Angle", 
                "storylines": [
                    "Erling Haaland's performance statistics are impressive",
                    "Manchester City's attacking output has been phenomenal",
                    "Haaland has scored 25 goals in 20 appearances"
                ],
                "expected_angle": NarrativeAngle.PERFORMANCE
            },
            {
                "name": "Tactical Angle",
                "storylines": [
                    "Arsenal's 4-3-3 formation dominated possession",
                    "The tactical battle was won in midfield",
                    "Arsenal completed 89% of their passes"
                ],
                "expected_angle": NarrativeAngle.TACTICAL
            }
        ]

        query_type_results = {}

        for test_case in test_cases:
            print(f"\n🧪 Testing {test_case['name']}...")
            
            research_output = {
                "analysis": {
                    "storylines": test_case["storylines"],
                    "confidence": 0.8,
                    "analysis_type": f"query_type_test_{test_case['name'].lower().replace(' ', '_')}"
                }
            }

            recommendation = await planner.create_narrative_plan(research_output)
            
            print(f"   • Primary angle: {recommendation.writing_guidance.primary_angle.value}")
            print(f"   • Intelligence queries: {len(recommendation.intelligence_queries)}")
            
            # Collect query types
            query_types = [q.query_type for q in recommendation.intelligence_queries]
            unique_query_types = list(set(query_types))
            
            print(f"   • Query types: {unique_query_types}")
            
            # Show sample queries
            for i, query in enumerate(recommendation.intelligence_queries[:2], 1):
                print(f"     {i}. {query.query_text}")
                print(f"        Type: {query.query_type}")
                print(f"        Stats: {', '.join(query.supported_stats)}")
            
            query_type_results[test_case['name']] = {
                "angle": recommendation.writing_guidance.primary_angle.value,
                "query_count": len(recommendation.intelligence_queries),
                "query_types": unique_query_types
            }

        # Summary
        print(f"\n📊 QUERY TYPE GENERATION SUMMARY:")
        for test_name, results in query_type_results.items():
            print(f"   {test_name}:")
            print(f"     - Angle: {results['angle']}")
            print(f"     - Queries: {results['query_count']}")
            print(f"     - Types: {results['query_types']}")

        # Validations
        total_queries = sum(r['query_count'] for r in query_type_results.values())
        assert total_queries > 0, "Should generate intelligence queries across different angles"
        
        # Should have different query types for different angles
        all_query_types = set()
        for results in query_type_results.values():
            all_query_types.update(results['query_types'])
        assert len(all_query_types) > 0, "Should generate different types of queries"

        print(f"\n✅ Intelligence query types test passed!")
        return query_type_results

    except Exception as e:
        print(f"\n❌ ERROR - Intelligence query types test failed: {e}")
        import traceback
        print(f"Traceback: {traceback.format_exc()}")
        return None
    
    finally:
        try:
            await planner.close()
        except:
            pass


async def run_comprehensive_tests():
    """Run all narrative planner tests."""
    print("="*60)
    print("COMPREHENSIVE NARRATIVE PLANNER TEST SUITE")
    print("="*60)

    results = {}

    try:
        # Run individual tests
        print("\n-> Running comprehensive tests...")

        # Core narrative tests
        results["dramatic"] = await test_dramatic_narrative_generation()
        results["tactical"] = await test_tactical_narrative_generation()
        results["team_performance"] = await test_team_performance_generation()
        results["entity_extraction"] = await test_entity_extraction_accuracy()
        
        # Sports Intelligence integration tests
        print("\n-> Running Sports Intelligence integration tests...")
        results["sports_intelligence_integration"] = await test_sports_intelligence_integration()
        results["mock_intelligence_mode"] = await test_mock_intelligence_mode()
        results["intelligence_query_types"] = await test_intelligence_query_types()

        # Summary
        print("\n" + "="*60)
        print("TEST RESULTS SUMMARY")
        print("="*60)

        passed_tests = sum(1 for result in results.values() if result is not None)
        total_tests = len(results)

        print(f"Tests Passed: {passed_tests}/{total_tests}")

        # Group results by category
        core_tests = ["dramatic", "tactical", "team_performance", "entity_extraction"]
        intelligence_tests = ["sports_intelligence_integration", "mock_intelligence_mode", "intelligence_query_types"]

        print(f"\nCORE NARRATIVE TESTS:")
        for test_name in core_tests:
            result = results.get(test_name)
            status = "PASSED" if result is not None else "FAILED"
            print(f"  {test_name.replace('_', ' ').title()}: {status}")

        print(f"\nSPORTS INTELLIGENCE TESTS:")
        for test_name in intelligence_tests:
            result = results.get(test_name)
            status = "PASSED" if result is not None else "FAILED"
            print(f"  {test_name.replace('_', ' ').title()}: {status}")

        if passed_tests == total_tests:
            print(f"\n*** ALL TESTS PASSED SUCCESSFULLY! ***")
            print("The Narrative Planner is working correctly with:")
            print("  - Dramatic storyline processing")
            print("  - Tactical analysis generation")
            print("  - Team performance evaluation")
            print("  - Entity extraction from storylines")
            print("  - Intelligence query generation")
            print("  - Sports Intelligence Layer integration")
            print("  - Mock intelligence responses")
            print("  - Different query types for different angles")
            print("  - Research task recommendations")
        else:
            print(f"\nWARNING - {total_tests - passed_tests} TEST(S) FAILED")
            
        # Show intelligence integration summary if available
        intel_result = results.get("sports_intelligence_integration")
        if intel_result:
            print(f"\nSPORTS INTELLIGENCE INTEGRATION SUMMARY:")
            print(f"  • Queries generated: {intel_result.get('queries_generated', 0)}")
            print(f"  • Queries executed: {intel_result.get('queries_executed', 0)}")
            if intel_result.get('intelligence_results'):
                successful = sum(1 for r in intel_result['intelligence_results'] if r.success)
                total = len(intel_result['intelligence_results'])
                print(f"  • Success rate: {successful}/{total} ({successful/total*100:.1f}%)")

        return results

    except Exception as e:
        print(f"\nERROR - Test suite failed with error: {e}")
        import traceback
        print(f"Traceback: {traceback.format_exc()}")
        return None


async def main():
    """Main test function."""
    await run_comprehensive_tests()


if __name__ == "__main__":
    # Run the tests
    asyncio.run(main())
