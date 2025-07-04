# SportsScribe Agent Pipeline Documentation

## Overview

The SportsScribe system uses a multi-agent pipeline to generate high-quality sports articles:

```
Data Collector → Researcher → Writer → Editor
```

Each agent has specific responsibilities and passes structured data to the next agent in the pipeline.

## Standardized API Response Structure

All API calls return a standardized structure:

```json
{
  "get": "endpoint_name",
  "parameters": {"param1": "value1"},
  "errors": [],
  "results": 1,
  "paging": {"current": 1, "total": 1},
  "response": [...]
}
```

## Agent Pipeline Flow

### 1. Data Collector Agent (`data_collector.py`)

**Purpose**: Gathers raw sports data from API-Football via RapidAPI

**Key Functions**:
- `collect_game_data(game_id: str) → Dict[str, Any]`
- `collect_team_data(team_id: str) → Dict[str, Any]`
- `collect_player_data(player_id: str) → Dict[str, Any]`
- `collect_league_data(league_id: str, season: str) → Dict[str, Any]`

**Output Data Structure**:
```python
{
    "get": "game_data",
    "parameters": {"game_id": "123"},
    "errors": [],
    "results": 1,
    "paging": {},
    "response": [
        {
            "fixture": {...},      # Fixture details
            "events": {...},       # Match events
            "lineups": {...},      # Team lineups
            "statistics": {...}    # Match statistics
        }
    ]
}
```

### 2. Research Agent (`researcher.py`)

**Purpose**: Analyzes data and generates storylines for articles

**Key Functions**:
- `research_team_history(team_id: str, opponent_id: str) → Dict[str, Any]`
- `research_player_performance(player_id: str, context: Dict[str, Any]) → Dict[str, Any]`
- `research_season_trends(league: str, season: str) → Dict[str, Any]`
- `analyze_game_data(game_data: Dict[str, Any]) → Dict[str, Any]`
- `generate_storylines(data_list: List[Dict[str, Any]]) → List[str]`

**Input**: Standardized API responses from Data Collector
**Output**: Storylines list and contextual analysis

**Storylines Example**:
```python
[
    "Manchester United secures victory over Liverpool",
    "High-scoring thriller with 5+ goals",
    "Dramatic finish with late goal",
    "Outstanding individual performances"
]
```

### 3. Writer Agent (`writer.py`)

**Purpose**: Generates engaging articles using AI and storylines

**Key Functions**:
- `generate_game_recap(game_data: Dict[str, Any], research_data: Dict[str, Any]) → str`
- `generate_player_spotlight(player_data: Dict[str, Any], performance_data: Dict[str, Any]) → str`
- `generate_preview_article(matchup_data: Dict[str, Any], predictions: Dict[str, Any]) → str`

**Input**: Raw data + Research data + Storylines list
**Output**: Raw article content (string)

### 4. Editor Agent (`editor.py`)

**Purpose**: Reviews and refines article quality

**Key Functions**:
- `review_article(article_content: str, metadata: Dict[str, Any]) → tuple[str, Dict[str, Any]]`
- `fact_check(article_content: str, source_data: Dict[str, Any]) → Dict[str, Any]`
- `style_check(article_content: str) → Dict[str, Any]`

**Input**: Raw article from Writer Agent
**Output**: Final polished article + review feedback

## Updated Pipeline Integration

### Main Pipeline Function

```python
async def generate_game_recap(game_id: str) -> Dict[str, Any]:
    """
    Main pipeline function that orchestrates all agents.
    
    Args:
        game_id: ID of the game to write about
    
    Returns:
        Final article with metadata
    """
    # 1. Collect raw data (standardized format)
    game_data = await collector.collect_game_data(game_id)
    # Returns: {"get": "game_data", "parameters": {...}, "response": [...]}
    
    # 2. Extract team IDs and collect team data
    fixture = game_data["response"][0]["fixture"]["response"][0]
    home_team_id = fixture["teams"]["home"]["id"]
    away_team_id = fixture["teams"]["away"]["id"]
    
    home_team_data = await collector.collect_team_data(str(home_team_id))
    away_team_data = await collector.collect_team_data(str(away_team_id))
    
    # 3. Research context
    team_history = await researcher.research_team_history(
        str(home_team_id), str(away_team_id)
    )
    season_trends = await researcher.research_season_trends(
        str(fixture["league"]["id"]), str(fixture["league"]["season"])
    )
    
    # 4. Generate storylines from all collected data
    data_list = [game_data, home_team_data, away_team_data]
    storylines = await researcher.generate_storylines(data_list)
    
    # 5. Generate article with storylines
    research_data = {
        "team_history": team_history,
        "season_trends": season_trends
    }
    raw_article = await writer.generate_game_recap(game_data, research_data)
    
    # 6. Edit and review
    metadata = {
        "game_id": game_id,
        "article_type": "recap",
        "storylines": storylines,
        "source_data": game_data
    }
    final_article, feedback = await editor.review_article(raw_article, metadata)
    
    return {
        "content": final_article,
        "metadata": {**metadata, "feedback": feedback}
    }
```

## Data Flow Summary

1. **Data Collector** → Standardized API responses (fixtures, teams, players)
2. **Researcher** → Storylines list + Contextual analysis
3. **Writer** → AI-generated article content using storylines
4. **Editor** → Polished content (fact-checked, styled)

## Function Call Dependencies

```
generate_game_recap()
├── collector.collect_game_data()
├── collector.collect_team_data() (home)
├── collector.collect_team_data() (away)
├── researcher.research_team_history()
├── researcher.research_season_trends()
├── researcher.generate_storylines()
├── writer.generate_game_recap()
└── editor.review_article()
    ├── editor.fact_check()
    └── editor.style_check()
```

## Storyline Generation Process

1. **Data Analysis**: Researcher analyzes raw API data
2. **Context Extraction**: Identifies key events, statistics, and trends
3. **Storyline Creation**: Generates compelling narrative hooks
4. **Prioritization**: Selects top 10 most relevant storylines
5. **Integration**: Passes storylines to Writer for article generation

## API Integration Details

### API-Football Endpoints Used:
- `/fixtures` - Game details and scores
- `/fixtures/events` - Match events (goals, cards, etc.)
- `/fixtures/lineups` - Team formations and players
- `/fixtures/statistics` - Match statistics
- `/teams` - Team information
- `/teams/statistics` - Team performance data
- `/players` - Player information and stats
- `/standings` - League standings
- `/players/topscorers` - Top scorers

### Error Handling:
- API failures return standardized error structure
- Missing data scenarios handled gracefully
- Fallback content generation when AI services unavailable

## Configuration Requirements

Each agent requires configuration for:
- RapidAPI key for API-Football access
- OpenAI API key for content generation
- Model parameters (temperature, max_tokens)
- Style guidelines and quality thresholds

## Next Steps

1. ✅ Implement API integration in Data Collector
2. ✅ Add storyline generation in Research Agent
3. ✅ Integrate OpenAI for content generation in Writer Agent
4. 🔄 Implement quality checks in Editor Agent
5. 🔄 Add comprehensive error handling and logging
6. 🔄 Create unit tests for each agent
7. 🔄 Add monitoring and metrics collection 