"""Helper Utilities.

Common helper functions for football data processing and article generation.
"""

import re
from typing import Any


def format_team_name(team_name: str) -> str:
    """Standardize team name formatting.

    Args:
        team_name: Raw team name

    Returns:
        Formatted team name
    """
    # TODO: Implement team name standardization
    return team_name.strip()


def format_match_score(home_score: int, away_score: int) -> str:
    """Format match score for display.

    Args:
        home_score: Home team score
        away_score: Away team score

    Returns:
        Formatted score string (e.g., "2-1")
    """
    return f"{home_score}-{away_score}"


def calculate_match_duration(start_time: str, end_time: str | None = None) -> str:
    """Calculate match duration or time elapsed.

    Args:
        start_time: Match start time
        end_time: Match end time (optional)

    Returns:
        Duration string
    """
    # TODO: Implement match duration calculation
    return "90 min"


def extract_key_statistics(match_data: dict[str, Any]) -> dict[str, Any]:
    """Extract key statistics from match data.

    Args:
        match_data: Raw match data from API

    Returns:
        Dictionary of key statistics
    """
    # TODO: Implement statistics extraction
    return {"possession": {}, "shots": {}, "passes": {}, "fouls": {}}


def generate_article_slug(title: str) -> str:
    """Generate URL-friendly slug from article title.

    Args:
        title: Article title

    Returns:
        URL slug
    """
    slug = title.lower()
    slug = re.sub(r"[^a-z0-9\s-]", "", slug)
    slug = re.sub(r"\s+", "-", slug)
    slug = slug.strip("-")
    return slug


def get_league_display_name(league_key: str) -> str:
    """Get display name for league key.

    Args:
        league_key: League identifier key

    Returns:
        Human-readable league name
    """
    league_names = {
        "premier_league": "Premier League",
        "la_liga": "La Liga",
        "serie_a": "Serie A",
        "bundesliga": "Bundesliga",
        "ligue_1": "Ligue 1",
        "champions_league": "UEFA Champions League",
        "europa_league": "UEFA Europa League",
        "world_cup": "FIFA World Cup",
    }
    return league_names.get(league_key, league_key.replace("_", " ").title())


def is_recent_match(match_date: str, hours_threshold: int = 24) -> bool:
    """Check if a match is recent (within threshold).

    Args:
        match_date: Match date string
        hours_threshold: Hours threshold for "recent"

    Returns:
        True if match is recent
    """
    # TODO: Implement date comparison
    return True
