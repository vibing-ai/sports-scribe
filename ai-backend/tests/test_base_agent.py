# agents/data_collector_agent.py
import json
from scriber_agents.base_agent import BaseAgent
from openai import OpenAI
import os
from dotenv import load_dotenv
load_dotenv()

class DataCollectorAgent(BaseAgent):
    def __init__(self, openai_api_key):
        self.client = OpenAI(api_key=openai_api_key)

    def run(self, user_prompt):
        messages = [{"role": "user", "content": user_prompt}]
        tools = self.function_schema()

        response = self.client.chat.completions.create(
            model="gpt-4o",
            messages=messages,
            tools=tools,
        )

        for tool_call in response.choices[0].message.tool_calls:
            name = tool_call.function.name
            args = json.loads(tool_call.function.arguments)
            if name == "get_fixtures":
                result = self.get_fixtures(**args)
                # Feed back to the model
                messages.append({
                    "role": "function",
                    "name": name,
                    "content": json.dumps(result)
                })
                print(messages)
                # Second call to the model to get final answer
                response2 = self.client.chat.completions.create(
                    model="gpt-4o",
                    messages=messages,
                    tools=tools,
                )
                return response2.choices[0].message.content
        return response.choices[0].message.content


if __name__ == "__main__":
    agent = DataCollectorAgent(openai_api_key=os.getenv('OPENAI_API_KEY'))
    # Test with a recent date that likely has matches
    answer = agent.run("Please query all Premier League (league ID: 39) matches for 2010-08-15")
    print(answer)