"""Narrative Planner.

This module analyzes research output and provides structured writing angles and
narrative guidance for the WriterAgent. It processes storylines, determines optimal
narrative approaches, and recommends writing styles based on content analysis.
"""

import logging
import sys
import os
from typing import Any, Dict, List, Optional, Tuple
from dataclasses import dataclass
from enum import Enum
import json
import asyncio
from dotenv import load_dotenv

from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage
from langchain_core.pydantic_v1 import BaseModel, Field

# Add sports intelligence layer path
sports_intelligence_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), 'sports_intelligence_layer')
if sports_intelligence_path not in sys.path:
    sys.path.append(sports_intelligence_path)

load_dotenv()
logger = logging.getLogger(__name__)


class NarrativeAngle(str, Enum):
    """Available narrative angles for sports articles."""
    DRAMA = "drama"
    TACTICAL = "tactical"
    PERFORMANCE = "performance"
    HISTORICAL = "historical"
    EMOTIONAL = "emotional"
    ANALYTICAL = "analytical"


class WritingStyle(str, Enum):
    """Available writing styles."""
    DRAMATIC = "dramatic"
    ANALYTICAL = "analytical"
    BALANCED = "balanced"
    CASUAL = "casual"
    FORMAL = "formal"
    ENGAGING = "engaging"


class TargetAudience(str, Enum):
    """Target audience types."""
    GENERAL_FANS = "general_fans"
    TACTICAL_ENTHUSIASTS = "tactical_enthusiasts"
    CLUB_SUPPORTERS = "club_supporters"
    CASUAL_READERS = "casual_readers"
    EXPERT_ANALYSTS = "expert_analysts"


@dataclass
class ContentPriority:
    """Content element with priority and narrative context."""
    content: str
    priority: int
    narrative_angle: NarrativeAngle
    emotional_weight: float
    audience_appeal: float
    story_type: str


class WritingGuidance(BaseModel):
    """Structured writing guidance for the WriterAgent."""
    primary_angle: NarrativeAngle = Field(description="Main narrative angle to focus on")
    secondary_angle: Optional[NarrativeAngle] = Field(description="Supporting narrative angle")
    writing_style: WritingStyle = Field(description="Recommended writing style")
    target_audience: TargetAudience = Field(description="Primary target audience")
    tone_keywords: List[str] = Field(description="Keywords to guide article tone")
    focus_areas: List[str] = Field(description="Key areas to emphasize in writing")
    content_structure: Dict[str, Any] = Field(description="Recommended article structure")


@dataclass
class IntelligenceQuery:
    """Query for sports intelligence layer (external database)."""
    query_text: str
    query_type: str  # Based on QUERY_PATTERNS_TEMPLATE.json
    expected_data: str
    priority: int
    database_method: str
    supported_stats: List[str]


@dataclass
class ResearcherTask:
    """Task for researcher to analyze existing data internally."""
    task_description: str
    data_source: str  # "existing_game_data", "events", "players", etc.
    analysis_type: str
    expected_output: str
    priority: int


@dataclass
class IntelligenceResult:
    """Result from Sports Intelligence Layer query."""
    query_text: str
    success: bool
    data: Any
    error_message: Optional[str] = None
    execution_time: float = 0.0
    confidence_score: float = 0.0


class NarrativeRecommendation(BaseModel):
    """Complete narrative recommendation for article writing."""
    writing_guidance: WritingGuidance = Field(description="Core writing guidance")
    prioritized_content: List[ContentPriority] = Field(description="Content ranked by importance")
    story_arc: Dict[str, str] = Field(description="Narrative flow structure")
    key_themes: List[str] = Field(description="Main themes to develop")
    emotional_elements: List[str] = Field(description="Elements to create emotional connection")
    intelligence_queries: List[IntelligenceQuery] = Field(description="Queries for sports intelligence layer")
    researcher_tasks: List[ResearcherTask] = Field(description="Tasks for researcher internal analysis")
    confidence_score: float = Field(description="Confidence in recommendations", ge=0.0, le=1.0)


class SportsIntelligenceExecutor:
    """Executes intelligence queries against Sports Intelligence Layer."""
    
    def __init__(self, enable_real_queries: bool = True):
        """Initialize the intelligence executor.
        
        Args:
            enable_real_queries: If True, try to use real Sports Intelligence Layer.
                                If False or if real layer fails, use mock responses.
        """
        self.enable_real_queries = enable_real_queries
        self.intelligence_layer_available = False
        self._soccer_intelligence_class = None
        
    async def initialize(self):
        """Initialize connection to Sports Intelligence Layer."""
        if not self.enable_real_queries:
            logger.info("🔧 Sports Intelligence Layer disabled - using mock responses only")
            return
            
        try:
            # Try to import the SoccerIntelligenceLayer class
            import sys
            import os

            # Add sports intelligence layer to path if not already there
            sports_intel_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), 'sports_intelligence_layer')
            if sports_intel_path not in sys.path:
                sys.path.append(sports_intel_path)

            from main import SoccerIntelligenceLayer
            self._soccer_intelligence_class = SoccerIntelligenceLayer
            self.intelligence_layer_available = True
            logger.info("✅ Sports Intelligence Layer loaded")
        except Exception as e:
            logger.warning(f"⚠️ Sports Intelligence Layer failed: {e}")
            self.intelligence_layer_available = False
    
    async def execute_query(self, query: IntelligenceQuery) -> IntelligenceResult:
        """Execute a single intelligence query."""
        
        start_time = asyncio.get_event_loop().time()
        
        # Try real Sports Intelligence Layer first
        if self.intelligence_layer_available and self._soccer_intelligence_class:
            try:
                # Create a new instance and use with async context manager (following main.py pattern)
                async with self._soccer_intelligence_class() as sil:
                    result = await sil.process_query(query.query_text)
                    execution_time = asyncio.get_event_loop().time() - start_time
                    
                    if result.get("status") == "success":
                        return IntelligenceResult(
                            query_text=query.query_text,
                            success=True,
                            data=result.get("result", {}),
                            execution_time=execution_time,
                            confidence_score=result.get("result", {}).get("confidence_score", 0.8)
                        )
                    else:
                        pass
            except Exception as e:
                pass
        
        # Fallback to mock response
        execution_time = asyncio.get_event_loop().time() - start_time
        mock_result = self._create_mock_response(query)
        
        return IntelligenceResult(
            query_text=query.query_text,
            success=True,
            data=mock_result,
            execution_time=execution_time,
            confidence_score=0.7  # Lower confidence for mock data
        )
    
    async def execute_queries(self, queries: List[IntelligenceQuery]) -> List[IntelligenceResult]:
        """Execute multiple intelligence queries concurrently."""
        if not queries:
            return []
        
        # Execute queries concurrently with timeout
        tasks = [self.execute_query(query) for query in queries]
        try:
            results = await asyncio.wait_for(
                asyncio.gather(*tasks, return_exceptions=True),
                timeout=60.0  # 60 second total timeout
            )
            
            # Process results and handle exceptions
            processed_results = []
            for i, result in enumerate(results):
                if isinstance(result, Exception):
                    processed_results.append(IntelligenceResult(
                        query_text=queries[i].query_text,
                        success=False,
                        data=None,
                        error_message=str(result)
                    ))
                else:
                    processed_results.append(result)
            
            return processed_results
            
        except asyncio.TimeoutError:
            return [IntelligenceResult(
                query_text=q.query_text,
                success=False,
                data=None,
                error_message="Query execution timed out"
            ) for q in queries]
    
    def _create_mock_response(self, query: IntelligenceQuery) -> Dict[str, Any]:
        """Create realistic mock response based on query type."""
        query_lower = query.query_text.lower()
        
        # Mock responses based on query patterns
        if "goals" in query_lower and "season" in query_lower:
            return {
                "data": [{"goals": 12, "season": "2023-24"}],
                "summary": f"Mock data: Player has scored 12 goals this season",
                "metadata": {"source": "mock", "confidence": 0.7}
            }
        elif "wins" in query_lower and "season" in query_lower:
            return {
                "data": [{"wins": 18, "losses": 4, "draws": 6}],
                "summary": f"Mock data: Team has 18 wins this season",
                "metadata": {"source": "mock", "confidence": 0.7}
            }
        elif "passes" in query_lower:
            return {
                "data": [{"passes_completed": 1456, "pass_accuracy": 89.2}],
                "summary": f"Mock data: 1456 passes completed with 89.2% accuracy",
                "metadata": {"source": "mock", "confidence": 0.7}
            }
        elif "clean sheets" in query_lower:
            return {
                "data": [{"clean_sheets": 8, "goals_conceded": 22}],
                "summary": f"Mock data: 8 clean sheets, 22 goals conceded",
                "metadata": {"source": "mock", "confidence": 0.7}
            }
        else:
            # Generic mock response
            return {
                "data": [{"value": 42, "metric": "generic_stat"}],
                "summary": f"Mock data for query: {query.query_text}",
                "metadata": {"source": "mock", "confidence": 0.7}
            }
    
    async def close(self):
        """Clean up resources."""
        # No persistent connections to close since we use context managers
        pass


class NarrativePlanner:
    """Advanced narrative planner that processes research output and provides writing guidance."""

    def __init__(self, config: Dict[str, Any] = None):
        """Initialize the narrative planner with configuration."""
        self.config = config or {}

        # Initialize LLM for narrative analysis
        self.llm = ChatOpenAI(
            model=self.config.get("model", "gpt-4o"),
            temperature=self.config.get("temperature", 0.6),
            max_tokens=self.config.get("max_tokens", 2000),
            timeout=30,  # 30 second timeout for API calls
            max_retries=2,  # Retry failed API calls
        )
        
        # Initialize Sports Intelligence Executor
        self.intelligence_executor = SportsIntelligenceExecutor(
            enable_real_queries=self.config.get("enable_real_intelligence", True)
        )

        # Narrative angle weights for different content types
        self.angle_weights = {
            "goal": {"drama": 0.9, "performance": 0.8, "analytical": 0.6},
            "win": {"drama": 0.8, "emotional": 0.9, "performance": 0.7},
            "tactics": {"tactical": 0.9, "analytical": 0.8, "performance": 0.5},
            "tactical": {"tactical": 0.9, "analytical": 0.8, "performance": 0.5},
            "formation": {"tactical": 0.95, "analytical": 0.8, "performance": 0.4},
            "positioning": {"tactical": 0.9, "analytical": 0.7, "performance": 0.6},
            "pressing": {"tactical": 0.8, "analytical": 0.6, "performance": 0.5},
            "possession": {"tactical": 0.7, "analytical": 0.8, "performance": 0.4},
            "passes": {"analytical": 0.8, "tactical": 0.6, "performance": 0.3},
            "defensive": {"tactical": 0.8, "analytical": 0.7, "performance": 0.5},
            "comeback": {"drama": 0.95, "emotional": 0.9, "historical": 0.6},
            "record": {"historical": 0.9, "analytical": 0.8, "emotional": 0.7},
            "player": {"performance": 0.9, "analytical": 0.7, "emotional": 0.6},
            "debut": {"emotional": 0.8, "historical": 0.7, "performance": 0.8},
            "controversy": {"drama": 0.9, "analytical": 0.8, "emotional": 0.7},
            # Team performance keywords
            "unbeaten": {"performance": 0.9, "analytical": 0.6, "historical": 0.5},
            "form": {"performance": 0.9, "analytical": 0.7, "emotional": 0.4},
            "run": {"performance": 0.8, "drama": 0.6, "historical": 0.5},
            "success": {"performance": 0.8, "emotional": 0.6, "analytical": 0.5},
            "scored": {"performance": 0.8, "analytical": 0.6, "drama": 0.5},
            "conceding": {"performance": 0.7, "analytical": 0.8, "tactical": 0.6},
            "victory": {"performance": 0.7, "drama": 0.8, "emotional": 0.6},
            "solidity": {"performance": 0.8, "tactical": 0.7, "analytical": 0.6},
            "showcased": {"performance": 0.9, "analytical": 0.6, "tactical": 0.5},
            "extended": {"performance": 0.8, "historical": 0.6, "analytical": 0.5},
            "team": {"performance": 0.8, "analytical": 0.6, "tactical": 0.5},
            "matches": {"performance": 0.7, "analytical": 0.6, "drama": 0.5},
            "goals": {"performance": 0.8, "analytical": 0.6, "drama": 0.7},
            "clear": {"performance": 0.7, "analytical": 0.6, "tactical": 0.5},
            "depth": {"performance": 0.8, "tactical": 0.7, "analytical": 0.5},
            "maturity": {"performance": 0.8, "analytical": 0.6, "tactical": 0.6}
        }

        # Query templates for different narrative angles
        self.query_templates = self._initialize_query_templates()

        logger.info("Narrative planner initialized successfully")

    async def initialize(self):
        """Initialize the narrative planner and its components."""
        await self.intelligence_executor.initialize()
        
    async def close(self):
        """Clean up resources."""
        await self.intelligence_executor.close()

    async def create_narrative_plan(self, research_output: Dict[str, Any]) -> NarrativeRecommendation:
        """Create comprehensive narrative plan from research output.

        Args:
            research_output: Output from ResearchAgent containing storylines and analysis

        Returns:
            NarrativeRecommendation: Complete narrative guidance for writing
        """
        logger.info("📝 NARRATIVE PLANNER: Creating narrative plan from research output")

        try:
            # Extract storylines and metadata from research output
            storylines = self._extract_storylines(research_output)
            narrative_plan = research_output.get("narrative_plan", {})
            logger.info(f"📋 INPUT: {len(storylines)} storylines extracted")
            for i, storyline in enumerate(storylines[:2], 1):  # Log first 2 storylines
                logger.info(f"   {i}. {storyline}")

            # Analyze content for narrative angles
            content_analysis = await self._analyze_content_angles(storylines)

            # Determine primary narrative approach
            primary_angle, secondary_angle = self._select_narrative_angles(content_analysis, storylines)
            logger.info(f"🎯 SELECTED NARRATIVE PLAN: Primary={primary_angle.value}, Secondary={secondary_angle.value if secondary_angle else 'None'}")

            # Generate writing guidance
            writing_guidance = await self._generate_writing_guidance(
                primary_angle, secondary_angle, storylines, content_analysis
            )

            # Create prioritized content list
            prioritized_content = self._create_prioritized_content(storylines, content_analysis)

            # Generate story arc structure
            story_arc = self._create_story_arc(prioritized_content, primary_angle)

            # Extract key themes and emotional elements
            key_themes = self._extract_key_themes(storylines, primary_angle)
            emotional_elements = self._identify_emotional_elements(storylines)

            # Generate intelligence queries and researcher tasks
            intelligence_queries, researcher_tasks = self._generate_data_recommendations(
                primary_angle, secondary_angle, storylines, research_output, content_analysis
            )
            logger.info(f"🔍 GENERATED QUERIES: {len(intelligence_queries)} intelligence queries")
            for i, query in enumerate(intelligence_queries, 1):
                logger.info(f"   Query {i}: {query.query_text}")

            # Execute intelligence queries
            intelligence_results = await self._execute_intelligence_queries(intelligence_queries)

            # Enhance storylines with intelligence data
            enhanced_storylines = self._enhance_storylines_with_intelligence(storylines, intelligence_results)

            # Update prioritized content with enhanced storylines
            prioritized_content = self._create_prioritized_content(enhanced_storylines, content_analysis)

            # Calculate confidence score (including intelligence data quality)
            confidence = self._calculate_enhanced_confidence(content_analysis, storylines, intelligence_results)

            # Create final recommendation
            recommendation = NarrativeRecommendation(
                writing_guidance=writing_guidance,
                prioritized_content=prioritized_content,
                story_arc=story_arc,
                key_themes=key_themes,
                emotional_elements=emotional_elements,
                intelligence_queries=intelligence_queries,
                researcher_tasks=researcher_tasks,
                confidence_score=confidence
            )

            # Add intelligence results to recommendation as metadata
            if hasattr(recommendation, '__dict__'):
                recommendation.__dict__['intelligence_results'] = intelligence_results

            logger.info(f"✅ NARRATIVE PLAN COMPLETE: {primary_angle.value} | {writing_guidance.writing_style.value} | {writing_guidance.target_audience.value} | Confidence: {confidence:.2f}")
            return recommendation

        except Exception as e:
            logger.error(f"Error creating narrative plan: {e}")
            return self._create_fallback_recommendation(research_output)

    async def _analyze_content_angles(self, storylines: List[str]) -> Dict[str, Any]:
        """Analyze storylines to identify potential narrative angles and extract entities."""

        try:
            analysis_prompt = f"""
            Analyze these football/soccer storylines and extract key information:

            STORYLINES:
            {chr(10).join(f'{i+1}. {storyline}' for i, storyline in enumerate(storylines))}

            Please analyze and return ONLY a valid JSON response with this exact structure:

            {{
                "angles_detected": ["drama", "performance", "tactical", "analytical", "emotional", "historical"],
                "emotional_intensity": 0.8,
                "dramatic_moments": ["specific dramatic moments from storylines"],
                "tactical_elements": ["tactical aspects mentioned"],
                "human_interest": ["human interest stories"],
                "conflict_elements": ["conflicts or tensions"],
                "themes": ["main themes like comeback, dominance, upset, etc."],
                "entities": {{
                    "players": ["Full Player Name 1", "Full Player Name 2"],
                    "teams": ["Full Team Name 1", "Full Team Name 2"],
                    "coaches": ["Coach Name 1", "Coach Name 2"],
                    "opponents": ["Opponent Player 1", "Opponent Player 2"]
                }}
            }}

            IMPORTANT INSTRUCTIONS:
            - Extract ALL player names mentioned (first name + last name when available)
            - Extract ALL team names mentioned (full official names)
            - Include coaches, managers, and key personnel if mentioned
            - For entities, use the exact names as they appear in the storylines
            - Return ONLY the JSON, no additional text or explanations
            """

            # Add explicit timeout to prevent hanging
            result = await asyncio.wait_for(
                self.llm.ainvoke([HumanMessage(content=analysis_prompt)]),
                timeout=30.0
            )

            analysis = self._parse_json_response(result.content, {})
            entities = analysis.get('entities', {})
            logger.info(f"🏷️ ENTITIES EXTRACTED: {len(entities.get('players', []))} players, {len(entities.get('teams', []))} teams")
            
            return analysis

        except asyncio.TimeoutError:
            logger.warning("⚠️ Content analysis timed out, using fallback")
            return self._create_fallback_analysis(storylines)
        except Exception as e:
            logger.error(f"❌ Content analysis error: {e}")
            return self._create_fallback_analysis(storylines)

    def _select_narrative_angles(self, content_analysis: Dict[str, Any], storylines: List[str]) -> Tuple[NarrativeAngle, Optional[NarrativeAngle]]:
        """Select primary and secondary narrative angles based on content analysis."""
        angles_detected = content_analysis.get("angles_detected", [])

        # Calculate angle scores
        angle_scores = {}
        for angle in NarrativeAngle:
            score = 0.0

            # Base score from content analysis
            if angle.value in angles_detected:
                score += 0.5

            # Add weighted scores from storyline keywords
            for storyline in storylines:
                storyline_lower = storyline.lower()
                for keyword, weights in self.angle_weights.items():
                    if keyword in storyline_lower and angle.value in weights:
                        score += weights[angle.value] * 0.1

            angle_scores[angle] = score

        # Sort by score and select top angles
        sorted_angles = sorted(angle_scores.items(), key=lambda x: x[1], reverse=True)

        primary_angle = sorted_angles[0][0]
        secondary_angle = sorted_angles[1][0] if len(sorted_angles) > 1 and sorted_angles[1][1] > 0.3 else None

        return primary_angle, secondary_angle

    async def _generate_writing_guidance(self, primary_angle: NarrativeAngle, secondary_angle: Optional[NarrativeAngle],
                                       storylines: List[str], content_analysis: Dict[str, Any]) -> WritingGuidance:
        """Generate detailed writing guidance based on narrative angles."""

        try:
            guidance_prompt = f"""
            Create writing guidance for a sports article with these parameters:

            PRIMARY NARRATIVE ANGLE: {primary_angle.value}
            SECONDARY ANGLE: {secondary_angle.value if secondary_angle else "None"}

            CONTENT ANALYSIS:
            Emotional intensity: {content_analysis.get('emotional_intensity', 0.5)}
            Themes: {content_analysis.get('themes', [])}
            Dramatic moments: {content_analysis.get('dramatic_moments', [])}

            STORYLINES:
            {chr(10).join(storylines[:5])}  # Top 5 storylines

            Provide writing guidance as JSON:
            {{
                "writing_style": "dramatic/analytical/balanced/casual/formal/engaging",
                "target_audience": "general_fans/tactical_enthusiasts/club_supporters/casual_readers/expert_analysts",
                "tone_keywords": ["keyword1", "keyword2", "keyword3"],
                "focus_areas": ["area1", "area2", "area3"],
                "content_structure": {{
                    "opening": "approach for opening",
                    "main_body": "structure for main content",
                    "conclusion": "approach for conclusion"
                }}
            }}
            """

            # Add explicit timeout to prevent hanging
            result = await asyncio.wait_for(
                self.llm.ainvoke([HumanMessage(content=guidance_prompt)]),
                timeout=30.0
            )
            guidance_data = self._parse_json_response(result.content, {})

            # Safely handle enum values with validation
            style_value = guidance_data.get("writing_style", "balanced")
            if style_value not in [e.value for e in WritingStyle]:
                style_value = "balanced"

            audience_value = guidance_data.get("target_audience", "general_fans")
            if audience_value not in [e.value for e in TargetAudience]:
                audience_value = "general_fans"

            return WritingGuidance(
                primary_angle=primary_angle,
                secondary_angle=secondary_angle,
                writing_style=WritingStyle(style_value),
                target_audience=TargetAudience(audience_value),
                tone_keywords=guidance_data.get("tone_keywords", ["engaging", "informative"]),
                focus_areas=guidance_data.get("focus_areas", ["key events", "player performances"]),
                content_structure=guidance_data.get("content_structure", {
                    "opening": "strong hook with key result",
                    "main_body": "chronological event flow",
                    "conclusion": "impact and significance"
                })
            )

        except asyncio.TimeoutError:
            logger.warning("Writing guidance timed out, using fallback")
            return self._create_fallback_guidance(primary_angle, secondary_angle)
        except Exception as e:
            logger.error(f"Writing guidance error: {e}")
            return self._create_fallback_guidance(primary_angle, secondary_angle)

    def _create_prioritized_content(self, storylines: List[str], content_analysis: Dict[str, Any]) -> List[ContentPriority]:
        """Create prioritized content list with narrative context."""
        prioritized = []

        for i, storyline in enumerate(storylines):
            # Determine narrative angle for this storyline
            angle = self._determine_storyline_angle(storyline)

            # Calculate emotional weight and audience appeal
            emotional_weight = self._calculate_emotional_weight(storyline, content_analysis)
            audience_appeal = self._calculate_audience_appeal(storyline)
            story_type = self._classify_story_type(storyline)

            prioritized.append(ContentPriority(
                content=storyline,
                priority=i + 1,
                narrative_angle=angle,
                emotional_weight=emotional_weight,
                audience_appeal=audience_appeal,
                story_type=story_type
            ))

        # Re-sort by combined priority score
        prioritized.sort(key=lambda x: (x.emotional_weight + x.audience_appeal) / 2, reverse=True)

        # Update priority rankings
        for i, content in enumerate(prioritized):
            content.priority = i + 1

        return prioritized

    def _create_story_arc(self, prioritized_content: List[ContentPriority], primary_angle: NarrativeAngle) -> Dict[str, str]:
        """Create narrative story arc structure."""
        if not prioritized_content:
            return {"opening": "Match overview", "development": "Key events", "climax": "Decisive moments", "resolution": "Final result"}

        high_priority = [c for c in prioritized_content if c.priority <= 3]
        medium_priority = [c for c in prioritized_content if 3 < c.priority <= 6]

        story_arc = {}

        if primary_angle == NarrativeAngle.DRAMA:
            story_arc = {
                "opening": "Set dramatic tension with stakes and context",
                "development": "Build narrative through key moments",
                "climax": high_priority[0].content if high_priority else "Most dramatic moment",
                "resolution": "Emotional aftermath and significance"
            }
        elif primary_angle == NarrativeAngle.TACTICAL:
            story_arc = {
                "opening": "Tactical setup and team approaches",
                "development": "How tactics played out during match",
                "climax": "Key tactical moment or turning point",
                "resolution": "Tactical lessons and implications"
            }
        elif primary_angle == NarrativeAngle.PERFORMANCE:
            story_arc = {
                "opening": "Key player focus and expectations",
                "development": "Performance highlights throughout match",
                "climax": "Standout individual moment",
                "resolution": "Performance impact on result"
            }
        else:
            story_arc = {
                "opening": "Context and match setup",
                "development": "Chronological key events",
                "climax": high_priority[0].content if high_priority else "Decisive moment",
                "resolution": "Result and implications"
            }

        return story_arc

    def _extract_key_themes(self, storylines: List[str], primary_angle: NarrativeAngle) -> List[str]:
        """Extract key themes based on storylines and narrative angle."""
        themes = []
        storylines_text = " ".join(storylines).lower()

        # Common theme keywords
        theme_keywords = {
            "comeback": ["comeback", "behind", "recover", "turn around"],
            "dominance": ["dominate", "control", "superior", "overwhelm"],
            "upset": ["upset", "shock", "surprise", "unexpected"],
            "rivalry": ["rivalry", "derby", "clash", "battle"],
            "debut": ["debut", "first", "maiden", "initial"],
            "milestone": ["milestone", "record", "achievement", "historic"],
            "redemption": ["redemption", "bounce back", "return", "response"],
            "tactical_battle": ["tactics", "formation", "strategy", "system"]
        }

        for theme, keywords in theme_keywords.items():
            if any(keyword in storylines_text for keyword in keywords):
                themes.append(theme)

        # Add angle-specific themes
        if primary_angle == NarrativeAngle.DRAMA and not themes:
            themes.append("dramatic_finish")
        elif primary_angle == NarrativeAngle.TACTICAL and not themes:
            themes.append("tactical_showcase")
        elif primary_angle == NarrativeAngle.PERFORMANCE and not themes:
            themes.append("individual_brilliance")

        return themes[:4]  # Limit to 4 themes

    def _identify_emotional_elements(self, storylines: List[str]) -> List[str]:
        """Identify emotional elements in storylines."""
        emotional_elements = []
        storylines_text = " ".join(storylines).lower()

        emotional_keywords = {
            "celebration": ["celebrate", "joy", "triumph", "victory"],
            "disappointment": ["disappoint", "frustrate", "miss", "fail"],
            "tension": ["tension", "pressure", "crucial", "decisive"],
            "relief": ["relief", "survive", "escape", "avoid"],
            "pride": ["proud", "honor", "achievement", "accomplish"],
            "heartbreak": ["heartbreak", "devastate", "cruel", "agony"]
        }

        for element, keywords in emotional_keywords.items():
            if any(keyword in storylines_text for keyword in keywords):
                emotional_elements.append(element)

        return emotional_elements

    def _initialize_query_templates(self) -> Dict[str, Dict[str, Any]]:
        """Initialize query templates for different narrative angles - only supported operations."""
        # Supported stats from database.py get_player_stat_sum method
        supported_stats = [
            "goals", "assists", "minutes_played", "shots_on_target", "tackles",
            "interceptions", "passes_completed", "clean_sheets", "saves",
            "yellow_cards", "red_cards", "fouls_committed", "fouls_drawn"
        ]

        return {
            "drama": {
                "intelligence_queries": [
                    {
                        "template": "How many goals does {player} have this season?",
                        "query_type": "1_direct_data_access",
                        "stats": ["goals"],
                        "time_context": "this_season",
                        "entity_type": "player"
                    },
                    {
                        "template": "{player}'s goals in last 10 games",
                        "query_type": "1_direct_data_access",
                        "stats": ["goals"],
                        "time_context": "last_n_games",
                        "entity_type": "player"
                    },
                    {
                        "template": "How many wins does {team} have this season?",
                        "query_type": "1_direct_data_access",
                        "stats": ["wins"],
                        "time_context": "this_season",
                        "entity_type": "team"
                    },
                    {
                        "template": "How many goals does {team} have this season?",
                        "query_type": "1_direct_data_access",
                        "stats": ["goals"],
                        "time_context": "this_season",
                        "entity_type": "team"
                    }
                ],
                "researcher_tasks": [
                    {
                        "task": "Analyze goal timing distribution from events data",
                        "data_source": "events",
                        "analysis": "Find goals scored in last 10 minutes of matches",
                        "entity_type": "both"
                    },
                    {
                        "task": "Identify comeback situations from match events",
                        "data_source": "events + match_info",
                        "analysis": "Detect matches where team was behind then won",
                        "entity_type": "team"
                    },
                    {
                        "task": "Extract decisive moments from events timeline",
                        "data_source": "events",
                        "analysis": "Identify match-changing events (goals, cards, substitutions)",
                        "entity_type": "both"
                    },
                    {
                        "task": "Analyze {team}'s recent form and momentum",
                        "data_source": "match_info + statistics",
                        "analysis": "Track team's recent results and performance trends",
                        "entity_type": "team"
                    }
                ]
            },
            "tactical": {
                "intelligence_queries": [
                    {
                        "template": "How many passes does {player} have this season?",
                        "query_type": "1_direct_data_access",
                        "stats": ["passes_completed"],
                        "time_context": "this_season",
                        "entity_type": "player"
                    },
                    {
                        "template": "How many tackles does {player} have?",
                        "query_type": "1_direct_data_access",
                        "stats": ["tackles"],
                        "time_context": "this_season",
                        "entity_type": "player"
                    },
                    {
                        "template": "How many clean sheets does {team} have this season?",
                        "query_type": "1_direct_data_access",
                        "stats": ["clean_sheets"],
                        "time_context": "this_season",
                        "entity_type": "team"
                    },
                    {
                        "template": "{team}'s defensive record this season",
                        "query_type": "2_statistical_analysis",
                        "stats": ["clean_sheets", "goals_conceded"],
                        "time_context": "this_season",
                        "entity_type": "team"
                    }
                ],
                "researcher_tasks": [
                    {
                        "task": "Analyze formation data from lineups",
                        "data_source": "lineups",
                        "analysis": "Extract formation patterns and tactical setups",
                        "entity_type": "team"
                    },
                    {
                        "task": "Compare tactical statistics between teams",
                        "data_source": "statistics",
                        "analysis": "Analyze possession, passing accuracy, defensive actions",
                        "entity_type": "team"
                    },
                    {
                        "task": "Analyze {team}'s tactical evolution throughout the match",
                        "data_source": "lineups + events",
                        "analysis": "Track formation changes, substitution patterns, tactical adjustments",
                        "entity_type": "team"
                    },
                    {
                        "task": "Evaluate {player}'s tactical role and positioning",
                        "data_source": "lineups + players",
                        "analysis": "Assess positional discipline and tactical contribution",
                        "entity_type": "player"
                    }
                ]
            },
            "performance": {
                "intelligence_queries": [
                    {
                        "template": "{player}'s performance this season",
                        "query_type": "2_statistical_analysis",
                        "stats": ["goals", "assists", "shots_on_target"],
                        "time_context": "this_season",
                        "entity_type": "player"
                    },
                    {
                        "template": "{player}'s goals in last 10 games",
                        "query_type": "1_direct_data_access",
                        "stats": ["goals"],
                        "time_context": "last_n_games",
                        "entity_type": "player"
                    },
                    {
                        "template": "{team}'s performance this season",
                        "query_type": "2_statistical_analysis",
                        "stats": ["wins", "goals", "points"],
                        "time_context": "this_season",
                        "entity_type": "team"
                    },
                    {
                        "template": "How many points does {team} have this season?",
                        "query_type": "1_direct_data_access",
                        "stats": ["points"],
                        "time_context": "this_season",
                        "entity_type": "team"
                    }
                ],
                "researcher_tasks": [
                    {
                        "task": "Analyze individual player performance from players data",
                        "data_source": "players",
                        "analysis": "Extract ratings, key contributions, match impact",
                        "entity_type": "player"
                    },
                    {
                        "task": "Track performance trends over recent matches",
                        "data_source": "players + events",
                        "analysis": "Identify performance patterns and form changes",
                        "entity_type": "player"
                    },
                    {
                        "task": "Evaluate {team}'s overall team performance metrics",
                        "data_source": "statistics + match_info",
                        "analysis": "Assess team efficiency, goal conversion, defensive stability",
                        "entity_type": "team"
                    },
                    {
                        "task": "Compare {team}'s performance against recent opponents",
                        "data_source": "statistics + match_info",
                        "analysis": "Benchmark team performance in context of opposition quality",
                        "entity_type": "team"
                    }
                ]
            },
            "historical": {
                "intelligence_queries": [
                    {
                        "template": "How many career goals does {player} have?",
                        "query_type": "1_direct_data_access",
                        "stats": ["goals"],
                        "time_context": "career",
                        "entity_type": "player"
                    },
                    {
                        "template": "{team}'s historical wins this season vs last season",
                        "query_type": "2_statistical_analysis",
                        "stats": ["wins"],
                        "time_context": "comparative_seasons",
                        "entity_type": "team"
                    }
                ],
                "researcher_tasks": [
                    {
                        "task": "Extract career context from available data",
                        "data_source": "all_available_data",
                        "analysis": "Identify milestone moments and career highlights",
                        "entity_type": "player"
                    },
                    {
                        "task": "Analyze {team}'s historical performance context",
                        "data_source": "match_info + external_context",
                        "analysis": "Identify historical significance and milestone achievements",
                        "entity_type": "team"
                    }
                ]
            },
            "emotional": {
                "intelligence_queries": [],
                "researcher_tasks": [
                    {
                        "task": "Analyze emotional context from match events",
                        "data_source": "events + match_info",
                        "analysis": "Identify emotionally significant moments (celebrations, crucial saves, etc.)",
                        "entity_type": "both"
                    },
                    {
                        "task": "Extract human interest stories from match data",
                        "data_source": "players + events",
                        "analysis": "Find personal achievement moments and milestone celebrations",
                        "entity_type": "player"
                    },
                    {
                        "task": "Capture {team}'s emotional journey in the match",
                        "data_source": "events + match_info",
                        "analysis": "Track team's emotional highs and lows throughout the match",
                        "entity_type": "team"
                    },
                    {
                        "task": "Identify fan and crowd emotional moments",
                        "data_source": "match_info + external_context",
                        "analysis": "Capture supporter reactions and emotional atmosphere",
                        "entity_type": "team"
                    }
                ]
            },
            "analytical": {
                "intelligence_queries": [
                    {
                        "template": "{player}'s goals and assists this season",
                        "query_type": "2_statistical_analysis",
                        "stats": ["goals", "assists"],
                        "time_context": "this_season",
                        "entity_type": "player"
                    },
                    {
                        "template": "Average goals per game for {player}",
                        "query_type": "2_statistical_analysis",
                        "stats": ["goals"],
                        "time_context": "this_season",
                        "entity_type": "player"
                    },
                    {
                        "template": "{team}'s goals scored vs goals conceded this season",
                        "query_type": "2_statistical_analysis",
                        "stats": ["goals", "goals_conceded"],
                        "time_context": "this_season",
                        "entity_type": "team"
                    },
                    {
                        "template": "{team}'s win rate this season",
                        "query_type": "2_statistical_analysis",
                        "stats": ["wins", "matches_played"],
                        "time_context": "this_season",
                        "entity_type": "team"
                    }
                ],
                "researcher_tasks": [
                    {
                        "task": "Perform statistical analysis on player data",
                        "data_source": "players + statistics",
                        "analysis": "Calculate efficiency metrics, contribution ratios, comparative analysis",
                        "entity_type": "player"
                    },
                    {
                        "task": "Analyze {team}'s statistical trends and patterns",
                        "data_source": "statistics + match_info",
                        "analysis": "Identify performance patterns, efficiency metrics, strength/weakness areas",
                        "entity_type": "team"
                    },
                    {
                        "task": "Compare {team} vs opponent statistical profiles",
                        "data_source": "statistics",
                        "analysis": "Detailed statistical comparison between teams",
                        "entity_type": "team"
                    }
                ]
            }
        }

    def _generate_data_recommendations(self, primary_angle: NarrativeAngle, secondary_angle: Optional[NarrativeAngle],
                                     storylines: List[str], research_output: Dict[str, Any], content_analysis: Dict[str, Any]) -> Tuple[List[IntelligenceQuery], List[ResearcherTask]]:
        """Generate intelligence queries and researcher tasks based on narrative angles."""

        intelligence_queries = []
        researcher_tasks = []

        # Extract entities from content analysis (done by LLM)
        entities = self._extract_entities_from_analysis(content_analysis)

        # Generate recommendations for primary angle
        primary_intel, primary_tasks = self._generate_angle_recommendations(primary_angle, entities, priority_base=1)
        intelligence_queries.extend(primary_intel)
        researcher_tasks.extend(primary_tasks)

        # Generate recommendations for secondary angle if present
        if secondary_angle:
            secondary_intel, secondary_tasks = self._generate_angle_recommendations(
                secondary_angle, entities, priority_base=len(intelligence_queries) + len(researcher_tasks) + 1
            )
            intelligence_queries.extend(secondary_intel)
            researcher_tasks.extend(secondary_tasks)

        # Add context-specific recommendations
        context_intel, context_tasks = self._generate_context_recommendations(storylines, entities,
                                                                            priority_base=len(intelligence_queries) + len(researcher_tasks) + 1)
        intelligence_queries.extend(context_intel)
        researcher_tasks.extend(context_tasks)

        # Limit results
        intelligence_queries = intelligence_queries[:5]  # Limit to top 5 intelligence queries
        researcher_tasks = researcher_tasks[:6]  # Limit to top 6 researcher tasks

        return intelligence_queries, researcher_tasks

    async def _execute_intelligence_queries(self, queries: List[IntelligenceQuery]) -> List[IntelligenceResult]:
        """Execute intelligence queries against Sports Intelligence Layer."""
        if not queries:
            return []
        
        # Initialize intelligence executor if not done yet
        if not hasattr(self.intelligence_executor, 'intelligence_layer'):
            await self.intelligence_executor.initialize()
        
        # Execute queries
        results = await self.intelligence_executor.execute_queries(queries)
        
        # Log results summary
        successful = sum(1 for r in results if r.success)
        logger.info(f"📁 INTELLIGENCE RESULTS: {successful}/{len(results)} successful")

        # Log successful results
        for i, result in enumerate(results):
            if result.success:
                summary = result.data.get('summary', 'No summary') if isinstance(result.data, dict) else str(result.data)
                logger.info(f"   Result {i+1}: {summary}")
        
        return results

    def _enhance_storylines_with_intelligence(self, storylines: List[str], intelligence_results: List[IntelligenceResult]) -> List[str]:
        """Enhance storylines with data from intelligence queries."""
        if not intelligence_results:
            return storylines
        
        enhanced_storylines = storylines.copy()
        
        # Process successful intelligence results
        successful_results = [r for r in intelligence_results if r.success and r.data]
        
        for result in successful_results:
            try:
                # Extract useful data from intelligence result
                if isinstance(result.data, dict):
                    summary = result.data.get('summary', '')
                    if summary and len(summary) > 10:  # Only use meaningful summaries
                        # Add intelligence insight as a new storyline
                        enhanced_storylines.append(f"Intelligence data shows: {summary}")
                        
                    # Extract specific data points
                    data_points = result.data.get('data', [])
                    if isinstance(data_points, list) and data_points:
                        for data_point in data_points[:1]:  # Use first data point
                            if isinstance(data_point, dict):
                                # Create storyline from data
                                if 'goals' in data_point:
                                    enhanced_storylines.append(f"Statistical context: {data_point.get('goals', 0)} goals recorded")
                                elif 'wins' in data_point:
                                    enhanced_storylines.append(f"Performance context: {data_point.get('wins', 0)} wins this season")
                                
            except Exception as e:
                continue
        return enhanced_storylines

    def _calculate_enhanced_confidence(self, content_analysis: Dict[str, Any], storylines: List[str], intelligence_results: List[IntelligenceResult]) -> float:
        """Calculate confidence score including intelligence data quality."""
        base_confidence = self._calculate_confidence(content_analysis, storylines)
        
        if not intelligence_results:
            return base_confidence
        
        # Factor in intelligence data quality
        successful_queries = sum(1 for r in intelligence_results if r.success)
        total_queries = len(intelligence_results)
        
        if total_queries > 0:
            intelligence_success_rate = successful_queries / total_queries
            # Boost confidence based on intelligence success
            intelligence_boost = intelligence_success_rate * 0.15  # Up to 15% boost
            
            # Factor in confidence scores from intelligence results
            avg_intelligence_confidence = 0.0
            if successful_queries > 0:
                confidence_scores = [r.confidence_score for r in intelligence_results if r.success and r.confidence_score > 0]
                if confidence_scores:
                    avg_intelligence_confidence = sum(confidence_scores) / len(confidence_scores)
                    intelligence_boost *= avg_intelligence_confidence  # Scale by intelligence confidence

            enhanced_confidence = min(1.0, base_confidence + intelligence_boost)
            return enhanced_confidence
        
        return base_confidence

    def _extract_entities_from_analysis(self, content_analysis: Dict[str, Any]) -> Dict[str, List[str]]:
        """Extract entities from LLM content analysis result."""
        
        # Get entities from LLM analysis
        llm_entities = content_analysis.get('entities', {})
        
        # Convert to our expected format
        entities = {
            "player": llm_entities.get('players', [])[:4],  # Limit to 4 players
            "team": llm_entities.get('teams', [])[:5],      # Limit to 5 teams
            "opponent_player": llm_entities.get('opponents', [])[:3],  # Limit to 3 opponents
            "coaches": llm_entities.get('coaches', [])[:2], # Limit to 2 coaches
            "milestone": []  # Can be extracted from themes if needed
        }
        
        # Clean entities - remove empty strings and duplicates
        for key in entities:
            entities[key] = [entity.strip() for entity in entities[key] if entity and entity.strip()]
            entities[key] = list(dict.fromkeys(entities[key]))  # Remove duplicates while preserving order
        
        return entities

    def _generate_angle_recommendations(self, angle: NarrativeAngle, entities: Dict[str, List[str]],
                                      priority_base: int) -> Tuple[List[IntelligenceQuery], List[ResearcherTask]]:
        """Generate recommendations for a specific narrative angle."""
        intelligence_queries = []
        researcher_tasks = []

        angle_config = self.query_templates.get(angle.value, {})
        intel_templates = angle_config.get("intelligence_queries", [])
        task_templates = angle_config.get("researcher_tasks", [])

        # Generate intelligence queries
        for i, template_config in enumerate(intel_templates):  # Process all templates
            query = self._create_intelligence_query(template_config, entities, priority_base + i)
            if query:
                intelligence_queries.append(query)
            if len(intelligence_queries) >= 3:  # Limit to 3 per angle
                break

        # Generate researcher tasks
        for i, task_config in enumerate(task_templates[:3]):  # Limit to 3 per angle
            task = self._create_researcher_task(task_config, entities, priority_base + len(intel_templates) + i)
            if task:
                researcher_tasks.append(task)

        return intelligence_queries, researcher_tasks

    def _create_intelligence_query(self, template_config: Dict[str, Any], entities: Dict[str, List[str]],
                                 priority: int) -> Optional[IntelligenceQuery]:
        """Create an intelligence query from template configuration."""
        try:
            template = template_config["template"]
            query_type = template_config["query_type"]
            stats = template_config["stats"]
            time_context = template_config.get("time_context", "this_season")
            entity_type = template_config.get("entity_type", "player")

            # Check if we have the required entity type
            if entity_type == "player" and not entities["player"]:
                return None
            elif entity_type == "team" and not entities["team"]:
                return None

            # Fill template with entities
            filled_template = self._fill_query_template(template, entities)
            if not filled_template:
                return None

            # Determine database method
            database_method = self._get_intelligence_database_method(query_type, stats)

            # Determine expected data
            expected_data = self._get_intelligence_expected_data(stats, time_context)

            return IntelligenceQuery(
                query_text=filled_template,
                query_type=query_type,
                expected_data=expected_data,
                priority=priority,
                database_method=database_method,
                supported_stats=stats
            )

        except Exception as e:
            logger.error(f"Error creating intelligence query: {e}")
            return None

    def _create_researcher_task(self, task_config: Dict[str, Any], entities: Dict[str, List[str]],
                              priority: int) -> Optional[ResearcherTask]:
        """Create a researcher task from template configuration."""
        try:
            task_description = task_config["task"]
            data_source = task_config["data_source"]
            analysis_type = task_config["analysis"]

            # Add entity context to task description if relevant
            if entities["player"]:
                task_description = task_description.replace("{player}", entities["player"][0])
            if entities["team"]:
                task_description = task_description.replace("{team}", entities["team"][0])

            expected_output = self._get_researcher_expected_output(analysis_type)

            return ResearcherTask(
                task_description=task_description,
                data_source=data_source,
                analysis_type=analysis_type,
                expected_output=expected_output,
                priority=priority
            )

        except Exception as e:
            logger.error(f"Error creating researcher task: {e}")
            return None

    def _fill_query_template(self, template: str, entities: Dict[str, List[str]]) -> Optional[str]:
        """Fill query template with available entities."""
        try:
            filled_template = template

            # Replace player placeholders
            if "{player}" in template:
                if entities["player"]:
                    filled_template = filled_template.replace("{player}", entities["player"][0])
                else:
                    return None  # Skip if no player available

            # Replace team placeholders
            if "{team}" in template:
                if entities["team"]:
                    filled_template = filled_template.replace("{team}", entities["team"][0])
                else:
                    return None  # Skip if no team available

            return filled_template

        except Exception as e:
            logger.error(f"Error filling query template: {e}")
            return None

    def _get_intelligence_database_method(self, query_type: str, stats: List[str]) -> str:
        """Get appropriate database method for intelligence queries."""
        if query_type == "1_direct_data_access":
            return "get_player_stat_sum()"
        elif query_type == "2_statistical_analysis":
            return "get_multiple_player_stats_concurrent()"
        else:
            return "get_player_stat_sum()"

    def _get_intelligence_expected_data(self, stats: List[str], time_context: str) -> str:
        """Get expected data description for intelligence queries."""
        stats_str = ", ".join(stats)
        return f"{stats_str} data for {time_context}"

    def _get_researcher_expected_output(self, analysis_type: str) -> str:
        """Get expected output description for researcher tasks."""
        output_mapping = {
            "Find goals scored in last 10 minutes of matches": "List of late goals with timing and context",
            "Detect matches where team was behind then won": "Comeback match data with score progressions",
            "Identify match-changing events": "Key events that influenced match outcome",
            "Extract formation patterns and tactical setups": "Formation analysis and tactical insights",
            "Analyze possession, passing accuracy, defensive actions": "Tactical performance metrics",
            "Extract ratings, key contributions, match impact": "Individual performance assessment",
            "Identify performance patterns and form changes": "Performance trend analysis",
            "Identify milestone moments and career highlights": "Career achievement data",
            "Identify emotionally significant moments": "Emotional context and human interest angles",
            "Find personal achievement moments and milestone celebrations": "Personal story elements",
            "Calculate efficiency metrics, contribution ratios, comparative analysis": "Advanced statistical analysis"
        }
        return output_mapping.get(analysis_type, "Analysis results and insights")

    def _generate_context_recommendations(self, storylines: List[str], entities: Dict[str, List[str]],
                                        priority_base: int) -> Tuple[List[IntelligenceQuery], List[ResearcherTask]]:
        """Generate context-specific recommendations based on storyline content."""
        intelligence_queries = []
        researcher_tasks = []

        storylines_text = " ".join(storylines).lower()

        # Derby/Clasico context
        if "derby" in storylines_text or "clasico" in storylines_text:
            if entities["team"]:
                researcher_tasks.append(ResearcherTask(
                    task_description=f"Analyze derby/clasico context for {entities['team'][0]}",
                    data_source="match_info + external_context",
                    analysis_type="Derby significance and historical context",
                    expected_output="Derby history and cultural significance",
                    priority=priority_base
                ))

        # Record/Milestone context
        if "record" in storylines_text or "milestone" in storylines_text:
            if entities["player"]:
                intelligence_queries.append(IntelligenceQuery(
                    query_text=f"How many career goals does {entities['player'][0]} have?",
                    query_type="1_direct_data_access",
                    expected_data="Career goals total",
                    priority=priority_base + 1,
                    database_method="get_player_stat_sum()",
                    supported_stats=["goals"]
                ))

        # Comeback context
        if "comeback" in storylines_text or "behind" in storylines_text:
            researcher_tasks.append(ResearcherTask(
                task_description="Analyze comeback pattern from match events",
                data_source="events + match_info",
                analysis_type="Comeback analysis from match progression",
                expected_output="Comeback timeline and key moments",
                priority=priority_base + 2
            ))

        return intelligence_queries, researcher_tasks

    def _extract_entities_from_storylines(self, storylines: List[str]) -> Dict[str, List[str]]:
        """DEPRECATED: Legacy regex-based entity extraction. Use _extract_entities_from_analysis instead."""
        logger.warning("⚠️ Using deprecated regex-based entity extraction. Consider using LLM-based extraction.")
        
        # Fallback to basic extraction if needed
        entities = {
            "player": [],
            "team": [],
            "opponent_player": [],
            "milestone": []
        }
        
        # Simple fallback - just return empty entities
        # The LLM-based extraction should be used instead
        return entities

    def _extract_placeholders(self, template: str) -> List[str]:
        """Extract placeholders from query template."""
        import re
        placeholders = re.findall(r'\{([^}]+)\}', template)
        return placeholders

    def _get_database_method(self, angle: str, query_types: List[str], focus_stats: List[str]) -> str:
        """Determine appropriate database method based on query characteristics."""
        method_mapping = {
            "drama": "get_historical_stats() + get_comparative_historical_stats()",
            "tactical": "get_multiple_player_stats_concurrent() + tactical_analysis",
            "performance": "get_player_stat_sum() + get_multiple_player_stats_concurrent()",
            "historical": "get_historical_stats() + get_player_historical_context()",
            "emotional": "get_player_historical_context() + context_analysis",
            "analytical": "get_comparative_historical_stats() + statistical_analysis"
        }
        return method_mapping.get(angle, "get_player_stat_sum()")

    def _get_expected_data(self, angle: str, focus_stats: List[str]) -> str:
        """Determine expected data type for the query."""
        data_mapping = {
            "drama": "Clutch performance stats, decisive moments, pressure statistics",
            "tactical": "Formation data, positional stats, tactical metrics",
            "performance": "Goals, assists, ratings, performance trends",
            "historical": "Career milestones, records, historical achievements",
            "emotional": "Personal journey data, context information",
            "analytical": "Advanced metrics, comparative statistics, efficiency data"
        }
        return data_mapping.get(angle, "Statistical data")


    def _extract_storylines(self, research_output: Dict[str, Any]) -> List[str]:
        """Extract storylines from research output."""
        # Try different possible structures
        if "analysis" in research_output and "storylines" in research_output["analysis"]:
            return research_output["analysis"]["storylines"]
        elif "storylines" in research_output:
            return research_output["storylines"]
        elif "narrative_plan" in research_output and "prioritized_storylines" in research_output["narrative_plan"]:
            return [sl.get("content", "") for sl in research_output["narrative_plan"]["prioritized_storylines"]]
        else:
            return []

    def _determine_storyline_angle(self, storyline: str) -> NarrativeAngle:
        """Determine the primary narrative angle for a single storyline."""
        storyline_lower = storyline.lower()

        angle_indicators = {
            NarrativeAngle.DRAMA: ["dramatic", "winner", "last-minute", "comeback", "thriller"],
            NarrativeAngle.TACTICAL: ["tactics", "formation", "strategy", "system", "approach"],
            NarrativeAngle.PERFORMANCE: ["performance", "rating", "statistics", "contribution", "standout"],
            NarrativeAngle.HISTORICAL: ["record", "first", "historic", "milestone", "achievement"],
            NarrativeAngle.EMOTIONAL: ["celebration", "heartbreak", "joy", "devastation", "pride"],
            NarrativeAngle.ANALYTICAL: ["analysis", "statistics", "data", "numbers", "comparison"]
        }

        for angle, indicators in angle_indicators.items():
            if any(indicator in storyline_lower for indicator in indicators):
                return angle

        return NarrativeAngle.ANALYTICAL  # Default

    def _calculate_emotional_weight(self, storyline: str, content_analysis: Dict[str, Any]) -> float:
        """Calculate emotional weight of a storyline."""
        base_emotional_intensity = content_analysis.get("emotional_intensity", 0.5)
        storyline_lower = storyline.lower()

        # Emotional keywords with weights
        emotional_weights = {
            "dramatic": 0.9, "winner": 0.8, "comeback": 0.9, "heartbreak": 0.9,
            "triumph": 0.8, "disaster": 0.8, "miracle": 0.9, "crushing": 0.8,
            "spectacular": 0.7, "brilliant": 0.7, "devastating": 0.8
        }

        emotional_score = base_emotional_intensity
        for keyword, weight in emotional_weights.items():
            if keyword in storyline_lower:
                emotional_score = min(1.0, emotional_score + weight * 0.2)

        return round(emotional_score, 2)

    def _calculate_audience_appeal(self, storyline: str) -> float:
        """Calculate audience appeal of a storyline."""
        storyline_lower = storyline.lower()

        appeal_keywords = {
            "goal": 0.9, "winner": 0.9, "record": 0.8, "first": 0.7,
            "comeback": 0.9, "upset": 0.8, "controversy": 0.7, "debut": 0.6,
            "tactics": 0.5, "statistics": 0.4, "formation": 0.4
        }

        appeal_score = 0.5  # Base score
        for keyword, weight in appeal_keywords.items():
            if keyword in storyline_lower:
                appeal_score = max(appeal_score, weight)

        return round(appeal_score, 2)

    def _classify_story_type(self, storyline: str) -> str:
        """Classify the type of story for a storyline."""
        storyline_lower = storyline.lower()

        if any(word in storyline_lower for word in ["goal", "winner", "decisive", "crucial"]):
            return "match_decisive"
        elif any(word in storyline_lower for word in ["player", "performance", "individual", "standout"]):
            return "player_spotlight"
        elif any(word in storyline_lower for word in ["tactics", "formation", "tactical", "strategy"]):
            return "tactical_insight"
        elif any(word in storyline_lower for word in ["record", "first", "historic", "milestone"]):
            return "historical_context"
        else:
            return "general_analysis"

    def _calculate_confidence(self, content_analysis: Dict[str, Any], storylines: List[str]) -> float:
        """Calculate confidence score for the narrative plan."""
        base_confidence = 0.7

        # Boost confidence based on available data
        if len(storylines) >= 3:
            base_confidence += 0.1
        if content_analysis.get("emotional_intensity", 0) > 0.6:
            base_confidence += 0.1
        if len(content_analysis.get("themes", [])) >= 2:
            base_confidence += 0.1

        return min(1.0, base_confidence)

    def _parse_json_response(self, response_text: str, fallback: Dict[str, Any]) -> Dict[str, Any]:
        """Parse JSON response with fallback and better error handling."""
        try:
            import re
            
            # Try to find JSON content
            json_match = re.search(r'\{.*\}', response_text, re.DOTALL)
            if json_match:
                json_str = json_match.group()
                parsed = json.loads(json_str)
                return parsed
            else:
                return fallback
                
        except json.JSONDecodeError as e:
            return fallback
        except Exception as e:
            return fallback

    def _create_fallback_analysis(self, storylines: List[str]) -> Dict[str, Any]:
        """Create fallback content analysis with basic entity extraction."""
        
        # Basic entity extraction as fallback
        fallback_entities = self._basic_entity_extraction(storylines)
        
        return {
            "angles_detected": ["analytical", "performance"],
            "emotional_intensity": 0.6,
            "dramatic_moments": [],
            "tactical_elements": [],
            "human_interest": [],
            "conflict_elements": [],
            "themes": ["match_analysis"],
            "entities": fallback_entities
        }

    def _basic_entity_extraction(self, storylines: List[str]) -> Dict[str, List[str]]:
        """Basic entity extraction as fallback when LLM fails."""
        entities = {
            "players": [],
            "teams": [],
            "coaches": [],
            "opponents": []
        }
        
        # Common team names to look for
        team_names = [
            "Manchester United", "Manchester City", "Arsenal", "Liverpool", "Chelsea", "Tottenham",
            "Barcelona", "Real Madrid", "Bayern Munich", "PSG", "Juventus", "AC Milan", "Inter Milan",
            "Atletico Madrid", "Borussia Dortmund", "Ajax", "Porto", "Benfica", "Valencia", "Sevilla",
            "Napoli", "Roma", "Lazio", "Atalanta", "West Ham", "Newcastle", "Brighton", "Crystal Palace",
            "Fulham", "Wolves", "Nottingham Forest", "Aston Villa", "Leicester", "Everton", "Burnley",
            "Sheffield United", "Luton", "Bournemouth", "Brentford"
        ]
        
        # Common player names (first names that are likely players)
        player_indicators = [
            "Marcus Rashford", "Bruno Fernandes", "Mohamed Salah", "Erling Haaland", "Kylian Mbappe",
            "Lionel Messi", "Cristiano Ronaldo", "Kevin De Bruyne", "Virgil van Dijk", "Harry Kane",
            "Bukayo Saka", "Gabriel Jesus", "Martin Odegaard", "Declan Rice", "Son Heung-min"
        ]
        
        storylines_text = " ".join(storylines)
        
        # Extract teams
        for team in team_names:
            if team in storylines_text:
                entities["teams"].append(team)
        
        # Extract common player names
        for player in player_indicators:
            if player in storylines_text:
                entities["players"].append(player)
        
        # Simple pattern matching for other player names (First Last format)
        import re
        words = storylines_text.split()
        for i, word in enumerate(words):
            if (len(word) > 2 and word[0].isupper() and 
                i < len(words) - 1 and len(words[i + 1]) > 2 and words[i + 1][0].isupper()):
                potential_name = f"{word} {words[i + 1]}"
                # Skip if it's a team name or common non-name phrase
                if (potential_name not in entities["teams"] and 
                    potential_name not in entities["players"] and
                    not any(skip in potential_name.lower() for skip in ["the", "and", "old", "new", "united", "city"])):
                    entities["players"].append(potential_name)
        
        # Remove duplicates and limit
        for key in entities:
            entities[key] = list(dict.fromkeys(entities[key]))  # Remove duplicates
            entities[key] = entities[key][:4] if key == "players" else entities[key][:5]
        
        return entities

    def _create_fallback_guidance(self, primary_angle: NarrativeAngle, secondary_angle: Optional[NarrativeAngle]) -> WritingGuidance:
        """Create fallback writing guidance."""
        return WritingGuidance(
            primary_angle=primary_angle,
            secondary_angle=secondary_angle,
            writing_style=WritingStyle.BALANCED,
            target_audience=TargetAudience.GENERAL_FANS,
            tone_keywords=["engaging", "informative", "clear"],
            focus_areas=["key events", "match result", "player performances"],
            content_structure={
                "opening": "Match result and context",
                "main_body": "Key events and performances",
                "conclusion": "Significance and implications"
            }
        )

    def _create_fallback_recommendation(self, research_output: Dict[str, Any]) -> NarrativeRecommendation:
        """Create fallback narrative recommendation."""
        storylines = self._extract_storylines(research_output)

        # Create basic prioritized content
        prioritized_content = [
            ContentPriority(
                content=storyline,
                priority=i + 1,
                narrative_angle=NarrativeAngle.ANALYTICAL,
                emotional_weight=0.5,
                audience_appeal=0.6,
                story_type="general_analysis"
            )
            for i, storyline in enumerate(storylines[:5])
        ]

        return NarrativeRecommendation(
            writing_guidance=self._create_fallback_guidance(NarrativeAngle.ANALYTICAL, None),
            prioritized_content=prioritized_content,
            story_arc={
                "opening": "Match context and setup",
                "development": "Key events and moments",
                "climax": "Decisive moments",
                "resolution": "Final result and significance"
            },
            key_themes=["match_analysis", "performance_review"],
            emotional_elements=["competition", "achievement"],
            intelligence_queries=[],
            researcher_tasks=[],
            confidence_score=0.6
        )