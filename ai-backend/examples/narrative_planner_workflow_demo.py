"""
Narrative Planner Workflow Demo

This script demonstrates the complete workflow of the Narrative Planner with Sports Intelligence Layer integration.
It shows how to:
1. Create research output with storylines
2. Generate narrative plans with different angles
3. Execute intelligence queries
4. Enhance content with intelligence data
5. Generate writing guidance for different audiences

Run with: python examples/narrative_planner_workflow_demo.py
"""

import asyncio
import sys
import os
import json
from datetime import datetime

# Add the parent directory to the path so we can import the modules
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from scriber_agents.narrative_planner import NarrativePlanner, NarrativeAngle, WritingStyle, TargetAudience

def print_section_header(title: str, emoji: str = "🎯"):
    """Print a formatted section header."""
    print(f"\n{emoji} " + "=" * 60)
    print(f"{emoji} {title.upper()}")
    print(f"{emoji} " + "=" * 60)

def print_subsection(title: str, emoji: str = "📋"):
    """Print a formatted subsection header."""
    print(f"\n{emoji} {title}")
    print("-" * 50)

def create_sample_research_outputs():
    """Create different types of research outputs for demonstration."""
    return {
        "dramatic_match": {
            "analysis": {
                "storylines": [
                    "Marcus Rashford scored a spectacular 90th-minute winner to complete Manchester United's remarkable comeback",
                    "Manchester United overturned a 2-0 deficit against Liverpool in one of the most dramatic matches of the season",
                    "The victory was Rashford's 15th goal of the season, matching his career-best Premier League tally",
                    "Bruno Fernandes provided the crucial assist for the winning goal with a perfectly weighted through ball",
                    "Liverpool's title hopes suffered a major blow as they dropped crucial points at Old Trafford",
                    "The match showcased the tactical battle between Erik ten Hag and Jürgen Klopp's approaches"
                ],
                "confidence": 0.95,
                "analysis_type": "dramatic_narrative"
            }
        },
        "tactical_analysis": {
            "analysis": {
                "storylines": [
                    "Arsenal's 3-4-3 formation perfectly neutralized Chelsea's defensive structure",
                    "Bukayo Saka's role as an inverted winger created constant overloads in the final third",
                    "Arsenal dominated possession with 68% and completed 89% of their passes",
                    "Chelsea's defensive record shows 12 clean sheets in 20 matches this season",
                    "The tactical switch to a back three proved decisive in Arsenal's 2-1 victory",
                    "Mikel Arteta's pressing system forced Chelsea into 15 turnovers in dangerous areas"
                ],
                "confidence": 0.88,
                "analysis_type": "tactical_deep_dive"
            }
        },
        "performance_focus": {
            "analysis": {
                "storylines": [
                    "Erling Haaland's hat-trick took his season tally to 25 goals in just 20 Premier League appearances",
                    "Manchester City's attacking efficiency reached new heights with a 4-1 victory over Newcastle",
                    "Kevin De Bruyne provided two assists to extend his league-leading tally to 12 for the season",
                    "Newcastle's defensive organization was breached by City's fluid movement and quick passing",
                    "The victory maintains City's five-point lead at the top of the Premier League table",
                    "Haaland's goals-per-game ratio of 1.25 is the highest in Premier League history"
                ],
                "confidence": 0.92,
                "analysis_type": "performance_analysis"
            }
        }
    }

async def demonstrate_narrative_angle_selection(planner: NarrativePlanner, research_output: dict, scenario_name: str):
    """Demonstrate how Narrative Planner selects appropriate writing angles."""
    print_subsection(f"Narrative Angle Selection for {scenario_name}", "🎯")
    
    # Show input storylines
    storylines = research_output["analysis"]["storylines"]
    print(f"📝 Input Storylines ({len(storylines)}):")
    for i, storyline in enumerate(storylines, 1):
        print(f"   {i}. {storyline}")
    
    # Generate narrative plan
    print(f"\n🤖 Analyzing content for optimal narrative angle...")
    recommendation = await planner.create_narrative_plan(research_output)
    
    # Show angle selection results
    print(f"\n🎯 NARRATIVE ANGLE SELECTION RESULTS:")
    print(f"   ✅ Primary Angle: {recommendation.writing_guidance.primary_angle.value}")
    if recommendation.writing_guidance.secondary_angle:
        print(f"   ✅ Secondary Angle: {recommendation.writing_guidance.secondary_angle.value}")
    else:
        print(f"   ➖ Secondary Angle: None")
    
    # Show why this angle was selected
    print(f"\n📊 ANGLE SELECTION RATIONALE:")
    print(f"   • Writing Style: {recommendation.writing_guidance.writing_style.value}")
    print(f"   • Target Audience: {recommendation.writing_guidance.target_audience.value}")
    print(f"   • Confidence in Selection: {recommendation.confidence_score:.3f}")
    
    # Show content themes that influenced the selection
    if recommendation.key_themes:
        print(f"   • Detected Themes: {', '.join(recommendation.key_themes)}")
    if recommendation.emotional_elements:
        print(f"   • Emotional Elements: {', '.join(recommendation.emotional_elements)}")
    
    # Show tone and focus guidance for the selected angle
    guidance = recommendation.writing_guidance
    print(f"\n✍️ WRITING GUIDANCE FOR SELECTED ANGLE:")
    print(f"   • Tone Keywords: {', '.join(guidance.tone_keywords)}")
    print(f"   • Focus Areas: {', '.join(guidance.focus_areas)}")
    
    return recommendation

async def demonstrate_intelligence_integration(planner: NarrativePlanner, research_output: dict):
    """Demonstrate Sports Intelligence Layer integration."""
    print_subsection("Sports Intelligence Integration", "🔍")
    
    # Generate plan with intelligence queries
    recommendation = await planner.create_narrative_plan(research_output)
    
    # Show intelligence queries generated
    print(f"📋 Intelligence Queries Generated ({len(recommendation.intelligence_queries)}):")
    for i, query in enumerate(recommendation.intelligence_queries, 1):
        print(f"   {i}. {query.query_text}")
        print(f"      Type: {query.query_type}")
        print(f"      Stats: {', '.join(query.supported_stats)}")
        print(f"      Method: {query.database_method}")
    
    # Show research tasks
    print(f"\n📊 Research Tasks Generated ({len(recommendation.researcher_tasks)}):")
    for i, task in enumerate(recommendation.researcher_tasks, 1):
        print(f"   {i}. {task.task_description}")
        print(f"      Data Source: {task.data_source}")
        print(f"      Priority: {task.priority}")
    
    # Check for intelligence results
    intelligence_results = None
    if hasattr(recommendation, '__dict__') and 'intelligence_results' in recommendation.__dict__:
        intelligence_results = recommendation.__dict__['intelligence_results']
    
    if intelligence_results:
        print(f"\n🎯 Intelligence Query Results:")
        successful = sum(1 for r in intelligence_results if r.success)
        total = len(intelligence_results)
        print(f"   • Execution Summary: {successful}/{total} successful ({successful/total*100:.1f}%)")
        
        # Show sample results
        for i, result in enumerate(intelligence_results[:3], 1):
            status = "✅" if result.success else "❌"
            print(f"   {i}. {status} {result.query_text}")
            print(f"      Time: {result.execution_time:.3f}s")
            
            if result.success and result.data:
                if isinstance(result.data, dict) and 'summary' in result.data:
                    print(f"      Result: {result.data['summary']}")
                else:
                    print(f"      Result: {str(result.data)[:80]}...")
            elif result.error_message:
                print(f"      Error: {result.error_message}")
    
    return recommendation

async def demonstrate_story_arc_generation(recommendation):
    """Demonstrate story arc and content structure generation."""
    print_subsection("Story Arc & Content Structure", "📖")
    
    # Show story arc
    print(f"📚 Narrative Story Arc:")
    for section, description in recommendation.story_arc.items():
        print(f"   • {section.title()}: {description}")
    
    # Show prioritized content
    print(f"\n📈 Prioritized Content ({len(recommendation.prioritized_content)}):")
    for i, content in enumerate(recommendation.prioritized_content[:5], 1):  # Show top 5
        print(f"   {i}. Priority {content.priority}: {content.content[:80]}{'...' if len(content.content) > 80 else ''}")
        print(f"      Angle: {content.narrative_angle.value} | Emotional Weight: {content.emotional_weight:.2f}")
    
    # Show writing guidance details
    print(f"\n✍️ Writing Guidance Details:")
    guidance = recommendation.writing_guidance
    print(f"   • Tone Keywords: {', '.join(guidance.tone_keywords)}")
    print(f"   • Focus Areas: {', '.join(guidance.focus_areas)}")
    
    # Show content structure
    print(f"\n🏗️ Content Structure:")
    for section, approach in guidance.content_structure.items():
        print(f"   • {section.title()}: {approach}")

async def demonstrate_different_configurations():
    """Demonstrate different narrative planner configurations."""
    print_section_header("Different Configuration Modes", "⚙️")
    
    configurations = [
        {
            "name": "Drama-Focused Mode",
            "config": {
                "model": "gpt-4o",
                "temperature": 0.7,  # Higher temperature for creative drama
                "enable_real_intelligence": False,  # Use mock for demo
                "max_tokens": 2000
            },
            "description": "Optimized for dramatic storytelling with emotional impact"
        },
        {
            "name": "Analytical Mode", 
            "config": {
                "model": "gpt-4o",
                "temperature": 0.3,  # Lower temperature for analytical precision
                "enable_real_intelligence": False,
                "max_tokens": 2500
            },
            "description": "Focused on tactical analysis and statistical insights"
        },
        {
            "name": "Balanced Mode",
            "config": {
                "model": "gpt-4o", 
                "temperature": 0.5,  # Balanced creativity and precision
                "enable_real_intelligence": True,  # Try real intelligence
                "max_tokens": 2000
            },
            "description": "Balanced approach for general audience appeal"
        }
    ]
    
    # Use the dramatic match scenario for comparison
    sample_outputs = create_sample_research_outputs()
    test_scenario = sample_outputs["dramatic_match"]
    
    results = {}
    
    for config_info in configurations:
        print_subsection(f"Testing {config_info['name']}", "🧪")
        print(f"Description: {config_info['description']}")
        
        # Create planner with specific config
        planner = NarrativePlanner(config_info["config"])
        await planner.initialize()
        
        try:
            # Generate recommendation
            recommendation = await planner.create_narrative_plan(test_scenario)
            
            # Store results for comparison
            results[config_info["name"]] = {
                "primary_angle": recommendation.writing_guidance.primary_angle.value,
                "writing_style": recommendation.writing_guidance.writing_style.value,
                "target_audience": recommendation.writing_guidance.target_audience.value,
                "confidence": recommendation.confidence_score,
                "query_count": len(recommendation.intelligence_queries),
                "themes": recommendation.key_themes
            }
            
            print(f"✅ Results:")
            print(f"   • Primary Angle: {recommendation.writing_guidance.primary_angle.value}")
            print(f"   • Writing Style: {recommendation.writing_guidance.writing_style.value}")
            print(f"   • Target Audience: {recommendation.writing_guidance.target_audience.value}")
            print(f"   • Confidence: {recommendation.confidence_score:.3f}")
            print(f"   • Intelligence Queries: {len(recommendation.intelligence_queries)}")
            
        except Exception as e:
            print(f"❌ Error: {e}")
            results[config_info["name"]] = {"error": str(e)}
        
        finally:
            await planner.close()
    
    # Show comparison
    print_subsection("Configuration Comparison", "📊")
    for name, result in results.items():
        if "error" not in result:
            print(f"{name}:")
            print(f"   Angle: {result['primary_angle']} | Style: {result['writing_style']}")
            print(f"   Audience: {result['target_audience']} | Confidence: {result['confidence']:.3f}")
        else:
            print(f"{name}: Error - {result['error']}")

async def demonstrate_real_world_workflow():
    """Demonstrate a complete real-world workflow."""
    print_section_header("Complete Real-World Workflow", "🌟")
    
    # Initialize planner
    config = {
        "model": "gpt-4o",
        "temperature": 0.6,
        "enable_real_intelligence": True,  # Try real intelligence
        "max_tokens": 2000
    }
    
    planner = NarrativePlanner(config)
    await planner.initialize()
    
    try:
        # Get sample research outputs
        sample_outputs = create_sample_research_outputs()
        
        # Process different scenarios
        for scenario_name, research_output in sample_outputs.items():
            print_section_header(f"Scenario: {scenario_name.replace('_', ' ').title()}", "🎬")
            
            # Step 1: Narrative angle selection
            recommendation = await demonstrate_narrative_angle_selection(planner, research_output, scenario_name)
            
            # Step 2: Intelligence integration
            await demonstrate_intelligence_integration(planner, research_output)
            
            # Step 3: Story arc and structure
            await demonstrate_story_arc_generation(recommendation)
            
            # Add separator between scenarios
            print("\n" + "=" * 80)
        
    finally:
        await planner.close()

async def demonstrate_intelligence_results_detail():
    """Show detailed Sports Intelligence Layer access results."""
    print_section_header("Sports Intelligence Layer Access Results", "🔍")
    
    # Use a configuration that will try real intelligence first, then fallback to mock
    config = {
        "model": "gpt-4o",
        "temperature": 0.6,
        "enable_real_intelligence": True  # Try real intelligence layer
    }
    
    planner = NarrativePlanner(config)
    await planner.initialize()
    
    try:
        # Create research output with clear entities for intelligence queries
        research_output = {
            "analysis": {
                "storylines": [
                    "Marcus Rashford scored his 15th goal of the season for Manchester United",
                    "Bruno Fernandes has provided 8 assists this campaign",
                    "Manchester United have won 18 matches this season",
                    "Liverpool have kept 12 clean sheets this season",
                    "Mohamed Salah has scored 20 goals in the Premier League"
                ],
                "confidence": 0.9,
                "analysis_type": "intelligence_demo"
            }
        }
        
        print("📝 Input storylines with clear entities:")
        for i, storyline in enumerate(research_output["analysis"]["storylines"], 1):
            print(f"   {i}. {storyline}")
        
        print(f"\n🚀 Processing with Sports Intelligence Layer...")
        recommendation = await planner.create_narrative_plan(research_output)
        
        print(f"\n🔍 Generated Intelligence Queries:")
        for i, query in enumerate(recommendation.intelligence_queries, 1):
            print(f"   {i}. Query: {query.query_text}")
            print(f"      Type: {query.query_type}")
            print(f"      Database Method: {query.database_method}")
            print(f"      Expected Stats: {', '.join(query.supported_stats)}")
        
        # Show actual intelligence results
        intelligence_results = None
        if hasattr(recommendation, '__dict__') and 'intelligence_results' in recommendation.__dict__:
            intelligence_results = recommendation.__dict__['intelligence_results']
        
        if intelligence_results:
            print(f"\n🎯 SPORTS INTELLIGENCE LAYER RESULTS:")
            print(f"   Total Queries Executed: {len(intelligence_results)}")
            
            for i, result in enumerate(intelligence_results, 1):
                print(f"\n   Query {i}: {result.query_text}")
                print(f"   Status: {'✅ SUCCESS' if result.success else '❌ FAILED'}")
                print(f"   Execution Time: {result.execution_time:.3f}s")
                print(f"   Confidence Score: {result.confidence_score:.2f}")
                
                if result.success and result.data:
                    print(f"   📊 Data Returned:")
                    if isinstance(result.data, dict):
                        # Show summary if available
                        if 'summary' in result.data:
                            print(f"      Summary: {result.data['summary']}")
                        
                        # Show data points
                        if 'data' in result.data:
                            data_points = result.data['data']
                            if isinstance(data_points, list) and data_points:
                                print(f"      Data Points: {data_points[0]}")
                        
                        # Show metadata
                        if 'metadata' in result.data:
                            metadata = result.data['metadata']
                            print(f"      Source: {metadata.get('source', 'unknown')}")
                            print(f"      Data Confidence: {metadata.get('confidence', 'unknown')}")
                    else:
                        print(f"      Raw Data: {str(result.data)[:100]}...")
                
                elif result.error_message:
                    print(f"   ❌ Error: {result.error_message}")
            
            # Show how intelligence data enhanced the narrative
            successful_results = [r for r in intelligence_results if r.success]
            if successful_results:
                print(f"\n📈 INTELLIGENCE DATA IMPACT:")
                print(f"   • Successful queries: {len(successful_results)}/{len(intelligence_results)}")
                print(f"   • Enhanced confidence: {recommendation.confidence_score:.3f}")
                
                # Show if storylines were enhanced
                original_count = len(research_output["analysis"]["storylines"])
                final_count = len(recommendation.prioritized_content)
                if final_count > original_count:
                    print(f"   • Enhanced storylines: {original_count} → {final_count} (+{final_count - original_count})")
                
        else:
            print(f"\n⚠️ No intelligence results found in recommendation")
        
    finally:
        await planner.close()

def print_final_summary():
    """Print final summary of the demonstration."""
    print_section_header("Demonstration Summary", "🎯")
    
    print("This demonstration showcased the complete Narrative Planner workflow:")
    print()
    print("🔄 CORE WORKFLOW:")
    print("   1. Input: Research output with storylines")
    print("   2. Analysis: LLM-powered content and entity analysis")
    print("   3. Planning: Narrative angle selection and writing guidance")
    print("   4. Intelligence: Sports data queries and enhancement")
    print("   5. Structure: Story arc and content prioritization")
    print("   6. Output: Complete narrative recommendation")
    print()
    print("🎯 KEY FEATURES DEMONSTRATED:")
    print("   ✅ Multiple narrative angles (Drama, Tactical, Performance)")
    print("   ✅ LLM-based entity extraction")
    print("   ✅ Sports Intelligence Layer integration")
    print("   ✅ Mock and real intelligence query execution")
    print("   ✅ Adaptive writing guidance for different audiences")
    print("   ✅ Prioritized content with emotional weighting")
    print("   ✅ Structured story arc generation")
    print("   ✅ Configurable planner modes")
    print()
    print("🚀 READY FOR INTEGRATION:")
    print("   • Writer Agent can use narrative recommendations")
    print("   • Intelligence data enhances factual accuracy")
    print("   • Flexible configuration for different use cases")
    print("   • Comprehensive error handling and fallbacks")

async def main():
    """Main demonstration function."""
    print("🎬 NARRATIVE PLANNER WORKFLOW DEMONSTRATION")
    print("=" * 80)
    print(f"Started at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 80)
    
    try:
        # Run different demonstrations
        await demonstrate_real_world_workflow()
        await demonstrate_different_configurations()
        await demonstrate_intelligence_results_detail()
        
        # Final summary
        print_final_summary()
        
        print(f"\n✅ Demonstration completed successfully at {datetime.now().strftime('%H:%M:%S')}")
        
    except Exception as e:
        print(f"\n❌ Demonstration failed: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    # Run the demonstration
    asyncio.run(main())
