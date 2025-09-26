# Updated Pipeline with Iterative Narrative Research System

## Overview

The SportsScribe pipeline has been significantly enhanced with an iterative narrative research system that intelligently selects and refines narrative angles through data-driven iteration. The system now follows this advanced workflow:

```text
DataCollector → IterativeNarrativeResearcher → WriterAgent → Editor → Final Article
                       ↓
    [NarrativePlanner ↔ SportsIntelligenceLayer ↔ QuestionTemplates]
                       ↓
               (Iterate max 3 times)
                       ↓
            FinalNarrativePlan + EnhancedData
```

## Updated Pipeline Flow

### 1. Data Collection
- **DataCollector**: Gathers raw game data from sports APIs
- Provides compact game data format (match_info, events, players, statistics, lineups)

### 2. Iterative Narrative Research
- **IterativeNarrativeResearcher**: Orchestrates the intelligent narrative planning process
- **Workflow**:
  1. **Initial Analysis**: Gets rough narrative angles from NarrativePlanner
  2. **Question Generation**: Uses QuestionTemplates to create targeted queries
  3. **Intelligence Gathering**: Queries SportsIntelligenceLayer for additional insights
  4. **Narrative Refinement**: Planner adjusts narrative based on responses
  5. **Iteration Decision**: Determines if more data needed (max 3 iterations)
  6. **Final Plan**: Returns comprehensive narrative plan with storylines

### 3. Enhanced Article Generation
- **WriterAgent**: Generates articles using enriched data and refined narrative plan
- **Input**: Original game data + intelligence insights + final narrative plan
- **Output**: Structured article with compelling narrative angles

### 4. Editorial Review
- **Editor**: Reviews and refines the article for quality and accuracy

## Key Components

### IterativeNarrativeResearcher
- **Purpose**: Intelligently refines narrative angles through iterative data gathering
- **Input**: CompactGameData, target_audience, content_style
- **Process**:
  - Planner → Questions → Intelligence → Refinement (repeat up to 3x)
- **Output**: FinalNarrativePlan with confidence scoring and enhanced data

### NarrativeAnglePlanner
- **Purpose**: Selects optimal narrative angles from 10 predefined options
- **Angles**: hero_journey, david_vs_goliath, tactical_chess, momentum_shift, redemption_arc, derby_drama, milestone_moment, defensive_masterclass, attacking_spectacle, controversy_central
- **Output**: Primary and secondary angles with storytelling guidance

### NarrativeQuestionTemplateSystem
- **Purpose**: Provides structured question templates for each narrative angle
- **Categories**: Core, Context, Detail, Verification questions
- **Functionality**: Converts interview-style questions to data queries

### SportsIntelligenceLayer Integration
- **Purpose**: Provides additional data insights through natural language queries
- **Input**: Natural language questions about match data
- **Output**: Structured responses with statistics and analysis
- **Fallback**: Mock responses for testing when layer unavailable

## Enhanced Pipeline Output

The pipeline now returns comprehensive narrative metadata:

```json
{
    "success": true,
    "game_id": "1208021",
    "article_type": "game_recap",
    "content": "Final edited article content",
    "narrative_metadata": {
        "primary_angle": "hero_journey",
        "secondary_angles": ["momentum_shift", "tactical_chess"],
        "total_iterations": 2,
        "final_confidence": 0.85,
        "data_quality_score": 0.90,
        "storylines": [
            "Manchester United defeated Liverpool 2-1 in dramatic fashion",
            "Alejandro Garnacho emerged as the match winner with a last-minute goal",
            "Tactical adjustments in the second half proved decisive"
        ],
        "interview_questions": [
            {
                "question": "What was going through your mind during your standout moment?",
                "purpose": "Capture emotional peak of heroic performance",
                "target_respondent": "player",
                "priority": 1
            }
        ],
        "reasoning": "Completed 2 iterations with 90.0% data quality. Narrative angles refined through intelligence gathering.",
        "intelligence_insights": [
            {
                "question": "How many goals did Manchester United score",
                "data": [{"goals": 2, "scorers": ["Rashford", "Garnacho"]}],
                "summary": "Manchester United scored 2 goals with different scorers"
            }
        ]
    },
    "processing_metadata": {
        "iterations_completed": 2,
        "questions_asked": 6,
        "successful_queries": 5,
        "processing_time_seconds": 4.2,
        "narrative_angles_identified": 3
    }
}
```

## Usage

### Running the Enhanced Pipeline

```python
from scriber_agents.iterative_narrative_researcher import IterativeNarrativeResearcher

# Initialize iterative researcher
config = {
    "narrative_model": "gpt-4o",
    "max_iterations": 3,
    "confidence_threshold": 0.8,
    "max_questions_per_iteration": 5
}

async with IterativeNarrativeResearcher(config) as researcher:
    # Process game data iteratively
    final_plan = await researcher.process_iterative_research(
        game_data,
        target_audience="general_fans",
        content_style="dramatic"
    )

    # Access results
    primary_angle = final_plan.primary_angle
    storylines = final_plan.storylines
    confidence = final_plan.confidence
    interview_questions = final_plan.interview_questions
```

### Testing the System

Run comprehensive tests:

```bash
cd sports-scribe
python test_iterative_researcher_fixed.py
python simple_narrative_test.py
```

## System Features

### 1. Intelligent Iteration
- **Confidence Assessment**: Automatically evaluates narrative confidence
- **Data Quality Scoring**: Measures usefulness of intelligence responses
- **Adaptive Stopping**: Stops when confidence threshold reached or max iterations
- **Quality Metrics**: Tracks success rates and processing times

### 2. Dynamic Question Generation
- **Template Conversion**: Transforms interview questions to data queries
- **Context Substitution**: Fills in team names, player names automatically
- **Fallback Questions**: Generates basic queries when templates insufficient
- **Priority Ranking**: Orders questions by importance and relevance

### 3. Comprehensive Data Integration
- **Original Data**: Match info, events, players, statistics
- **Intelligence Insights**: Additional analysis from query responses
- **Narrative Context**: Storylines and angle-specific guidance
- **Interview Preparation**: Ready-to-use questions for journalists

### 4. Robust Error Handling
- **Mock Mode**: Functions without real API connections
- **Graceful Degradation**: Falls back when components fail
- **Timeout Protection**: Prevents hanging on slow responses
- **Comprehensive Logging**: Tracks all processing steps

## Benefits

1. **Data-Driven Narratives**: Angles selected based on actual match data analysis
2. **Iterative Refinement**: Continuously improves narrative selection through feedback
3. **Intelligence Integration**: Leverages additional data sources for richer storytelling
4. **Journalist Support**: Provides ready-to-use interview questions and storylines
5. **Quality Assurance**: Confidence scoring ensures reliable narrative selection
6. **Flexible Configuration**: Adjustable iteration limits and confidence thresholds

## Configuration Options

```python
config = {
    # Core models
    "narrative_model": "gpt-4o",                    # LLM for narrative planning
    "narrative_temperature": 0.7,                  # Creativity level
    "narrative_max_tokens": 1500,                  # Response length

    # Iteration control
    "max_iterations": 3,                           # Maximum refinement cycles
    "confidence_threshold": 0.8,                   # Stop when reached
    "min_questions_per_iteration": 2,              # Minimum queries per cycle
    "max_questions_per_iteration": 5,              # Maximum queries per cycle
}
```

## File Structure

```
scriber_agents/
├── iterative_narrative_researcher.py     # Main iterative system (480 lines)
├── narrative_angle_planner.py            # Angle selection logic (600+ lines)
├── narrative_question_templates.py       # Question template system (240+ lines)
├── narrative_enhanced_researcher.py      # Enhanced research integration (167 lines)
├── researcher.py                         # Original research agent
├── writer.py                            # Article generation
├── editor.py                           # Editorial review
└── pipeline.py                         # Main pipeline orchestration
```

## Testing Results

✅ **System Verification Complete**
- Basic initialization: Working
- Question generation: 3 questions for 3 angles
- Mock intelligence responses: 100% success rate
- Iteration assessment: Confidence scoring functional
- Data quality assessment: Multi-level quality detection
- Complete workflow: 1-2 iterations, 80%+ confidence
- Storyline generation: 5 storylines with intelligence insights

## Integration with Sports Intelligence Layer

The system seamlessly integrates with the existing SoccerIntelligenceLayer:

```python
# Real integration (when available)
async with SoccerIntelligenceLayer() as intelligence:
    result = await intelligence.process_query("How many goals did Manchester United score?")

# Mock integration (for testing)
mock_response = {
    "status": "success",
    "result": {"data": [{"goals": 2}], "summary": "Analysis result"}
}
```

## Future Enhancements

1. **Real-time Intelligence**: Connect to live sports data APIs
2. **Multi-language Support**: Generate narratives in different languages
3. **Audience Personalization**: Tailor iterations for specific demographics
4. **Performance Analytics**: Track narrative effectiveness over time
5. **Advanced Templates**: Expand question templates for specialized angles
6. **Cross-match Analysis**: Compare narratives across multiple games

## Error Handling & Monitoring

- **Timeout Protection**: 30-second timeout with retry logic
- **Fallback Mechanisms**: Mock responses when intelligence unavailable
- **Quality Tracking**: Success rates and confidence monitoring
- **Comprehensive Logging**: Full audit trail of decision process
- **Resource Management**: Automatic cleanup of connections and resources

The enhanced pipeline now provides intelligent, data-driven narrative selection with iterative refinement, delivering high-quality sports journalism with compelling storytelling angles backed by comprehensive data analysis.