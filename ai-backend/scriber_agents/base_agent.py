# agents/base_agent.py
import requests
import os
from dotenv import load_dotenv
import http.client
load_dotenv()

class BaseAgent:
    def get_fixtures(self, league: str, date: str) -> dict:
        """
        Call API Football to get match information for specified league and date
        """
        api_key = os.getenv('RAPIDAPI_KEY')
        if not api_key:
            raise ValueError("RAPIDAPI_KEY environment variable is not set")
        conn = http.client.HTTPSConnection("api-football-v1.p.rapidapi.com")

        headers = {
            'x-rapidapi-host': "api-football-v1.p.rapidapi.com",
            'x-rapidapi-key': api_key
        }
        
        # Extract year from date for season parameter
        import urllib.parse
        year = date.split('-')[0]
        params = {"league": league, "date": date, "season": year}
        query_string = "?" + urllib.parse.urlencode(params)
        
        conn.request("GET", f"/v3/fixtures{query_string}", headers=headers)
        response = conn.getresponse()
        
        # Check HTTP status
        if response.status != 200:
            error_msg = f"API request failed with status {response.status}: {response.reason}"
            return {"error": error_msg, "status": response.status}
        
        data = response.read()
        response_text = data.decode("utf-8")
        
        # Try to parse as JSON
        try:
            import json
            return json.loads(response_text)
        except json.JSONDecodeError:
            return {"error": "Failed to parse JSON response", "raw_response": response_text}

    @staticmethod
    def function_schema():
        return [
            {
                "type": "function",
                "function": {
                    "name": "get_fixtures",
                    "description": "Get football match information for specified league and date",
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "league": {
                                "type": "string",
                                "description": "League ID (e.g., 39 for Premier League, 140 for La Liga)"
                            },
                            "date": {
                                "type": "string",
                                "description": "Match date in YYYY-MM-DD format"
                            }
                        },
                        "required": ["league", "date"]
                    }
                }
            }
        ]
    

