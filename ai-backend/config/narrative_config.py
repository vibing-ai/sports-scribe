"""Configuration for Narrative Planner.

This module provides configuration settings for the narrative planner
component, including model parameters, scoring weights, and style preferences.
"""

from typing import Dict, Any


class NarrativeConfig:
    """Configuration class for narrative planner settings."""

    # Model configuration
    DEFAULT_MODEL = "gpt-4o"
    DEFAULT_TEMPERATURE = 0.6
    DEFAULT_MAX_TOKENS = 2000

    # Narrative angle scoring weights
    ANGLE_WEIGHTS = {
        "goal": {"drama": 0.9, "performance": 0.8, "analytical": 0.6},
        "win": {"drama": 0.8, "emotional": 0.9, "performance": 0.7},
        "tactics": {"tactical": 0.9, "analytical": 0.8, "performance": 0.5},
        "comeback": {"drama": 0.95, "emotional": 0.9, "historical": 0.6},
        "record": {"historical": 0.9, "analytical": 0.8, "emotional": 0.7},
        "player": {"performance": 0.9, "analytical": 0.7, "emotional": 0.6},
        "debut": {"emotional": 0.8, "historical": 0.7, "performance": 0.8},
        "controversy": {"drama": 0.9, "analytical": 0.8, "emotional": 0.7},
        "upset": {"drama": 0.9, "emotional": 0.8, "historical": 0.6},
        "rivalry": {"drama": 0.8, "emotional": 0.9, "historical": 0.8}
    }

    # Emotional weight scoring
    EMOTIONAL_KEYWORDS = {
        "dramatic": 0.9,
        "winner": 0.8,
        "comeback": 0.9,
        "heartbreak": 0.9,
        "triumph": 0.8,
        "disaster": 0.8,
        "miracle": 0.9,
        "crushing": 0.8,
        "spectacular": 0.7,
        "brilliant": 0.7,
        "devastating": 0.8,
        "thrilling": 0.8,
        "stunning": 0.7,
        "shocking": 0.8
    }

    # Audience appeal scoring
    APPEAL_KEYWORDS = {
        "goal": 0.9,
        "winner": 0.9,
        "record": 0.8,
        "first": 0.7,
        "comeback": 0.9,
        "upset": 0.8,
        "controversy": 0.7,
        "debut": 0.6,
        "tactics": 0.5,
        "statistics": 0.4,
        "formation": 0.4,
        "rivalry": 0.8,
        "derby": 0.8,
        "historic": 0.8
    }

    # Writing style recommendations by angle
    STYLE_BY_ANGLE = {
        "drama": "dramatic",
        "tactical": "analytical",
        "performance": "engaging",
        "historical": "formal",
        "emotional": "dramatic",
        "analytical": "balanced"
    }

    # Target audience by content type
    AUDIENCE_BY_CONTENT = {
        "tactical": "tactical_enthusiasts",
        "statistics": "expert_analysts",
        "drama": "general_fans",
        "emotional": "general_fans",
        "performance": "general_fans",
        "historical": "club_supporters"
    }

    # Content structure templates
    STRUCTURE_TEMPLATES = {
        "drama": {
            "opening": "Set dramatic tension with stakes and context",
            "development": "Build narrative through key moments",
            "climax": "Highlight the most dramatic moment",
            "resolution": "Emotional aftermath and significance"
        },
        "tactical": {
            "opening": "Tactical setup and team approaches",
            "development": "How tactics played out during match",
            "climax": "Key tactical moment or turning point",
            "resolution": "Tactical lessons and implications"
        },
        "performance": {
            "opening": "Key player focus and expectations",
            "development": "Performance highlights throughout match",
            "climax": "Standout individual moment",
            "resolution": "Performance impact on result"
        },
        "analytical": {
            "opening": "Context and match setup",
            "development": "Chronological key events",
            "climax": "Decisive moment",
            "resolution": "Result and implications"
        },
        "historical": {
            "opening": "Historical context and significance",
            "development": "How history played out in current match",
            "climax": "Historic moment or milestone",
            "resolution": "Place in historical context"
        },
        "emotional": {
            "opening": "Human element and emotional stakes",
            "development": "Emotional journey throughout match",
            "climax": "Peak emotional moment",
            "resolution": "Emotional impact and meaning"
        }
    }

    # Theme identification keywords
    THEME_KEYWORDS = {
        "comeback": ["comeback", "behind", "recover", "turn around", "rally"],
        "dominance": ["dominate", "control", "superior", "overwhelm", "masterclass"],
        "upset": ["upset", "shock", "surprise", "unexpected", "underdog"],
        "rivalry": ["rivalry", "derby", "clash", "battle", "grudge"],
        "debut": ["debut", "first", "maiden", "initial", "new"],
        "milestone": ["milestone", "record", "achievement", "historic", "landmark"],
        "redemption": ["redemption", "bounce back", "return", "response", "answer"],
        "tactical_battle": ["tactics", "formation", "strategy", "system", "chess match"],
        "individual_brilliance": ["brilliant", "masterful", "genius", "inspired", "magical"],
        "team_effort": ["team", "collective", "together", "unity", "squad"]
    }

    # Confidence scoring factors
    CONFIDENCE_FACTORS = {
        "sufficient_storylines": 0.1,  # 3+ storylines
        "high_emotional_intensity": 0.1,  # >0.6 emotional intensity
        "multiple_themes": 0.1,  # 2+ themes identified
        "clear_narrative_angle": 0.1,  # Strong angle indicators
        "dramatic_elements": 0.05,  # Presence of drama
        "base_confidence": 0.7
    }

    @classmethod
    def get_default_config(cls) -> Dict[str, Any]:
        """Get default configuration for narrative planner."""
        return {
            "model": cls.DEFAULT_MODEL,
            "temperature": cls.DEFAULT_TEMPERATURE,
            "max_tokens": cls.DEFAULT_MAX_TOKENS,
            "angle_weights": cls.ANGLE_WEIGHTS,
            "emotional_keywords": cls.EMOTIONAL_KEYWORDS,
            "appeal_keywords": cls.APPEAL_KEYWORDS,
            "style_by_angle": cls.STYLE_BY_ANGLE,
            "audience_by_content": cls.AUDIENCE_BY_CONTENT,
            "structure_templates": cls.STRUCTURE_TEMPLATES,
            "theme_keywords": cls.THEME_KEYWORDS,
            "confidence_factors": cls.CONFIDENCE_FACTORS
        }

    @classmethod
    def get_drama_focused_config(cls) -> Dict[str, Any]:
        """Get configuration optimized for dramatic narratives."""
        config = cls.get_default_config()
        config.update({
            "temperature": 0.7,  # Higher creativity for drama
            "preferred_angles": ["drama", "emotional"],
            "drama_boost": 0.2,  # Boost dramatic elements
            "emotional_weight_multiplier": 1.3
        })
        return config

    @classmethod
    def get_analytical_config(cls) -> Dict[str, Any]:
        """Get configuration optimized for analytical narratives."""
        config = cls.get_default_config()
        config.update({
            "temperature": 0.4,  # Lower temperature for analysis
            "preferred_angles": ["analytical", "tactical", "performance"],
            "analytical_boost": 0.2,
            "emotional_weight_multiplier": 0.8
        })
        return config

    @classmethod
    def get_balanced_config(cls) -> Dict[str, Any]:
        """Get configuration for balanced narrative approach."""
        config = cls.get_default_config()
        config.update({
            "temperature": 0.6,
            "preferred_angles": ["analytical", "drama", "performance"],
            "balance_threshold": 0.3,  # Threshold for selecting secondary angles
            "emotional_weight_multiplier": 1.0
        })
        return config