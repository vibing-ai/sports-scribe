"""
Tests for Tools and Utilities

This module contains test cases for all tools and utilities in the system.
"""

import pytest
from unittest.mock import Mock, AsyncMock, patch, MagicMock
from typing import Dict, Any
import aiohttp

from tools.sports_apis import ESPNAPIClient, SportsDBClient
from tools.web_search import WebSearchTool, ContentExtractor
from tools.data_validation import DataValidator, DataCleaner


class TestESPNAPIClient:
    """Test cases for ESPNAPIClient."""
    
    @pytest.fixture
    def espn_client(self):
        """Fixture for ESPNAPIClient instance."""
        return ESPNAPIClient()
    
    @pytest.mark.asyncio
    async def test_get_games(self, espn_client):
        """Test getting games from ESPN API."""
        sport = "football"
        league = "nfl"
        date = "2024-01-15"
        
        result = await espn_client.get_games(sport, league, date)
        
        # TODO: Add actual assertions when implementation is complete
        assert isinstance(result, list)
    
    @pytest.mark.asyncio
    async def test_get_team_stats(self, espn_client):
        """Test getting team statistics."""
        sport = "football"
        league = "nfl"
        team_id = "test_team"
        
        result = await espn_client.get_team_stats(sport, league, team_id)
        
        # TODO: Add actual assertions when implementation is complete
        assert isinstance(result, dict)


class TestSportsDBClient:
    """Test cases for SportsDBClient."""
    
    @pytest.fixture
    def sportsdb_client(self):
        """Fixture for SportsDBClient instance."""
        return SportsDBClient(api_key="test_key")
    
    @pytest.mark.asyncio
    async def test_get_league_teams(self, sportsdb_client):
        """Test getting teams from a league."""
        league_name = "NFL"
        
        result = await sportsdb_client.get_league_teams(league_name)
        
        # TODO: Add actual assertions when implementation is complete
        assert isinstance(result, list)
    
    @pytest.mark.asyncio
    async def test_get_player_details(self, sportsdb_client):
        """Test getting player details."""
        player_id = "test_player"
        
        result = await sportsdb_client.get_player_details(player_id)
        
        # TODO: Add actual assertions when implementation is complete
        assert isinstance(result, dict)


class TestWebSearchTool:
    """Test cases for WebSearchTool."""
    
    @pytest.fixture
    def web_search_tool(self):
        """Fixture for WebSearchTool instance."""
        return WebSearchTool()
    
    @pytest.mark.asyncio
    async def test_search_news(self, web_search_tool):
        """Test news search functionality."""
        query = "NFL playoffs"
        limit = 5
        
        result = await web_search_tool.search_news(query, limit)
        
        # TODO: Add actual assertions when implementation is complete
        assert isinstance(result, list)
        assert len(result) <= limit
    
    @pytest.mark.asyncio
    async def test_scrape_article(self, web_search_tool):
        """Test article scraping."""
        url = "https://example.com/sports-article"
        
        result = await web_search_tool.scrape_article(url)
        
        # TODO: Add actual assertions when implementation is complete
        assert isinstance(result, dict)
    
    @pytest.mark.asyncio
    async def test_get_team_social_media(self, web_search_tool):
        """Test social media data gathering."""
        team_name = "Dallas Cowboys"
        
        result = await web_search_tool.get_team_social_media(team_name)
        
        # TODO: Add actual assertions when implementation is complete
        assert isinstance(result, dict)


class TestContentExtractor:
    """Test cases for ContentExtractor."""
    
    def test_extract_article_text(self):
        """Test HTML text extraction."""
        html = """
        <html>
            <head><title>Test Article</title></head>
            <body>
                <script>console.log('script');</script>
                <style>body { color: red; }</style>
                <h1>Sports News</h1>
                <p>This is a test article about sports.</p>
                <div>More content here.</div>
            </body>
        </html>
        """
        
        result = ContentExtractor.extract_article_text(html)
        
        assert isinstance(result, str)
        assert "Sports News" in result
        assert "This is a test article about sports." in result
        assert "script" not in result  # Scripts should be removed
        assert "color: red" not in result  # Styles should be removed
    
    def test_extract_metadata(self):
        """Test metadata extraction from HTML."""
        html = """
        <html>
            <head>
                <title>Test Sports Article</title>
                <meta name="description" content="A test article about sports">
                <meta name="author" content="John Doe">
            </head>
            <body>Content</body>
        </html>
        """
        
        result = ContentExtractor.extract_metadata(html)
        
        assert isinstance(result, dict)
        assert result.get("title") == "Test Sports Article"
        assert result.get("description") == "A test article about sports"


class TestDataValidator:
    """Test cases for DataValidator."""
    
    def test_validate_game_data_valid(self):
        """Test validation of valid game data."""
        game_data = {
            "game_id": "game_123",
            "home_team": "Team A",
            "away_team": "Team B",
            "date": "2024-01-15"
        }
        
        result = DataValidator.validate_game_data(game_data)
        assert result is True
    
    def test_validate_game_data_invalid(self):
        """Test validation of invalid game data."""
        game_data = {
            "game_id": "game_123",
            "home_team": "Team A",
            # Missing away_team and date
        }
        
        result = DataValidator.validate_game_data(game_data)
        assert result is False
    
    def test_validate_team_data_valid(self):
        """Test validation of valid team data."""
        team_data = {
            "team_id": "team_123",
            "name": "Test Team",
            "league": "NFL"
        }
        
        result = DataValidator.validate_team_data(team_data)
        assert result is True
    
    def test_validate_player_data_valid(self):
        """Test validation of valid player data."""
        player_data = {
            "player_id": "player_123",
            "name": "John Doe",
            "team_id": "team_123"
        }
        
        result = DataValidator.validate_player_data(player_data)
        assert result is True


class TestDataCleaner:
    """Test cases for DataCleaner."""
    
    def test_clean_team_name(self):
        """Test team name cleaning."""
        # Test normal case
        result = DataCleaner.clean_team_name("  new york giants  ")
        assert result == "New York Giants"
        
        # Test empty string
        result = DataCleaner.clean_team_name("")
        assert result == ""
        
        # Test None
        result = DataCleaner.clean_team_name(None)
        assert result == ""
    
    def test_clean_player_name(self):
        """Test player name cleaning."""
        # Test normal case
        result = DataCleaner.clean_player_name("  john   doe  ")
        assert result == "John Doe"
        
        # Test empty string
        result = DataCleaner.clean_player_name("")
        assert result == ""
    
    def test_normalize_date(self):
        """Test date normalization."""
        from datetime import datetime
        
        # Test string date
        result = DataCleaner.normalize_date("2024-01-15")
        assert isinstance(result, datetime)
        assert result.year == 2024
        assert result.month == 1
        assert result.day == 15
        
        # Test datetime object
        dt = datetime(2024, 1, 15)
        result = DataCleaner.normalize_date(dt)
        assert result == dt
        
        # Test invalid date
        result = DataCleaner.normalize_date("invalid-date")
        assert result is None
    
    def test_clean_numeric_stats(self):
        """Test numeric statistics cleaning."""
        stats = {
            "points": "24",
            "percentage": "65.5%",
            "yards": 350,
            "invalid": "abc",
            "empty": ""
        }
        
        result = DataCleaner.clean_numeric_stats(stats)
        
        assert result["points"] == 24.0
        assert result["percentage"] == 65.5
        assert result["yards"] == 350.0
        assert result["invalid"] == 0.0
        assert result["empty"] == 0.0 