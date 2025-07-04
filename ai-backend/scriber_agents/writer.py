"""Writing Agent.

This agent generates engaging sports articles based on collected data and research.
It uses AI to create compelling narratives from raw sports data and context.
"""

import logging
from typing import Any, List, Dict
from openai import AsyncOpenAI
import os

logger = logging.getLogger(__name__)


class WritingAgent:
    """Agent responsible for generating sports articles and content."""

    def __init__(self, config: Dict[str, Any], openai_client: AsyncOpenAI = None):
        """Initialize the Writing Agent with configuration."""
        self.config = config
        self.api_key = config.get("openai_api_key") or os.getenv("OPENAI_API_KEY")
        self.model = config.get("model", "gpt-4")
        self.max_tokens = config.get("max_tokens", 2000)
        self.temperature = config.get("temperature", 0.7)
        self.client = openai_client or AsyncOpenAI(api_key=self.api_key)
        logger.info("Writing Agent initialized")

    def _create_prompt(self, article_type: str, data: Dict[str, Any], research_data: Dict[str, Any], storylines: List[str]) -> str:
        """Create a prompt for the AI model based on article type, data, and storylines."""
        base_prompt = f"""You are a professional sports journalist writing for a major sports publication.\nGenerate an engaging {article_type} article based on the following data and storylines.\n\nKey Storylines:\n{chr(10).join(f"- {storyline}" for storyline in storylines)}\n\nRaw Data Summary:\n{self._format_data_summary(data)}\n\nRequirements:\n- Write in an engaging, professional sports journalism style\n- Include specific details from the data provided\n- Incorporate the key storylines naturally\n- Use active voice and dynamic language\n- Include relevant statistics and facts\n- Target length: 800-1200 words\n- Include a compelling headline\n\nArticle:"""
        return base_prompt

    def _format_data_summary(self, data: Dict[str, Any]) -> str:
        """Format raw data into a readable summary for the AI prompt."""
        summary_parts = []
        if data.get("get") == "game_data":
            fixture_data = data.get("response", [{}])[0].get("fixture", {})
            if fixture_data:
                fixture_response = fixture_data.get("response", [])
                if fixture_response:
                    fixture = fixture_response[0]
                    teams = fixture.get("teams", {})
                    goals = fixture.get("goals", {})
                    summary_parts.append(f"Match: {teams.get('home', {}).get('name', 'Home')} vs {teams.get('away', {}).get('name', 'Away')}")
                    summary_parts.append(f"Score: {goals.get('home', 0)} - {goals.get('away', 0)}")
                    summary_parts.append(f"Date: {fixture.get('fixture', {}).get('date', 'Unknown')}")
                    summary_parts.append(f"Venue: {fixture.get('fixture', {}).get('venue', {}).get('name', 'Unknown')}")
        elif data.get("get") == "team_data":
            team_info = data.get("response", [{}])[0].get("team_info", {})
            if team_info:
                team_response = team_info.get("response", [])
                if team_response:
                    team = team_response[0]
                    summary_parts.append(f"Team: {team.get('team', {}).get('name', 'Unknown')}")
                    summary_parts.append(f"Country: {team.get('team', {}).get('country', 'Unknown')}")
                    summary_parts.append(f"Founded: {team.get('team', {}).get('founded', 'Unknown')}")
        elif data.get("get") == "player_data":
            player_info = data.get("response", [{}])[0].get("player_info", {})
            if player_info:
                player_response = player_info.get("response", [])
                if player_response:
                    player = player_response[0]
                    summary_parts.append(f"Player: {player.get('player', {}).get('name', 'Unknown')}")
                    summary_parts.append(f"Age: {player.get('player', {}).get('age', 'Unknown')}")
                    summary_parts.append(f"Position: {player.get('statistics', [{}])[0].get('games', {}).get('position', 'Unknown')}")
        return "\n".join(summary_parts) if summary_parts else "No detailed data available"

    async def generate_game_recap(self, game_data: Dict[str, Any], research_data: Dict[str, Any], storylines: List[str]) -> str:
        """Generate a game recap article using storylines."""
        logger.info("Generating game recap article")
        prompt = self._create_prompt("game recap", game_data, research_data, storylines)
        try:
            response = await self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": "You are a professional sports journalist specializing in football."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=self.max_tokens,
                temperature=self.temperature
            )
            return response.choices[0].message.content.strip()
        except Exception as e:
            logger.error(f"Error generating game recap: {e}")
            return self._generate_fallback_article("game recap", game_data, storylines)

    async def generate_player_spotlight(self, player_data: Dict[str, Any], performance_data: Dict[str, Any], storylines: List[str]) -> str:
        """Generate a player spotlight article using storylines."""
        logger.info("Generating player spotlight article")
        prompt = self._create_prompt("player spotlight", player_data, performance_data, storylines)
        try:
            response = await self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": "You are a professional sports journalist specializing in player analysis."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=self.max_tokens,
                temperature=self.temperature
            )
            return response.choices[0].message.content.strip()
        except Exception as e:
            logger.error(f"Error generating player spotlight: {e}")
            return self._generate_fallback_article("player spotlight", player_data, storylines)

    async def generate_preview_article(self, matchup_data: Dict[str, Any], predictions: Dict[str, Any], storylines: List[str]) -> str:
        """Generate a game preview article using storylines."""
        logger.info("Generating preview article")
        prompt = self._create_prompt("game preview", matchup_data, predictions, storylines)
        try:
            response = await self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": "You are a professional sports journalist specializing in match previews."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=self.max_tokens,
                temperature=self.temperature
            )
            return response.choices[0].message.content.strip()
        except Exception as e:
            logger.error(f"Error generating preview article: {e}")
            return self._generate_fallback_article("game preview", matchup_data, storylines)

    def _generate_fallback_article(self, article_type: str, data: Dict[str, Any], storylines: List[str]) -> str:
        """Generate a fallback article when AI generation fails."""
        logger.warning(f"Using fallback article generation for {article_type}")
        data_summary = self._format_data_summary(data)
        storylines_text = "\n".join(f"- {storyline}" for storyline in storylines)
        return f"""# {article_type.title()} Article\n\n## Match Summary\n{data_summary}\n\n## Key Storylines\n{storylines_text}\n\n## Article Content\nThis is a fallback article generated when AI services are unavailable. \nThe actual content would be generated using advanced AI models to create \nengaging, professional sports journalism content based on the provided data \nand storylines.\n\nPlease ensure AI services are properly configured for optimal article generation."""
