import os
import requests
from datetime import date
from dotenv import load_dotenv

# Global configuration variables
API_KEY = None
API_BASE_URL = None

def init_api_config():
    """Loads environment variables and sets global config fields."""
    global API_KEY, API_BASE_URL
    load_dotenv()

    API_KEY = os.getenv("API_FOOTBALL_KEY")
    API_BASE_URL = os.getenv("API_FOOTBALL_BASE_URL")

    if not API_KEY:
        raise EnvironmentError("Missing API_FOOTBALL_KEY in environment variables.")
    if not API_BASE_URL:
        raise EnvironmentError("Missing API_FOOTBALL_BASE_URL in environment variables.")

def check_api_football_key():
    """Tests the API key with a basic status check."""
    headers = {"x-apisports-key": API_KEY}
    try:
        response = requests.get(API_BASE_URL, headers=headers)
        response.raise_for_status()
        data = response.json()
        print("Connection successful!")
        print(f"Plan: {data.get('response', {}).get('subscription', {}).get('plan')}")
        return True
    except requests.exceptions.HTTPError as http_err:
        print(f"HTTP error: {http_err}")
    except Exception as err:
        print(f"Unexpected error: {err}")
    return False

def fetch_fixtures(league_id: int):
    """Fetches today's football fixtures for the specified league."""
    headers = {
        "x-apisports-key": API_KEY,
        "accept": "application/json"
    }
    url = f"{API_BASE_URL}/fixtures"

    # Note: Default to today's date and current year!
    today = date.today().strftime("%Y-%m-%d")
    season = date.today().year

    params = {
        #"league": league_id,
        #"season": 2023, # season
        "date": today
    }

    try:
        response = requests.get(url, headers=headers, params=params)
        print(f"Status Code: {response.status_code}")
        print(f"Rate Limit: {response.headers.get('x-ratelimit-requests-remaining')}/"
              f"{response.headers.get('x-ratelimit-requests-limit')}")
        response.raise_for_status()
        data = response.json()
        print("Fixtures fetched successfully!")
        print(data)
    except requests.exceptions.HTTPError as http_err:
        print(f"HTTP error occurred: {http_err}")
    except Exception as err:
        print(f"Error: {err}")

# -------------------------------
# Example usage
if __name__ == "__main__":
    init_api_config()
    #if check_api_football_key(): // testing request could waste points
    fetch_fixtures(league_id=140)  # Premier League
    #else:
    #    print("Something is not working with the API setup.")
