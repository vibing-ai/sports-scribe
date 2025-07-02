"""Agent Configuration

Configuration settings for AI agents focused on football (soccer) journalism.
"""

# Agent configurations for football journalism
AGENT_CONFIGS = {
    "data_collector": {
        "name": "Football Data Collector",
        "description": "Collects football match data, standings, and statistics from API-Football",
        "model": "gpt-4.1-nano",
        "temperature": 0.1,
        "max_tokens": 1000,
        "system_prompt": "You are a football data collector agent. Gather accurate match data, team statistics, and player information from API-Football for article generation.",
    },
    "researcher": {
        "name": "Football Researcher",
        "description": "Researches football context, historical data, and background information",
        "model": "gpt-4.1-nano",
        "temperature": 0.3,
        "max_tokens": 2000,
        "system_prompt": "You are a football research agent. Provide historical context, team backgrounds, player histories, and tactical analysis for football articles.",
    },
    "writer": {
        "name": "Football Writer",
        "description": "Generates engaging football articles and match reports",
        "model": "gpt-4.1-nano",
        "temperature": 0.7,
        "max_tokens": 3000,
        "system_prompt": "You are a professional football journalist. Write engaging, accurate, and well-structured football articles with compelling narratives.",
    },
    "editor": {
        "name": "Football Editor",
        "description": "Reviews and refines football articles for quality and accuracy",
        "model": "gpt-4.1-nano",
        "temperature": 0.2,
        "max_tokens": 2000,
        "system_prompt": "You are a football article editor. Review articles for accuracy, clarity, grammar, and journalistic quality. Ensure facts are correct and style is consistent.",
    },
}


# Default workflow configuration
WORKFLOW_CONFIG = {
    "max_retries": 3,
    "timeout_seconds": 300,
    "enable_logging": True,
    "parallel_processing": False,
}


# Football-specific settings
FOOTBALL_SETTINGS = {
    "default_leagues": [
        "premier_league",
        "la_liga",
        "serie_a",
        "bundesliga",
        "ligue_1",
    ],
    "default_season": 2024,
    "article_min_length": 500,
    "article_max_length": 2000,
    "include_statistics": True,
    "include_historical_context": True,
}
