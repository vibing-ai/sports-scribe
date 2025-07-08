"""Data Collector Agent.

This agent is responsible for gathering game data from various sports APIs.
It collects real-time and historical sports data to feed into the content generation pipeline.
"""

import logging
from typing import Any, Dict, List
from openai import OpenAI
import asyncio
import os
from dotenv import load_dotenv
from agents import Agent, GuardrailFunctionOutput, RunContextWrapper, Runner, output_guardrail, trace, function_tool
from pydantic import BaseModel
import http.client

load_dotenv()

# Initialize OpenAI client
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

currentModel = os.getenv("OPENAI_MODEL")

logger = logging.getLogger(__name__)

# class PlayerStats(BaseModel):
#     name: str
#     team: str
#     points: int
#     rebounds: int
#     assists: int
#     additional_stats: Optional[Dict[str, float]] = None

# class GameData(BaseModel):
#     game_id: str
#     home_team: str
#     away_team: str
#     final_score: str
#     date: str = Field(description="Date in ISO format (YYYY-MM-DD)")
#     key_stats: Optional[Dict[str, str]] = None  # Changed to single type for strict mode
#     player_performances: Optional[List[PlayerStats]] = None


class DataCollectorResponse(BaseModel):
    get: str
    parameters: Dict[str, int]
    errors: List[str]
    results: int
    paging: Dict[str, int]
    response: List[Dict[str, Any]]

class DataOutput(BaseModel):
    reasoning: str
    is_valid: bool

# original_prompt = """Expert sports data analyst. Collect comprehensive, accurate
#     game statistics from multiple sources. Validate data quality and flag any
#     inconsistencies. Prioritize official sources and recent updates."""

temp_prompt = "" """
        You are a specialized soccer data collector agent. Your role is to:
        1. Collect soccer/football data from the tools you are given
        2. Always return data in the exact JSON structure specified here.
        4. Validate data quality before returning results
        
        CRITICAL: You must ALWAYS return responses in this exact JSON format:
        {
            "get": "string describing what was requested",
            "parameters": {"dictionary of parameters used"},
            "errors": ["array of any errors encountered"],
            "results": "number of results returned",
            "paging": {
                "current": "current page number",
                "total": "total pages available"
            },
            "response": ["array of actual data objects"]
        }
        
        If no data is found, return results: 0 and empty response array.
        """

@function_tool
def get_player_data() -> str:
    """Get football/soccer player data from RapidAPI."""
    print("get_football_data():")
    try:
        api_key = os.getenv("RAPIDAPI_KEY")
        if not api_key:
            raise ValueError("RAPID_API_KEY not found.")
        
        conn = http.client.HTTPSConnection("api-football-v1.p.rapidapi.com")
        
        headers = {
            'x-rapidapi-host': "api-football-v1.p.rapidapi.com",
            'x-rapidapi-key': api_key,
        }

        conn.request("GET", "/v3/fixtures/players?fixture=169080", headers=headers)

        response = conn.getresponse() #Returns HTTP response object
        data = response.read()

        decoded_data = data.decode("utf8")

        print("Rapid API football player data retrieved successfully")

        return decoded_data
    except Exception as e:
        error_msg = f"Error fetching Rapid API football player data: {e}"
        print(error_msg)
        return error_msg

@function_tool
def get_game_data() -> str:
    """Get football game data from RapidAPI."""
    print("get_football_data():")
    try:
        api_key = os.getenv("RAPIDAPI_KEY")
        if not api_key:
            raise ValueError("RAPIDAPI_KEY not found.")
        
        conn = http.client.HTTPSConnection("api-football-v1.p.rapidapi.com")
        
        headers = {
        'x-rapidapi-key': api_key,
        'x-rapidapi-host': "api-football-v1.p.rapidapi.com"
        }

        conn.request("GET", "/v3/fixtures/headtohead?h2h=33-34", headers=headers)

        response = conn.getresponse() #Returns HTTP response object
        data = response.read()

        decoded_data = data.decode("utf8")

        print("Rapid API football game data retrieved successfully")

        return decoded_data
    except Exception as e:
        error_msg = f"Error fetching Rapid API football game data: {e}"
        print(error_msg)
        return error_msg


@function_tool
def get_football_data() -> str:
    """Get football/soccer team data from RapidAPI."""
    print("get_football_data():")
    try:
        api_key = os.getenv("RAPIDAPI_KEY")
        if not api_key:
            raise ValueError("RAPID_API_KEY not found.")
        
        conn = http.client.HTTPSConnection("api-football-v1.p.rapidapi.com")
        
        headers = {
            'x-rapidapi-host': "api-football-v1.p.rapidapi.com",
            'x-rapidapi-key': api_key,
        }

        conn.request("GET", "/v3/teams?id=33", headers=headers)

        response = conn.getresponse() #Returns HTTP response object
        data = response.read()

        decoded_data = data.decode("utf8")

        print("Rapid API football team data retrieved successfully")

        return decoded_data
    except Exception as e:
        error_msg = f"Error fetching Rapid API football team data: {e}"
        print(error_msg)
        return error_msg


@output_guardrail
async def validate_data_quality(
    ctx: RunContextWrapper, agent: Agent, output: str
) -> GuardrailFunctionOutput:
    guardrail_agent = Agent(
        name="Guardrail check",
        instructions="Check if the output is of the correct format.",
        output_type=DataOutput,
    )

    result = await Runner.run(guardrail_agent, output, context=ctx.context)

    return GuardrailFunctionOutput(
        output_info=result.final_output,
        tripwire_triggered=not result.final_output.is_valid,  # Fixed: tripwire should trigger when NOT valid
    )

class DataCollectorAgent():
    """Agent responsible for collecting sports data from various APIs and data sources."""

    def __init__(self, config: dict[str, Any]):
        """Initialize the Data Collector Agent with configuration."""
        self.agent= Agent(
            name="SportsDataCollector",
            instructions=temp_prompt,
            tools=[get_game_data],
            model=currentModel,
            output_guardrails=[validate_data_quality],
            )
        
        #self.config = config
        logger.info("Data Collector Agent initialized")


async def main():
     param = dict[str, Any]
     dc = DataCollectorAgent(param)
    
     with trace("Initialize data collector agent class: "):
        try:
            data = await Runner.run(dc.agent, temp_prompt)
            print("AI: ", data.final_output)
        
        except Exception as e:
            print(f"Error generating data: {e}")
            return f"Error generating data: {e}"
    

if __name__ == "__main__":
    asyncio.run(main())
