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
            
            Focus on:
            1. Most important 3-5 storylines only
            2. Historical context between teams
            3. Individual player performances and impact
            4. Key moments and turning points
            5. Tactical and strategic insights
            
            Guidelines:
            - Keep analysis simple and accessible for junior writers
            - Focus on what makes this match/player/team interesting
            - Provide factual, objective analysis
            - Highlight human interest elements
            - Consider broader context and significance
            
            Always return clear, structured analysis that writers can immediately use.""",
            name="ResearchAgent",
            output_type=str,
            model=self.config.get("model", "gpt-4o-mini"),
        )
        
        logger.info("Research Agent initialized successfully")

    async def get_storyline_from_game_data(self, game_data: dict) -> list[str]:
        """
        Generate storylines from game data.

        Returns:
            list[str]: 3-5 concise, newsworthy storylines. No explanations or intro.
        """
        logger.info("Generating storylines from game data")
        
        try:
            prompt = f"""
            Analyze this game data and generate the 3-5 most compelling storylines:
            
            GAME DATA:
            {game_data}
            
            Generate 3-5 compelling storylines that combine:
            - Match result and key moments
            - Individual player performances
            - Tactical battles and formations
            - Historical significance
            - Human interest elements
            
            Focus on what makes this match special and newsworthy.
            Keep the analysis simple and accessible for junior writers.
            
            Based on the following data, output ONLY a JSON array (Python list) of 3-5 concise, newsworthy storylines/insights. 
            Each element should be a single string. Do NOT include any introduction, explanation, or summary—just the JSON array.

            DATA:
            {game_data}

            Instructions:
            - Output only a JSON array (Python list) of strings, e.g. ["storyline1", "storyline2", "storyline3"]
            - No extra text, no explanations, no markdown, no numbering, no headings
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
            return ["Exciting match with key players making the difference. Tactical battle between managers."]

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
            Analyze the historical context between these teams:
            
            TEAM DATA:
            {team_data}
            
            Provide historical context focusing on:
            1. Head-to-head record and significance
            2. Recent form and momentum
            3. Key historical moments between these teams
            4. Current season context
            5. Most compelling historical storylines
            
            Keep the analysis simple and accessible for junior writers.
            Focus on the 3-5 most important historical angles.
            
            Based on the following data, output ONLY a JSON array (Python list) of 3-5 concise, newsworthy storylines/insights. 
            Each element should be a single string. Do NOT include any introduction, explanation, or summary—just the JSON array.

            DATA:
            {team_data}

            Instructions:
            - Output only a JSON array (Python list) of strings, e.g. ["history1", "history2", "history3"]
            - No extra text, no explanations, no markdown, no numbering, no headings
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
            return ["Exciting matchup between teams. Both teams looking to establish dominance."]

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
            Analyze the individual player performances from this match.
            
            GAME CONTEXT:
            {game_data}
            
            PLAYER DATA:
            {player_data}
            
            Provide individual performance analysis focusing on:
            1. Standout performers and their impact
            2. Key moments and achievements
            3. Tactical contributions
            4. Form and momentum
            5. Most compelling player storylines
            
            Focus on the 3-5 most important player performances.
            Keep analysis simple and accessible for junior writers.
            Highlight what makes each player's performance special.
            Consider impact on the match result.
            
            Based on the following data, output ONLY a JSON array (Python list) of 3-5 concise, newsworthy storylines/insights. 
            Each element should be a single string. Do NOT include any introduction, explanation, or summary—just the JSON array.

            DATA:
            {player_data}

            Instructions:
            - Output only a JSON array (Python list) of strings, e.g. ["performance1", "performance2", "performance3"]
            - No extra text, no explanations, no markdown, no numbering, no headings
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
            return ["Individual performances will be crucial to the outcome. Key players making the difference in this match."]

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
            return "Exciting match with key players making the difference"

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
            
            return ["Exciting match with plenty of action", "Key players making the difference"]
            
        except Exception as e:
            logger.error(f"Error generating storylines: {e}")
            return ["Exciting match with plenty of action", "Key players making the difference"]
