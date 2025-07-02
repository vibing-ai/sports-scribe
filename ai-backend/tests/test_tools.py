"""
Tests for Tools and Utilities

This module contains test cases for all tools and utilities in the system.
Focus: Football (Soccer) only using API-Football from RapidAPI.
"""

import pytest

from tools.data_validation import DataCleaner, DataValidator
from tools.sports_apis import FOOTBALL_LEAGUES, APIFootballClient
from tools.web_search import ContentExtractor, WebSearchTool


class TestAPIFootballClient:
    """Test cases for APIFootballClient (RapidAPI)."""

    @pytest.fixture
    def api_football_client(self):
        """Fixture for APIFootballClient instance."""
        return APIFootballClient(api_key="test_rapidapi_key")

    @pytest.mark.asyncio
    async def test_get_fixtures(self, api_football_client):
        """Test collecting match data from API-Football."""
        league_id = FOOTBALL_LEAGUES["premier_league"]  # 39
        season = 2024
        date = "2024-01-15"

        result = await api_football_client.get_fixtures(league_id, season, date)

        # TODO: Add actual assertions when implementation is complete
        assert isinstance(result, list)

    @pytest.mark.asyncio
    async def test_get_teams(self, api_football_client):
        """Test getting teams from API-Football."""
        league_id = FOOTBALL_LEAGUES["premier_league"]
        season = 2024

        result = await api_football_client.get_teams(league_id, season)

        # TODO: Add actual assertions when implementation is complete
        assert isinstance(result, list)

    @pytest.mark.asyncio
    async def test_get_league_standings(self, api_football_client):
        """Test getting league standings from API-Football."""
        league_id = FOOTBALL_LEAGUES["premier_league"]
        season = 2024

        result = await api_football_client.get_league_standings(league_id, season)

        # TODO: Add actual assertions when implementation is complete
        assert isinstance(result, dict)

    @pytest.mark.asyncio
    async def test_get_match_statistics(self, api_football_client):
        """Test getting match statistics from API-Football."""
        fixture_id = 12345

        result = await api_football_client.get_match_statistics(fixture_id)

        # TODO: Add actual assertions when implementation is complete
        assert isinstance(result, dict)

    @pytest.mark.asyncio
    async def test_get_players(self, api_football_client):
        """Test getting players from API-Football."""
        team_id = 50  # Manchester City
        season = 2024

        result = await api_football_client.get_players(team_id, season)

        # TODO: Add actual assertions when implementation is complete
        assert isinstance(result, list)

    def test_football_leagues_constants(self):
        """Test that football league constants are properly defined."""
        assert "premier_league" in FOOTBALL_LEAGUES
        assert "la_liga" in FOOTBALL_LEAGUES
        assert "champions_league" in FOOTBALL_LEAGUES
        assert FOOTBALL_LEAGUES["premier_league"] == 39
        assert FOOTBALL_LEAGUES["champions_league"] == 2


class TestWebSearchTool:
    """Test cases for WebSearchTool."""

    @pytest.fixture
    def web_search_tool(self):
        """Fixture for WebSearchTool instance."""
        return WebSearchTool()

    @pytest.mark.asyncio
    async def test_search_football_news(self, web_search_tool):
        """Test football news search functionality."""
        query = "Premier League"
        limit = 5

        result = await web_search_tool.search_news(query, limit)

        # TODO: Add actual assertions when implementation is complete
        assert isinstance(result, list)
        assert len(result) <= limit

    @pytest.mark.asyncio
    async def test_scrape_football_article(self, web_search_tool):
        """Test football article scraping."""
        url = "https://example.com/football-article"

        result = await web_search_tool.scrape_article(url)

        # TODO: Add actual assertions when implementation is complete
        assert isinstance(result, dict)

    @pytest.mark.asyncio
    async def test_get_team_social_media(self, web_search_tool):
        """Test social media data gathering for football teams."""
        team_name = "Manchester United"

        result = await web_search_tool.get_team_social_media(team_name)

        # TODO: Add actual assertions when implementation is complete
        assert isinstance(result, dict)


class TestContentExtractor:
    """Test cases for ContentExtractor."""

    def test_extract_football_article_text(self):
        """Test HTML text extraction for football content."""
        html = """
        <html>
            <head><title>Premier League News</title></head>
            <body>
                <script>console.log('script');</script>
                <style>body { color: red; }</style>
                <h1>Manchester City vs Liverpool</h1>
                <p>An exciting match between two Premier League giants.</p>
                <div>Match statistics and player ratings.</div>
            </body>
        </html>
        """

        result = ContentExtractor.extract_article_text(html)

        assert isinstance(result, str)
        assert "Manchester City vs Liverpool" in result
        assert "Premier League giants" in result
        assert "script" not in result  # Scripts should be removed
        assert "color: red" not in result  # Styles should be removed

    def test_extract_football_metadata(self):
        """Test metadata extraction from football articles."""
        html = """
        <html>
            <head>
                <title>Premier League Match Report</title>
                <meta name="description" content="A comprehensive match report">
                <meta name="author" content="Football Journalist">
            </head>
            <body>Content</body>
        </html>
        """

        result = ContentExtractor.extract_metadata(html)

        assert isinstance(result, dict)
        assert result.get("title") == "Premier League Match Report"
        assert result.get("description") == "A comprehensive match report"


class TestDataValidator:
    """Test cases for DataValidator."""

    def test_validate_football_match_data_valid(self):
        """Test validation of valid football match data."""
        match_data = {
            "fixture_id": "fixture_123",
            "home_team": "Manchester City",
            "away_team": "Liverpool",
            "date": "2024-01-15",
            "league_id": 39,
        }

        result = DataValidator.validate_game_data(match_data)
        assert result is True

    def test_validate_football_match_data_invalid(self):
        """Test validation of invalid football match data."""
        match_data = {
            "fixture_id": "fixture_123",
            "home_team": "Manchester City",
            # Missing away_team, date, and league_id
        }

        result = DataValidator.validate_game_data(match_data)
        assert result is False

    def test_validate_football_team_data_valid(self):
        """Test validation of valid football team data."""
        team_data = {
            "team_id": "team_123",
            "name": "Arsenal",
            "league": "Premier League",
        }

        result = DataValidator.validate_team_data(team_data)
        assert result is True

    def test_validate_football_player_data_valid(self):
        """Test validation of valid football player data."""
        player_data = {
            "player_id": "player_123",
            "name": "Erling Haaland",
            "position": "Forward",
            "team": "Manchester City",
        }

        result = DataValidator.validate_player_data(player_data)
        assert result is True


class TestDataCleaner:
    """Test cases for DataCleaner."""

    def test_clean_football_team_name(self):
        """Test cleaning football team names."""
        test_cases = [
            ("Manchester City FC", "Manchester City"),
            ("  Liverpool F.C.  ", "Liverpool"),
            ("Real Madrid CF", "Real Madrid"),
        ]

        for input_name, expected in test_cases:
            result = DataCleaner.clean_team_name(input_name)
            assert result == expected

    def test_clean_football_player_name(self):
        """Test cleaning football player names."""
        test_cases = [
            ("  Cristiano Ronaldo  ", "Cristiano Ronaldo"),
            ("Lionel Messi Jr.", "Lionel Messi Jr"),
            ("KYLIAN MBAPPÉ", "Kylian Mbappé"),
        ]

        for input_name, expected in test_cases:
            result = DataCleaner.clean_player_name(input_name)
            assert result == expected

    def test_normalize_match_date(self):
        """Test date normalization for football matches."""
        test_cases = [
            ("2024-01-15", "2024-01-15"),
            ("15/01/2024", "2024-01-15"),
            ("Jan 15, 2024", "2024-01-15"),
        ]

        for input_date, expected in test_cases:
            result = DataCleaner.normalize_date(input_date)
            assert result == expected

    def test_clean_football_stats(self):
        """Test cleaning football match statistics."""
        stats = {
            "goals": "2",
            "possession": "65%",
            "shots_on_target": "  5  ",
            "invalid_stat": None,
        }

        result = DataCleaner.clean_numeric_stats(stats)

        assert result["goals"] == 2
        assert result["possession"] == 65
        assert result["shots_on_target"] == 5
        assert "invalid_stat" not in result
