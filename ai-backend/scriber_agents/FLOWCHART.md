# SportsScribe Pipeline Flowchart

## Complete Pipeline Flow

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Data Collector│    │    Researcher   │    │     Writer      │    │     Editor      │
│                 │    │                 │    │                 │    │                 │
│ collect_game_data│───▶│research_team_hist│───▶│generate_game_recap│───▶│  review_article  │
│ collect_team_data│    │research_season_  │    │generate_preview  │    │   fact_check    │
│ collect_player_  │    │research_player_  │    │generate_spotlight│    │   style_check   │
└─────────────────┘    └─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │                       │
         ▼                       ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Raw Game Data │    │  Context &      │    │  Raw Article    │    │  Final Article  │
│   - Scores      │    │  Analysis       │    │  Content        │    │  + Feedback     │
│   - Stats       │    │  - History      │    │  - Game Recap   │    │  - Fact-checked │
│   - Events      │    │  - Trends       │    │  - Preview      │    │  - Styled       │
│   - Teams       │    │  - Performance  │    │  - Spotlight    │    │  - Ready for    │
│   - Players     │    │  - Predictions  │    │                 │    │    Publication  │
└─────────────────┘    └─────────────────┘    └─────────────────┘    └─────────────────┘
```

## Function Call Sequence

### Game Recap Generation
```
ArticlePipeline.generate_game_recap(game_id)
├── collector.collect_game_data(game_id)
├── collector.collect_team_data(home_team)
├── collector.collect_team_data(away_team)
├── researcher.research_team_history(home_team, away_team)
├── researcher.research_season_trends(league, season)
├── writer.generate_game_recap(game_data, research_data)
└── editor.review_article(raw_article, metadata)
    ├── editor.fact_check(article, source_data)
    └── editor.style_check(article)
```

### Preview Article Generation
```
ArticlePipeline.generate_preview_article(game_id)
├── collector.collect_game_data(game_id)
├── researcher.research_team_history(home_team, away_team)
├── researcher.research_season_trends(league, season)
├── writer.generate_preview_article(game_data, predictions)
└── editor.review_article(raw_article, metadata)
```

### Player Spotlight Generation
```
ArticlePipeline.generate_player_spotlight(player_id, game_id)
├── collector.collect_player_data(player_id)
├── researcher.research_player_performance(player_id, context)
├── writer.generate_player_spotlight(player_data, performance_data)
└── editor.review_article(raw_article, metadata)
```

## Data Transformation

### Input → Output Mapping

1. **Data Collector**
   - Input: `game_id`, `team_id`, `player_id`
   - Output: Structured JSON with game/team/player data

2. **Researcher**
   - Input: Raw data from collector
   - Output: Contextual analysis and historical trends

3. **Writer**
   - Input: Combined raw data + research data
   - Output: Natural language article content

4. **Editor**
   - Input: Raw article content + metadata
   - Output: Polished article + quality feedback

## Error Handling Points

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Collector │    │  Researcher │    │    Writer   │    │    Editor   │
│             │    │             │    │             │    │             │
│ API failures│    │ Data missing│    │ AI failures │    │ Style issues│
│ No data     │    │ Invalid IDs │    │ Token limit │    │ Fact errors │
│ Timeouts    │    │ Rate limits │    │ Model errors│    │ Quality low │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
```

## Configuration Dependencies

```
┌─────────────────┐
│   Pipeline Config│
│                 │
│ - OpenAI API Key│
│ - RapidAPI Key  │
│ - Supabase Creds│
│ - Model Params  │
│ - Style Guides  │
└─────────────────┘
         │
         ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Data Collector│    │    Researcher   │    │     Writer      │    │     Editor      │
│   Config        │    │   Config        │    │   Config        │    │   Config        │
└─────────────────┘    └─────────────────┘    └─────────────────┘    └─────────────────┘
``` 