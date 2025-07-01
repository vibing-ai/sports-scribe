"""
Sport Scribe AI Backend - Main Application

This is the main entry point for the AI backend system that orchestrates
the multi-agent sports journalism workflow.
"""

import asyncio
import logging
from contextlib import asynccontextmanager
from typing import Dict, Any

from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from config.settings import get_settings
from config.agent_config import AgentConfigurations
from agents.data_collector import DataCollectorAgent
from agents.researcher import ResearchAgent
from agents.writer import WritingAgent
from agents.editor import EditorAgent
from utils.logging import setup_logging, get_logger

# Initialize logging
setup_logging()
logger = get_logger(__name__)

# Get application settings
settings = get_settings()


class ArticleRequest(BaseModel):
    """Request model for article generation."""
    game_id: str
    article_type: str = "game_recap"
    target_length: int = 800
    priority: str = "normal"


class ArticleResponse(BaseModel):
    """Response model for article generation."""
    article_id: str
    status: str
    content: str = ""
    metadata: Dict[str, Any] = {}


class HealthResponse(BaseModel):
    """Health check response model."""
    status: str
    version: str = "1.0.0"
    environment: str
    agents_status: Dict[str, str]


class AgentOrchestrator:
    """
    Orchestrates the multi-agent workflow for sports article generation.
    """
    
    def __init__(self):
        """Initialize the agent orchestrator with all agents."""
        logger.info("Initializing Agent Orchestrator")
        
        # Get agent configurations
        configs = AgentConfigurations.get_all_configs()
        
        # Initialize agents with the configuration objects directly
        self.data_collector = DataCollectorAgent(configs["data_collector"])
        self.researcher = ResearchAgent(configs["researcher"])
        self.writer = WritingAgent(configs["writer"])
        self.editor = EditorAgent(configs["editor"])
        
        logger.info("All agents initialized successfully")
    
    async def generate_article(self, request: ArticleRequest) -> ArticleResponse:
        """
        Generate a sports article using the multi-agent workflow.
        
        Args:
            request: Article generation request
            
        Returns:
            Generated article response
        """
        logger.info(f"Starting article generation for game {request.game_id}")
        
        try:
            # Step 1: Collect game data
            logger.info("Step 1: Collecting game data")
            game_data = await self.data_collector.collect_game_data(request.game_id)
            
            # Collect additional data based on game info
            if "home_team_id" in game_data:
                home_team_data = await self.data_collector.collect_team_data(game_data["home_team_id"])
                game_data["home_team_data"] = home_team_data
            
            if "away_team_id" in game_data:
                away_team_data = await self.data_collector.collect_team_data(game_data["away_team_id"])
                game_data["away_team_data"] = away_team_data
            
            # Step 2: Research contextual information
            logger.info("Step 2: Researching contextual information")
            research_data = {}
            
            if "home_team_id" in game_data and "away_team_id" in game_data:
                history = await self.researcher.research_team_history(
                    game_data["home_team_id"], 
                    game_data["away_team_id"]
                )
                research_data["team_history"] = history
            
            # Step 3: Generate article content
            logger.info("Step 3: Generating article content")
            if request.article_type == "game_recap":
                content = await self.writer.generate_game_recap(game_data, research_data)
            elif request.article_type == "preview":
                content = await self.writer.generate_preview_article(game_data, research_data)
            else:
                raise ValueError(f"Unsupported article type: {request.article_type}")
            
            # Step 4: Edit and review content
            logger.info("Step 4: Editing and reviewing content")
            metadata = {
                "game_id": request.game_id,
                "article_type": request.article_type,
                "target_length": request.target_length
            }
            
            final_content, review_feedback = await self.editor.review_article(content, metadata)
            
            # Generate article ID
            import uuid
            article_id = str(uuid.uuid4())
            
            logger.info(f"Article generation completed: {article_id}")
            
            return ArticleResponse(
                article_id=article_id,
                status="completed",
                content=final_content,
                metadata={
                    "review_feedback": review_feedback,
                    "word_count": len(final_content.split()),
                    "generation_time": "timestamp_here"  # TODO: Add actual timestamp
                }
            )
            
        except Exception as e:
            logger.error(f"Article generation failed: {str(e)}")
            raise HTTPException(status_code=500, detail=f"Article generation failed: {str(e)}")


# Global orchestrator instance
orchestrator = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan management."""
    global orchestrator
    
    # Startup
    logger.info("Starting Sport Scribe AI Backend")
    orchestrator = AgentOrchestrator()
    yield
    
    # Shutdown
    logger.info("Shutting down Sport Scribe AI Backend")


# Create FastAPI application
app = FastAPI(
    title="Sport Scribe AI Backend",
    description="Multi-agent AI system for generating sports articles",
    version="1.0.0",
    lifespan=lifespan
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure appropriately for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health", response_model=HealthResponse)
async def health_check():
    """Health check endpoint."""
    return HealthResponse(
        status="healthy",
        environment=settings.environment,
        agents_status={
            "data_collector": "ready",
            "researcher": "ready",
            "writer": "ready",
            "editor": "ready"
        }
    )


@app.post("/generate-article", response_model=ArticleResponse)
async def generate_article(request: ArticleRequest, background_tasks: BackgroundTasks):
    """Generate a sports article using the multi-agent system."""
    if not orchestrator:
        raise HTTPException(status_code=503, detail="Service not ready")
    
    return await orchestrator.generate_article(request)


@app.get("/")
async def root():
    """Root endpoint."""
    return {
        "message": "Sport Scribe AI Backend",
        "version": "1.0.0",
        "status": "running",
        "docs": "/docs"
    }


if __name__ == "__main__":
    import uvicorn
    
    logger.info(f"Starting server on {settings.fastapi_host}:{settings.fastapi_port}")
    uvicorn.run(
        "main:app",
        host=settings.fastapi_host,
        port=settings.fastapi_port,
        reload=settings.fastapi_reload,
        log_level=settings.log_level.lower()
    ) 