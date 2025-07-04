"""Research Agent.

This agent provides contextual background and analysis for sports articles.
It researches historical data, team/player statistics, and relevant context
to enrich the content generation process.
"""

import logging
from typing import Any, List, Dict
from datetime import datetime, timedelta
from dotenv import load_dotenv
load_dotenv()

from utils.security import sanitize_log_input, sanitize_multiple_log_inputs

logger = logging.getLogger(__name__)


class ResearchAgent:
    """Agent responsible for researching contextual information and analysis."""

    def __init__(self, config: Dict[str, Any]):
        """Initialize the Research Agent with configuration."""
        self.config = config
        logger.info("Research Agent initialized")

    def _extract_fixture_data(self, game_data: Dict[str, Any]) -> Dict[str, Any]:
        """Extract key fixture information from API response."""
        try:
            fixture_response = game_data.get("response", [{}])[0].get("fixture", {}).get("response", [])
            if fixture_response:
                fixture = fixture_response[0]
                return {
                    "home_team": fixture.get("teams", {}).get("home", {}),
                    "away_team": fixture.get("teams", {}).get("away", {}),
                    "goals": fixture.get("goals", {}),
                    "score": fixture.get("score", {}),
                    "fixture_date": fixture.get("fixture", {}).get("date"),
                    "venue": fixture.get("fixture", {}).get("venue", {}),
                    "league": fixture.get("league", {}),
                    "status": fixture.get("fixture", {}).get("status", {})
                }
            return {}
        except (IndexError, KeyError) as e:
            logger.warning(f"Error extracting fixture data: {e}")
            return {}

    def _extract_events_data(self, game_data: Dict[str, Any]) -> List[Dict[str, Any]]:
        """Extract key events from API response."""
        try:
            events_response = game_data.get("response", [{}])[0].get("events", {}).get("response", [])
            return [
                {
                    "time": event.get("time", {}),
                    "team": event.get("team", {}),
                    "player": event.get("player", {}),
                    "assist": event.get("assist", {}),
                    "type": event.get("type"),
                    "detail": event.get("detail"),
                    "comments": event.get("comments")
                }
                for event in events_response
            ]
        except (IndexError, KeyError) as e:
            logger.warning(f"Error extracting events data: {e}")
            return []

    def _extract_team_stats(self, team_data: Dict[str, Any]) -> Dict[str, Any]:
        """Extract team statistics from API response."""
        try:
            stats_response = team_data.get("response", [{}])[0].get("team_stats", {}).get("response", [])
            if stats_response:
                return stats_response[0]
            return {}
        except (IndexError, KeyError) as e:
            logger.warning(f"Error extracting team stats: {e}")
            return {}

    async def research_team_history(
        self, team_id: str, opponent_id: str
    ) -> Dict[str, Any]:
        """Research historical matchups between teams.

        Args:
            team_id: Primary team identifier
            opponent_id: Opponent team identifier

        Returns:
            Dictionary containing historical context and storylines
        """
        team_safe, opponent_safe = sanitize_multiple_log_inputs(team_id, opponent_id)
        logger.info(
            "Researching history between teams: %s vs %s", team_safe, opponent_safe
        )
        
        # TODO: Implement actual historical data collection
        # For now, return structured storyline data
        return {
            "get": "team_history",
            "parameters": {"team_id": team_id, "opponent_id": opponent_id},
            "errors": [],
            "results": 1,
            "paging": {},
            "response": [
                {
                    "head_to_head": {
                        "total_matches": 15,
                        "team_wins": 8,
                        "opponent_wins": 4,
                        "draws": 3,
                        "recent_results": ["W", "L", "D", "W", "W"]
                    },
                    "recent_form": {
                        "team_last_5": ["W", "W", "D", "L", "W"],
                        "opponent_last_5": ["L", "W", "D", "W", "L"]
                    },
                    "storylines": [
                        "Team has won 3 of last 5 meetings",
                        "High-scoring encounters average 3.2 goals",
                        "Last meeting ended in dramatic 2-1 victory",
                        "Both teams in good form this season"
                    ]
                }
            ]
        }

    async def research_player_performance(
        self, player_id: str, context: Dict[str, Any]
    ) -> Dict[str, Any]:
        """Research player performance trends and statistics.

        Args:
            player_id: Player identifier
            context: Game/season context

        Returns:
            Dictionary containing player analysis and storylines
        """
        logger.info("Researching player performance: %s", sanitize_log_input(player_id))
        
        # TODO: Implement actual player performance analysis
        return {
            "get": "player_performance",
            "parameters": {"player_id": player_id, "context": context},
            "errors": [],
            "results": 1,
            "paging": {},
            "response": [
                {
                    "season_stats": {
                        "goals": 12,
                        "assists": 8,
                        "appearances": 25,
                        "minutes_played": 2250
                    },
                    "recent_form": {
                        "last_5_games": ["1G", "0G", "2G1A", "0G", "1G"],
                        "goals_in_last_5": 4,
                        "assists_in_last_5": 1
                    },
                    "key_moments": [
                        "Hat-trick against rivals in December",
                        "Match-winning goal in cup final",
                        "Consistent performer throughout season"
                    ],
                    "storylines": [
                        "Player in excellent form with 4 goals in last 5 games",
                        "Key player for team's attacking success",
                        "Potential match-winner in upcoming fixture"
                    ]
                }
            ]
        }

    async def research_season_trends(self, league: str, season: str) -> Dict[str, Any]:
        """Research current season trends and statistics.

        Args:
            league: League identifier
            season: Season identifier

        Returns:
            Dictionary containing season trends and storylines
        """
        league_safe, season_safe = sanitize_multiple_log_inputs(league, season)
        logger.info("Researching season trends for %s - %s", league_safe, season_safe)
        
        # TODO: Implement actual season trends analysis
        return {
            "get": "season_trends",
            "parameters": {"league": league, "season": season},
            "errors": [],
            "results": 1,
            "paging": {},
            "response": [
                {
                    "league_standings": {
                        "top_3": ["Team A", "Team B", "Team C"],
                        "relegation_zone": ["Team X", "Team Y", "Team Z"],
                        "title_race": "Close battle between top 3 teams"
                    },
                    "season_stats": {
                        "total_goals": 850,
                        "avg_goals_per_game": 2.8,
                        "most_goals_team": "Team A (65)",
                        "best_defense": "Team B (25 goals conceded)"
                    },
                    "trends": [
                        "High-scoring season with 2.8 goals per game average",
                        "Title race remains tight with 3 teams in contention",
                        "Relegation battle intensifying in final weeks"
                    ],
                    "storylines": [
                        "Record-breaking goal-scoring season",
                        "Unpredictable title race with multiple contenders",
                        "Dramatic relegation battle unfolding"
                    ]
                }
            ]
        }

    async def analyze_game_data(self, game_data: Dict[str, Any]) -> Dict[str, Any]:
        """Analyze game data and extract key storylines.

        Args:
            game_data: Raw game data from Data Collector

        Returns:
            Dictionary containing game analysis and storylines
        """
        logger.info("Analyzing game data for storylines")
        
        fixture_data = self._extract_fixture_data(game_data)
        events_data = self._extract_events_data(game_data)
        
        # Extract key storylines from the data
        storylines = []
        
        if fixture_data:
            home_team = fixture_data.get("home_team", {}).get("name", "Home Team")
            away_team = fixture_data.get("away_team", {}).get("name", "Away Team")
            goals = fixture_data.get("goals", {})
            
            # Score-based storylines
            home_goals = goals.get("home", 0)
            away_goals = goals.get("away", 0)
            
            if home_goals > away_goals:
                storylines.append(f"{home_team} secures victory over {away_team}")
            elif away_goals > home_goals:
                storylines.append(f"{away_team} claims away win against {home_team}")
            else:
                storylines.append(f"Thrilling draw between {home_team} and {away_team}")
            
            # High-scoring game
            total_goals = home_goals + away_goals
            if total_goals >= 5:
                storylines.append("High-scoring thriller with 5+ goals")
            elif total_goals == 0:
                storylines.append("Defensive masterclass results in goalless draw")
        
        # Event-based storylines
        if events_data:
            goals_events = [e for e in events_data if e.get("type") == "Goal"]
            cards_events = [e for e in events_data if e.get("type") in ["Card", "Yellow Card", "Red Card"]]
            
            if len(goals_events) > 0:
                storylines.append(f"Match features {len(goals_events)} goals")
            
            if len(cards_events) > 5:
                storylines.append("Physical encounter with multiple cards shown")
        
        return {
            "get": "game_analysis",
            "parameters": {"game_id": game_data.get("parameters", {}).get("game_id")},
            "errors": [],
            "results": 1,
            "paging": {},
            "response": [
                {
                    "fixture_summary": fixture_data,
                    "key_events": events_data[:10],  # Top 10 events
                    "storylines": storylines,
                    "match_highlights": [
                        "Dramatic finish with late goal",
                        "Controversial referee decisions",
                        "Outstanding individual performances"
                    ]
                }
            ]
        }

    async def generate_storylines(self, data_list: List[Dict[str, Any]]) -> List[str]:
        """Generate storylines from collected data.

        Args:
            data_list: List of data dictionaries from Data Collector

        Returns:
            List of storylines for the Writer Agent
        """
        logger.info("Generating storylines from %d data sources", len(data_list))
        
        all_storylines = []
        
        for data in data_list:
            if data.get("get") == "game_data":
                game_analysis = await self.analyze_game_data(data)
                storylines = game_analysis.get("response", [{}])[0].get("storylines", [])
                all_storylines.extend(storylines)
            
            elif data.get("get") == "team_data":
                # Extract team-related storylines
                team_info = data.get("response", [{}])[0].get("team_info", {})
                if team_info:
                    all_storylines.append(f"Team form analysis: {team_info.get('team', {}).get('name', 'Unknown')}")
            
            elif data.get("get") == "player_data":
                # Extract player-related storylines
                player_info = data.get("response", [{}])[0].get("player_info", {})
                if player_info:
                    all_storylines.append(f"Player spotlight: {player_info.get('player', {}).get('name', 'Unknown')}")
        
        # Add some generic storylines if we don't have enough
        if len(all_storylines) < 3:
            all_storylines.extend([
                "Exciting match with plenty of action",
                "Key players making the difference",
                "Tactical battle between managers"
            ])
        
        return all_storylines[:10]  # Return top 10 storylines
