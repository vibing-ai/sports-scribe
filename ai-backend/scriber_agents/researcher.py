"""Research Agent.

This agent provides contextual background and analysis for sports articles.
It researches historical data, team/player statistics, and relevant context
to enrich the content generation process.
"""

import logging
from typing import Any, List, Dict
from dotenv import load_dotenv
import json

from agents import Agent, Runner

load_dotenv()
logger = logging.getLogger(__name__)


class ResearchAgent:
    """Agent responsible for researching contextual information and analysis."""

    def __init__(self, config: Dict[str, Any] = None):
        """Initialize the Research Agent with configuration."""
        self.config = config or {}
        
        # Initialize the research agent without web search capability
        self.agent = Agent(
            instructions="""You are a sports research agent specializing in analyzing game data, team history, and player performance. 
            Your task is to provide clear, engaging storylines and analysis that junior writers can easily understand and use.
            
            CRITICAL REQUIREMENTS:
            - ONLY use information that is explicitly provided in the data
            - DO NOT invent, assume, or speculate about any facts not present in the data
            - If data is missing or incomplete, acknowledge this limitation
            - Base all analysis strictly on the factual data provided
            - Do not add external knowledge or assumptions
            
            Focus on:
            1. Most important 3-5 storylines only (based on provided data)
            2. Historical context between teams (from provided data only)
            3. Individual player performances and impact (from provided data only)
            4. Key moments and turning points (from provided data only)
            5. Tactical and strategic insights (from provided data only)
            
            Guidelines:
            - Keep analysis simple and accessible for junior writers
            - Focus on what makes this match/player/team interesting based on actual data
            - Provide factual, objective analysis using only provided information
            - Highlight human interest elements that are supported by the data
            - Consider broader context and significance only if supported by the data
            - If data is insufficient, state what information is missing rather than making assumptions
            
            Always return clear, structured analysis that writers can immediately use, based solely on the provided data.""",
            name="ResearchAgent",
            output_type=str,
            model=self.config.get("model", "gpt-4o-mini"),
        )
        
        logger.info("Research Agent initialized successfully")

    async def get_storyline_from_game_data(self, game_data: dict) -> list[str]:
        """Get storylines from game data.
        
        Args:
            game_data: Game data from Data Collector
            
        Returns:
            list[str]: List of storylines
        """
        logger.info("Generating storylines from game data")
        
        try:
            prompt = f"""
            Analyze the game data and extract key storylines from THIS SPECIFIC MATCH.
            
            GAME DATA (CURRENT MATCH ONLY):
            {game_data}
            
            CRITICAL: Focus ONLY on events that occurred in THIS SPECIFIC MATCH. Do not confuse with historical data or previous matches.
            
            Provide game analysis focusing on (based ONLY on THIS match data):
            1. Key moments and turning points from THIS match
            2. Goals, cards, and substitutions from THIS match
            3. Tactical decisions and formations used in THIS match
            4. Player performances and contributions in THIS match
            5. Match outcome and significance of THIS specific result
            
            Focus on what makes THIS match special and newsworthy based on the actual data provided.
            Keep the analysis simple and accessible for junior writers.
            If data is insufficient for certain aspects, focus on what is available.
            
            Based on the following data, output ONLY a JSON array (Python list) of 3-5 concise, newsworthy storylines/insights. 
            Each element should be a single string. Do NOT include any introduction, explanation, or summary—just the JSON array.

            DATA (CURRENT MATCH ONLY):
            {game_data}

            Instructions:
            - Output only a JSON array (Python list) of strings, e.g. ["storyline1", "storyline2", "storyline3"]
            - No extra text, no explanations, no markdown, no numbering, no headings
            - Base all storylines strictly on the provided data from THIS MATCH
            - Only generate storylines based strictly on events that occurred during THIS SPECIFIC match
            - Do not include information inferred from team or player history unless explicitly present in THIS match data
            - Do not confuse current match statistics with historical statistics
            """
            
            result = await Runner.run(self.agent, prompt)
            try:
                storylines = json.loads(result.final_output)
                if isinstance(storylines, list):
                    if all(isinstance(s, dict) and len(s) == 1 for s in storylines):
                        return [list(s.values())[0] for s in storylines]
                    return [str(s).strip() for s in storylines if s]
            except Exception:
                return [line.strip() for line in result.final_output.splitlines() if line.strip()]
            
        except Exception as e:
            logger.error(f"Error generating storylines from game data: {e}")
            return ["Match analysis based on available game data", "Key moments and player performances from the data"]

    async def get_history_from_team_data(self, team_data: dict) -> list[str]:
        """Get historical context from team data.
        
        Args:
            team_data: Team information including enhanced data
            
        Returns:
            str: Historical context and analysis
        """
        logger.info("Analyzing historical context from team data")
        
        try:
            prompt = f"""
            Analyze the historical context and background information between these teams.
            
            TEAM DATA (HISTORICAL/BACKGROUND INFORMATION):
            {team_data}
            
            CRITICAL: This is HISTORICAL/BACKGROUND data, NOT current match data. Use this only for context and introduction.
            
            Provide historical context focusing on (based ONLY on provided data):
            1. Head-to-head record and significance (from historical data)
            2. Recent form and momentum (from historical data)
            3. Key historical moments between these teams (from historical data)
            4. Current season context (from historical data)
            5. Most compelling historical storylines (from historical data)
            
            Keep the analysis simple and accessible for junior writers.
            Focus on the 3-5 most important historical angles based on available data.
            If certain historical information is missing, focus on what is provided.
            
            Based on the following data, output ONLY a JSON array (Python list) of 3-5 concise, newsworthy storylines/insights. 
            Each element should be a single string. Do NOT include any introduction, explanation, or summary—just the JSON array.

            DATA (HISTORICAL/BACKGROUND ONLY):
            {team_data}

            Instructions:
            - Output only a JSON array (Python list) of strings, e.g. ["history1", "history2", "history3"]
            - No extra text, no explanations, no markdown, no numbering, no headings
            - Base all historical context strictly on the provided data
            - This is BACKGROUND information, not current match events
            - Use this data for context and introduction, not as the main story
            """
            
            result = await Runner.run(self.agent, prompt)
            try:
                storylines = json.loads(result.final_output)
                if isinstance(storylines, list):
                    return [str(s).strip() for s in storylines if s]
            except Exception:
                return [line.strip() for line in result.final_output.splitlines() if line.strip()]
            
        except Exception as e:
            logger.error(f"Error analyzing historical context: {e}")
            return ["Historical context based on available team data", "Team performance analysis from provided data"]

    async def get_performance_from_player_game_data(self, player_data: dict, game_data: dict) -> list[str]:
        """Analyze individual player performance from game data.
        
        Args:
            player_data: Player information including enhanced data
            game_data: Game data for context
            
        Returns:
            str: Player performance analysis
        """
        logger.info("Analyzing individual player performance from game data")
        
        try:
            prompt = f"""
            Analyze the individual player performances from THIS SPECIFIC MATCH.
            
            GAME CONTEXT (CURRENT MATCH):
            {game_data}
            
            PLAYER DATA (CURRENT MATCH PERFORMANCE + HISTORICAL BACKGROUND):
            {player_data}
            
            CRITICAL: Distinguish between CURRENT MATCH performance and HISTORICAL player data.
            
            Provide individual performance analysis focusing on (based ONLY on provided data):
            1. Standout performers and their impact in THIS match (from current match data)
            2. Key moments and achievements in THIS match (from current match data)
            3. Tactical contributions in THIS match (from current match data)
            4. Historical form and background context (from historical data - use sparingly)
            5. Most compelling player storylines from THIS match (from current match data)
            
            Focus on the 3-5 most important player performances based on available data.
            Keep analysis simple and accessible for junior writers.
            Highlight what makes each player's performance special in THIS match based on the provided data.
            Consider impact on THIS match result using only the current match data.
            
            Based on the following data, output ONLY a JSON array (Python list) of 3-5 concise, newsworthy storylines/insights. 
            Each element should be a single string. Do NOT include any introduction, explanation, or summary—just the JSON array.

            DATA:
            {player_data}

            Instructions:
            - Output only a JSON array (Python list) of strings, e.g. ["performance1", "performance2", "performance3"]
            - No extra text, no explanations, no markdown, no numbering, no headings
            - Base all player analysis strictly on the provided data
            - Focus on THIS match performance, use historical data only for context
            - Do not confuse current match statistics with historical statistics
            """
            
            result = await Runner.run(self.agent, prompt)
            try:
                storylines = json.loads(result.final_output)
                if isinstance(storylines, list):
                    return [str(s).strip() for s in storylines if s]
            except Exception:
                return [line.strip() for line in result.final_output.splitlines() if line.strip()]
            
        except Exception as e:
            logger.error(f"Error analyzing player performance: {e}")
            return ["Player performance analysis based on available data", "Individual contributions from the match data"]

    async def analyze_game_data(self, game_data: Dict[str, Any]) -> str:
        """Analyze game data and extract key storylines (for pipeline compatibility).
        
        Args:
            game_data: Raw game data from Data Collector
            
        Returns:
            str: Game analysis and storylines
        """
        logger.info("Analyzing game data for storylines")
        
        try:
            # Generate storylines using the new method
            storylines = await self.get_storyline_from_game_data(game_data)
            return storylines
            
        except Exception as e:
            logger.error(f"Error analyzing game data: {e}")
            return "Match analysis based on available game data"

    async def generate_storylines(self, data_list: List[Dict[str, Any]]) -> List[str]:
        """Generate storylines from collected data (for pipeline compatibility).
        
        Args:
            data_list: List of data dictionaries
            
        Returns:
            List[str]: Top 3-5 most important storylines
        """
        logger.info("Generating storylines from data list")
        
        try:
            # Use the first data item for storyline generation
            if data_list and len(data_list) > 0:
                game_data = data_list[0]
                storylines = await self.get_storyline_from_game_data(game_data)
                
                # Split into individual storylines if it's a string
                if isinstance(storylines, str):
                    # Split by newlines and filter out empty lines
                    lines = [line.strip() for line in storylines.split("\n") if line.strip()]
                    return lines[:5]  # Return max 5 storylines
                else:
                    return storylines[:5] if isinstance(storylines, list) else [storylines]
            
            return ["Match analysis based on available data", "Key moments from the provided data"]
            
        except Exception as e:
            logger.error(f"Error generating storylines: {e}")
            return ["Match analysis based on available data", "Key moments from the provided data"]
