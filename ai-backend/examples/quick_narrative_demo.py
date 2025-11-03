"""
Quick Narrative Planner Demo

A simplified demonstration script that quickly shows the core functionality
of the Narrative Planner with Sports Intelligence Layer integration.

Run with: python examples/quick_narrative_demo.py
"""

import asyncio
import sys
import os

# Add the parent directory to the path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from scriber_agents.narrative_planner import NarrativePlanner

async def quick_demo():
    """Quick demonstration of narrative planner functionality."""
    
    print("🎯 QUICK NARRATIVE PLANNER DEMO")
    print("=" * 50)
    
    # Setup planner with mock intelligence (for quick testing)
    config = {
        "model": "gpt-4o",
        "temperature": 0.6,
        "enable_real_intelligence": False  # Use mock for quick demo
    }
    
    planner = NarrativePlanner(config)
    await planner.initialize()
    
    try:
        # Sample research output
        research_output = {
            "analysis": {
                "storylines": [
                    "Marcus Rashford scored his 15th goal of the season in a dramatic 90th-minute winner",
                    "Manchester United completed an incredible comeback from 2-0 down against Liverpool",
                    "Bruno Fernandes provided the crucial assist with a perfectly weighted through ball",
                    "The victory puts United back in contention for Champions League qualification",
                    "Liverpool's title hopes suffered a major setback with this unexpected defeat"
                ],
                "confidence": 0.9,
                "analysis_type": "quick_demo"
            }
        }
        
        print("\n📝 Input Storylines:")
        for i, storyline in enumerate(research_output["analysis"]["storylines"], 1):
            print(f"   {i}. {storyline}")
        
        print("\n🚀 Processing with Narrative Planner...")
        
        # Generate narrative plan
        recommendation = await planner.create_narrative_plan(research_output)
        
        # Display key results
        print(f"\n📊 RESULTS:")
        print(f"   • Primary Angle: {recommendation.writing_guidance.primary_angle.value}")
        print(f"   • Writing Style: {recommendation.writing_guidance.writing_style.value}")
        print(f"   • Target Audience: {recommendation.writing_guidance.target_audience.value}")
        print(f"   • Confidence: {recommendation.confidence_score:.3f}")
        
        # Show intelligence queries
        if recommendation.intelligence_queries:
            print(f"\n🔍 Intelligence Queries Generated ({len(recommendation.intelligence_queries)}):")
            for i, query in enumerate(recommendation.intelligence_queries[:3], 1):  # Show first 3
                print(f"   {i}. {query.query_text}")
        
        # Show research tasks  
        if recommendation.researcher_tasks:
            print(f"\n📊 Research Tasks Generated ({len(recommendation.researcher_tasks)}):")
            for i, task in enumerate(recommendation.researcher_tasks[:3], 1):  # Show first 3
                print(f"   {i}. {task.task_description}")
        
        # Check for intelligence results
        if hasattr(recommendation, '__dict__') and 'intelligence_results' in recommendation.__dict__:
            intelligence_results = recommendation.__dict__['intelligence_results']
            if intelligence_results:
                successful = sum(1 for r in intelligence_results if r.success)
                print(f"\n🎯 Intelligence Execution: {successful}/{len(intelligence_results)} successful")
        
        # Show story structure
        print(f"\n📖 Story Arc:")
        for section, description in recommendation.story_arc.items():
            print(f"   • {section.title()}: {description}")
        
        print(f"\n✅ Demo completed successfully!")
        
    except Exception as e:
        print(f"\n❌ Demo failed: {e}")
        import traceback
        traceback.print_exc()
    
    finally:
        await planner.close()

if __name__ == "__main__":
    asyncio.run(quick_demo())

