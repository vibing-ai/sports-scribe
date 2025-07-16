import os
import sys

from dotenv import load_dotenv

load_dotenv()

# Add the parent folder (ai-backend) to sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))


import asyncio

from sports_apis import APIFootballClient  # Make sure this matches your module name


async def main():
    api_key = os.getenv("API_FOOTBALL_KEY")
    api_key_header = os.getenv("API_FOOTBALL_KEY_HEADER")
    base_url = os.getenv("API_FOOTBALL_BASE_URL")
    client = APIFootballClient(api_key,api_key_header,base_url)

    # get all teams
    result = await client.get_teams(39, 2023)  # 7131=Estadio Libertadores de América,2025
    print(result)

    # get one team
    result = await client.get_team(3997)
    print(result)

if __name__ == "__main__":
    asyncio.run(main())
