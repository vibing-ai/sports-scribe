#!/usr/bin/env python3
"""
Sport Scribe - Database Seed Script
Seeds sample data for development and testing
"""

import json
import os
import sys
from datetime import datetime, timedelta
from typing import Dict, List

# Add the shared directory to the Python path
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'shared'))

try:
    from supabase import create_client, Client
    import structlog
except ImportError:
    print("❌ Required packages not installed. Run: pip install supabase structlog")
    sys.exit(1)

# Setup logging
logger = structlog.get_logger()

# Sample data
SAMPLE_TEAMS = [
    {"name": "Lakers", "city": "Los Angeles", "sport": "basketball", "league": "NBA"},
    {"name": "Warriors", "city": "Golden State", "sport": "basketball", "league": "NBA"},
    {"name": "Cowboys", "city": "Dallas", "sport": "football", "league": "NFL"},
    {"name": "Patriots", "city": "New England", "sport": "football", "league": "NFL"},
]

SAMPLE_PLAYERS = [
    {"name": "LeBron James", "position": "Forward", "team_id": 1, "jersey_number": 6},
    {"name": "Stephen Curry", "position": "Guard", "team_id": 2, "jersey_number": 30},
    {"name": "Dak Prescott", "position": "Quarterback", "team_id": 3, "jersey_number": 4},
    {"name": "Mac Jones", "position": "Quarterback", "team_id": 4, "jersey_number": 10},
]

SAMPLE_GAMES = [
    {
        "home_team_id": 1,
        "away_team_id": 2,
        "game_date": datetime.now() - timedelta(days=1),
        "home_score": 112,
        "away_score": 108,
        "status": "completed",
        "venue": "Crypto.com Arena"
    },
    {
        "home_team_id": 3,
        "away_team_id": 4,
        "game_date": datetime.now() + timedelta(days=7),
        "home_score": None,
        "away_score": None,
        "status": "scheduled",
        "venue": "AT&T Stadium"
    },
]

SAMPLE_ARTICLES = [
    {
        "title": "Lakers Edge Warriors in Thrilling Overtime Victory",
        "content": "In a spectacular display of basketball prowess, the Los Angeles Lakers defeated the Golden State Warriors 112-108 in overtime...",
        "summary": "Lakers win in overtime against Warriors",
        "author": "AI Sports Writer",
        "status": "published",
        "tags": ["basketball", "NBA", "Lakers", "Warriors"],
        "game_id": 1,
        "ai_confidence": 0.95
    }
]


class DatabaseSeeder:
    def __init__(self):
        """Initialize the database seeder with Supabase client."""
        self.supabase_url = os.getenv("SUPABASE_URL")
        self.supabase_key = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
        
        if not self.supabase_url or not self.supabase_key:
            logger.error("Missing Supabase credentials. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY")
            sys.exit(1)
        
        self.supabase: Client = create_client(self.supabase_url, self.supabase_key)
        logger.info("Connected to Supabase")

    def clear_existing_data(self) -> None:
        """Clear existing seed data (for development)."""
        logger.info("Clearing existing seed data...")
        
        tables = ["articles", "games", "players", "teams"]
        for table in tables:
            try:
                _ = self.supabase.table(table).delete().neq("id", 0).execute()
                logger.info(f"Cleared {table} table")
            except Exception as e:
                logger.warning(f"Could not clear {table}: {e}")

    def seed_teams(self) -> List[Dict]:
        """Seed teams data."""
        logger.info("Seeding teams...")
        
        result = self.supabase.table("teams").insert(SAMPLE_TEAMS).execute()
        teams = result.data
        logger.info(f"Created {len(teams)} teams")
        return teams

    def seed_players(self, teams: List[Dict]) -> List[Dict]:
        """Seed players data."""
        logger.info("Seeding players...")
        
        # Update team_ids with actual IDs from inserted teams
        players_data = []
        for player in SAMPLE_PLAYERS:
            player_copy = player.copy()
            # Map to actual team IDs
            team_index = player["team_id"] - 1
            if team_index < len(teams):
                player_copy["team_id"] = teams[team_index]["id"]
            players_data.append(player_copy)
        
        result = self.supabase.table("players").insert(players_data).execute()
        players = result.data
        logger.info(f"Created {len(players)} players")
        return players

    def seed_games(self, teams: List[Dict]) -> List[Dict]:
        """Seed games data."""
        logger.info("Seeding games...")
        
        # Update team_ids with actual IDs from inserted teams
        games_data = []
        for game in SAMPLE_GAMES:
            game_copy = game.copy()
            # Convert datetime to ISO string for JSON serialization
            if isinstance(game_copy["game_date"], datetime):
                game_copy["game_date"] = game_copy["game_date"].isoformat()
            
            # Map to actual team IDs
            home_index = game["home_team_id"] - 1
            away_index = game["away_team_id"] - 1
            
            if home_index < len(teams) and away_index < len(teams):
                game_copy["home_team_id"] = teams[home_index]["id"]
                game_copy["away_team_id"] = teams[away_index]["id"]
            
            games_data.append(game_copy)
        
        result = self.supabase.table("games").insert(games_data).execute()
        games = result.data
        logger.info(f"Created {len(games)} games")
        return games

    def seed_articles(self, games: List[Dict]) -> List[Dict]:
        """Seed articles data."""
        logger.info("Seeding articles...")
        
        # Update game_ids with actual IDs from inserted games
        articles_data = []
        for article in SAMPLE_ARTICLES:
            article_copy = article.copy()
            
            # Map to actual game ID
            game_index = article["game_id"] - 1
            if game_index < len(games):
                article_copy["game_id"] = games[game_index]["id"]
            
            # Convert tags list to JSON
            article_copy["tags"] = json.dumps(article_copy["tags"])
            
            articles_data.append(article_copy)
        
        result = self.supabase.table("articles").insert(articles_data).execute()
        articles = result.data
        logger.info(f"Created {len(articles)} articles")
        return articles

    def run(self, clear_first: bool = False) -> None:
        """Run the complete seeding process."""
        logger.info("🌱 Starting database seeding...")
        
        try:
            if clear_first:
                self.clear_existing_data()
            
            teams = self.seed_teams()
            players = self.seed_players(teams)
            games = self.seed_games(teams)
            articles = self.seed_articles(games)
            
            logger.info("✅ Database seeding complete!")
            logger.info(f"Created: {len(teams)} teams, {len(players)} players, {len(games)} games, {len(articles)} articles")
            
        except Exception as e:
            logger.error(f"❌ Seeding failed: {e}")
            sys.exit(1)


def main():
    """Main entry point."""
    import argparse
    
    parser = argparse.ArgumentParser(description="Seed Sport Scribe database")
    parser.add_argument("--clear", action="store_true", help="Clear existing data first")
    args = parser.parse_args()
    
    seeder = DatabaseSeeder()
    seeder.run(clear_first=args.clear)


if __name__ == "__main__":
    main() 