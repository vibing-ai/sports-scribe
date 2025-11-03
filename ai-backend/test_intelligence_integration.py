"""
Test script to verify Sports Intelligence Layer integration with Narrative Planner
"""
import asyncio
import sys
import os

# Add the current directory to Python path
sys.path.insert(0, os.path.dirname(__file__))

from scriber_agents.narrative_planner import NarrativePlanner

async def test_intelligence_integration():
    """Test the Sports Intelligence Layer integration."""
    print("=" * 60)
    print("TESTING SPORTS INTELLIGENCE LAYER INTEGRATION")
    print("=" * 60)
    
    # Create narrative planner with intelligence enabled
    config = {
        "model": "gpt-4o",
        "temperature": 0.6,
        "enable_real_intelligence": True  # Try real intelligence layer
    }
    
    planner = NarrativePlanner(config)
    
    try:
        # Initialize the planner (this will try to load Sports Intelligence Layer)
        print("🔧 Initializing Narrative Planner with Sports Intelligence Layer...")
        await planner.initialize()
        
        # Create test research output with storylines that should generate queries
        research_output = {
            "analysis": {
                "storylines": [
                    "Marcus Rashford scored his 15th goal of the season in the 89th minute",
                    "Manchester United completed a dramatic comeback from 2-0 down",
                    "The victory puts United back in contention for Champions League qualification",
                    "Bruno Fernandes provided his 8th assist of the campaign",
                    "Arsenal's defensive record has been impressive with 12 clean sheets"
                ],
                "confidence": 0.9,
                "analysis_type": "comprehensive"
            }
        }
        
        print(f"📝 Test storylines:")
        for i, storyline in enumerate(research_output["analysis"]["storylines"], 1):
            print(f"   {i}. {storyline}")
        
        # Generate narrative plan (this should execute intelligence queries)
        print(f"\n🚀 Creating narrative plan with intelligence queries...")
        recommendation = await planner.create_narrative_plan(research_output)
        
        # Display results
        print(f"\n📊 RESULTS:")
        print(f"   • Primary angle: {recommendation.writing_guidance.primary_angle.value}")
        print(f"   • Writing style: {recommendation.writing_guidance.writing_style.value}")
        print(f"   • Intelligence queries generated: {len(recommendation.intelligence_queries)}")
        print(f"   • Research tasks generated: {len(recommendation.researcher_tasks)}")
        print(f"   • Confidence score: {recommendation.confidence_score:.2f}")
        
        # Show intelligence queries
        if recommendation.intelligence_queries:
            print(f"\n🔍 INTELLIGENCE QUERIES GENERATED:")
            for i, query in enumerate(recommendation.intelligence_queries, 1):
                print(f"   {i}. {query.query_text}")
                print(f"      Type: {query.query_type}")
                print(f"      Expected: {query.expected_data}")
        else:
            print(f"\n⚠️ No intelligence queries were generated")
        
        # Check if intelligence results are attached
        if hasattr(recommendation, '__dict__') and 'intelligence_results' in recommendation.__dict__:
            intelligence_results = recommendation.__dict__['intelligence_results']
            print(f"\n🎯 INTELLIGENCE QUERY RESULTS:")
            successful_queries = sum(1 for r in intelligence_results if r.success)
            print(f"   • Total queries executed: {len(intelligence_results)}")
            print(f"   • Successful queries: {successful_queries}")
            print(f"   • Success rate: {successful_queries/len(intelligence_results)*100:.1f}%")
            
            # Show sample results
            for i, result in enumerate(intelligence_results[:3], 1):
                status = "✅ SUCCESS" if result.success else "❌ FAILED"
                print(f"   {i}. {status} - {result.query_text}")
                if result.success and result.data:
                    if isinstance(result.data, dict) and 'summary' in result.data:
                        print(f"      → {result.data['summary']}")
                    else:
                        print(f"      → {str(result.data)[:100]}...")
                elif result.error_message:
                    print(f"      → Error: {result.error_message}")
        else:
            print(f"\n⚠️ No intelligence results found in recommendation")
        
        print(f"\n✅ INTEGRATION TEST COMPLETED SUCCESSFULLY")
        return True
        
    except Exception as e:
        print(f"\n❌ INTEGRATION TEST FAILED: {e}")
        import traceback
        traceback.print_exc()
        return False
        
    finally:
        # Clean up
        try:
            await planner.close()
            print(f"🔌 Resources cleaned up")
        except Exception as e:
            print(f"⚠️ Cleanup warning: {e}")

async def test_mock_only_mode():
    """Test the system with mock responses only."""
    print("\n" + "=" * 60)
    print("TESTING MOCK-ONLY MODE")
    print("=" * 60)
    
    # Create narrative planner with intelligence disabled (mock only)
    config = {
        "model": "gpt-4o", 
        "temperature": 0.6,
        "enable_real_intelligence": False  # Force mock responses
    }
    
    planner = NarrativePlanner(config)
    
    try:
        await planner.initialize()
        
        research_output = {
            "analysis": {
                "storylines": [
                    "Liverpool extended their unbeaten run to 12 matches",
                    "Mohamed Salah scored his 20th goal of the season", 
                    "The Reds' defensive solidity has been key to their success"
                ],
                "confidence": 0.85,
                "analysis_type": "performance_focused"
            }
        }
        
        print(f"🔄 Creating narrative plan with mock intelligence responses...")
        recommendation = await planner.create_narrative_plan(research_output)
        
        print(f"📊 MOCK MODE RESULTS:")
        print(f"   • Queries generated: {len(recommendation.intelligence_queries)}")
        print(f"   • Mock responses should be used for all queries")
        print(f"   • Confidence: {recommendation.confidence_score:.2f}")
        
        print(f"✅ MOCK MODE TEST COMPLETED")
        return True
        
    except Exception as e:
        print(f"❌ MOCK MODE TEST FAILED: {e}")
        return False
        
    finally:
        await planner.close()

async def main():
    """Run all integration tests."""
    print("🧪 Starting Sports Intelligence Layer Integration Tests\n")
    
    # Test 1: Full integration (real + fallback)
    test1_success = await test_intelligence_integration()
    
    # Test 2: Mock-only mode
    test2_success = await test_mock_only_mode()
    
    # Summary
    print("\n" + "=" * 60)
    print("TEST SUMMARY")
    print("=" * 60)
    print(f"Full Integration Test: {'PASSED' if test1_success else 'FAILED'}")
    print(f"Mock-Only Test: {'PASSED' if test2_success else 'FAILED'}")
    
    overall_success = test1_success and test2_success
    print(f"\nOverall Result: {'✅ ALL TESTS PASSED' if overall_success else '❌ SOME TESTS FAILED'}")
    
    return overall_success

if __name__ == "__main__":
    success = asyncio.run(main())
    sys.exit(0 if success else 1)

