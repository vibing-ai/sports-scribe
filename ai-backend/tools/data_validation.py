"""
Data Validation Module

This module provides utilities for validating and cleaning sports data
to ensure consistency and accuracy across the system.
"""

import logging
import re
from datetime import datetime
from typing import Any

logger = logging.getLogger(__name__)


class DataValidator:
    """
    Utility class for validating sports data.
    """

    @staticmethod
    def validate_game_data(game_data: dict[str, Any]) -> bool:
        """
        Validate game data structure and content.

        Args:
            game_data: Dictionary containing game information

        Returns:
            True if data is valid, False otherwise
        """
        required_fields = ["fixture_id", "home_team", "away_team", "date"]

        # Check required fields
        for field in required_fields:
            if field not in game_data:
                logger.warning(f"Missing required field: {field}")
                return False

        # TODO: Add more specific validation logic
        return True

    @staticmethod
    def validate_team_data(team_data: dict[str, Any]) -> bool:
        """
        Validate team data structure and content.

        Args:
            team_data: Dictionary containing team information

        Returns:
            True if data is valid, False otherwise
        """
        required_fields = ["team_id", "name", "league"]

        for field in required_fields:
            if field not in team_data:
                logger.warning(f"Missing required field: {field}")
                return False

        # TODO: Add more specific validation logic
        return True

    @staticmethod
    def validate_player_data(player_data: dict[str, Any]) -> bool:
        """
        Validate player data structure and content.

        Args:
            player_data: Dictionary containing player information

        Returns:
            True if data is valid, False otherwise
        """
        required_fields = ["player_id", "name", "position", "team"]

        for field in required_fields:
            if field not in player_data:
                logger.warning(f"Missing required field: {field}")
                return False

        # TODO: Add more specific validation logic
        return True


class DataCleaner:
    """
    Utility class for cleaning and normalizing sports data.
    """

    @staticmethod
    def clean_team_name(team_name: str) -> str:
        """
        Normalize team name format.

        Args:
            team_name: Raw team name

        Returns:
            Cleaned team name
        """
        if not team_name:
            return ""

        # Remove extra whitespace and normalize case
        cleaned = re.sub(r"\s+", " ", team_name.strip())

        # Remove common football suffixes
        suffixes = [" FC", " F.C.", " CF", " C.F."]
        for suffix in suffixes:
            if cleaned.endswith(suffix):
                cleaned = cleaned[:-len(suffix)]
                break

        return cleaned

    @staticmethod
    def clean_player_name(player_name: str) -> str:
        """
        Normalize player name format.

        Args:
            player_name: Raw player name

        Returns:
            Cleaned player name
        """
        if not player_name:
            return ""

        # Remove extra whitespace and normalize case
        cleaned = re.sub(r"\s+", " ", player_name.strip())

        # Remove trailing periods from Jr., Sr., etc.
        if cleaned.endswith('.'):
            cleaned = cleaned[:-1]

        return cleaned.title()

    @staticmethod
    def normalize_date(date_value: str | datetime) -> str:
        """
        Normalize date values to string format.

        Args:
            date_value: Date as string or datetime object

        Returns:
            Normalized date string in YYYY-MM-DD format
        """
        if isinstance(date_value, datetime):
            return date_value.strftime("%Y-%m-%d")

        if isinstance(date_value, str):
            # Try common date formats
            formats = [
                "%Y-%m-%d",
                "%Y-%m-%d %H:%M:%S",
                "%m/%d/%Y",
                "%d/%m/%Y",
                "%b %d, %Y",
            ]

            for fmt in formats:
                try:
                    dt = datetime.strptime(date_value, fmt)
                    return dt.strftime("%Y-%m-%d")
                except ValueError:
                    continue

        logger.warning(f"Could not parse date: {date_value}")
        return date_value

    @staticmethod
    def clean_numeric_stats(stats: dict[str, Any]) -> dict[str, Any]:
        """
        Clean and validate numeric statistics.

        Args:
            stats: Dictionary containing numeric statistics

        Returns:
            Dictionary with cleaned numeric values, excluding invalid stats
        """
        cleaned_stats = {}

        for key, value in stats.items():
            # Skip None values
            if value is None:
                continue

            try:
                # Try to convert to float
                if isinstance(value, str):
                    # Remove non-numeric characters except decimal point
                    cleaned_value = re.sub(r"[^\d.-]", "", value)
                    if cleaned_value:
                        cleaned_stats[key] = float(cleaned_value)
                elif isinstance(value, int | float):
                    cleaned_stats[key] = float(value)
            except (ValueError, TypeError):
                logger.warning(f"Could not clean numeric value for {key}: {value}")
                # Skip invalid values instead of setting to 0.0

        return cleaned_stats
