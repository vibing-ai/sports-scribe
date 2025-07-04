"""
Pipeline Orchestrator.

This module coordinates the flow between different agents in the SportsScribe pipeline:
Data Collector → Researcher → Writer
"""

import logging
from datetime import datetime
from typing import Any, Dict, Optional

from .data_collector import DataCollectorAgent
from .researcher import ResearchAgent
from .writer import WritingAgent
from openai import AsyncOpenAI

logger = logging.getLogger(__name__)


class ArticlePipeline:
    """Orchestrates the complete article generation pipeline."""

    def __init__(self, config: Dict[str, Any]):
        """Initialize the pipeline with configuration for all agents."""
        self.config = config
        self.openai_client = AsyncOpenAI(api_key=config["openai_api_key"])
        self.collector = DataCollectorAgent(config, openai_client=self.openai_client)
        self.researcher = ResearchAgent(config, openai_client=self.openai_client)
        self.writer = WritingAgent(config, openai_client=self.openai_client)
        logger.info("Article Pipeline initialized")

    async def generate_game_recap(self, game_id: str) -> Dict[str, Any]:
        """Generate a complete game recap article."""
        try:
            logger.info("Starting game recap generation for game: %s", game_id)
            game_data = await self.collector.collect_game_data(game_id)
            if not game_data or game_data.get("errors"):
                raise ValueError(f"Failed to collect data for game {game_id}: {game_data.get('errors', [])}")
            fixture_response = game_data.get("response", [{}])[0].get("fixture", {}).get("response", [])
            home_team_id = None
            away_team_id = None
            fixture = None
            if fixture_response:
                fixture = fixture_response[0]
                home_team_id = fixture.get("teams", {}).get("home", {}).get("id")
                away_team_id = fixture.get("teams", {}).get("away", {}).get("id")
                home_team_data = await self.collector.collect_team_data(str(home_team_id)) if home_team_id else None
                away_team_data = await self.collector.collect_team_data(str(away_team_id)) if away_team_id else None
            else:
                home_team_data = None
                away_team_data = None
            research_data = {}
            if home_team_id and away_team_id:
                team_history = await self.researcher.research_team_history(
                    str(home_team_id), str(away_team_id)
                )
                research_data["team_history"] = team_history
            league_id = fixture.get("league", {}).get("id") if fixture else None
            season = fixture.get("league", {}).get("season") if fixture else None
            if league_id and season:
                season_trends = await self.researcher.research_season_trends(
                    str(league_id), str(season)
                )
                research_data["season_trends"] = season_trends
            data_list = [game_data]
            if home_team_data:
                data_list.append(home_team_data)
            if away_team_data:
                data_list.append(away_team_data)
            storylines = await self.researcher.generate_storylines(data_list)
            raw_article = await self.writer.generate_game_recap(game_data, research_data, storylines)
            metadata = {
                "game_id": game_id,
                "article_type": "recap",
                "source_data": game_data,
                "storylines": storylines,
                "generated_at": datetime.now().isoformat()
            }
            return {
                "content": raw_article,
                "metadata": {
                    **metadata,
                    "pipeline_version": "1.0.0"
                }
            }
        except Exception as e:
            logger.error("Error generating game recap for %s: %s", game_id, str(e))
            raise

    async def generate_preview_article(self, game_id: str) -> Dict[str, Any]:
        """Generate a game preview article."""
        try:
            logger.info("Starting preview generation for game: %s", game_id)
            game_data = await self.collector.collect_game_data(game_id)
            if not game_data or game_data.get("errors"):
                raise ValueError(f"Failed to collect data for game {game_id}: {game_data.get('errors', [])}")
            fixture_response = game_data.get("response", [{}])[0].get("fixture", {}).get("response", [])
            home_team_id = None
            away_team_id = None
            fixture = None
            if fixture_response:
                fixture = fixture_response[0]
                home_team_id = fixture.get("teams", {}).get("home", {}).get("id")
                away_team_id = fixture.get("teams", {}).get("away", {}).get("id")
                league_id = fixture.get("league", {}).get("id")
                season = fixture.get("league", {}).get("season")
                research_data = {}
                if home_team_id and away_team_id:
                    team_history = await self.researcher.research_team_history(
                        str(home_team_id), str(away_team_id)
                    )
                    research_data["team_history"] = team_history
                if league_id and season:
                    season_trends = await self.researcher.research_season_trends(
                        str(league_id), str(season)
                    )
                    research_data["season_trends"] = season_trends
            else:
                research_data = {}
            storylines = await self.researcher.generate_storylines([game_data])
            raw_article = await self.writer.generate_preview_article(game_data, research_data, storylines)
            metadata = {
                "game_id": game_id,
                "article_type": "preview",
                "source_data": game_data,
                "storylines": storylines,
                "generated_at": datetime.now().isoformat()
            }
            return {
                "content": raw_article,
                "metadata": {
                    **metadata,
                    "pipeline_version": "1.0.0"
                }
            }
        except Exception as e:
            logger.error("Error generating preview for %s: %s", game_id, str(e))
            raise

    async def generate_player_spotlight(self, player_id: str, game_id: Optional[str] = None) -> Dict[str, Any]:
        """Generate a player spotlight article."""
        try:
            logger.info("Starting player spotlight generation for player: %s", player_id)
            player_data = await self.collector.collect_player_data(player_id)
            if not player_data or player_data.get("errors"):
                raise ValueError(f"Failed to collect data for player {player_id}: {player_data.get('errors', [])}")
            context = {"game_id": game_id} if game_id else {}
            performance_data = await self.researcher.research_player_performance(player_id, context)
            storylines = await self.researcher.generate_storylines([player_data])
            raw_article = await self.writer.generate_player_spotlight(player_data, performance_data, storylines)
            metadata = {
                "player_id": player_id,
                "game_id": game_id,
                "article_type": "spotlight",
                "source_data": player_data,
                "storylines": storylines,
                "generated_at": datetime.now().isoformat()
            }
            return {
                "content": raw_article,
                "metadata": {
                    **metadata,
                    "pipeline_version": "1.0.0"
                }
            }
        except Exception as e:
            logger.error("Error generating player spotlight for %s: %s", player_id, str(e))
            raise

    async def get_pipeline_status(self) -> Dict[str, Any]:
        """Get the current status of all agents in the pipeline."""
        return {
            "pipeline_version": "1.0.0",
            "agents": {
                "data_collector": "initialized",
                "researcher": "initialized", 
                "writer": "initialized"
            },
            "last_updated": datetime.now().isoformat()
        } 