"""Security utilities for the Sport Scribe AI backend."""

import re
from typing import Any


def sanitize_log_input(value: Any) -> str:
    """Sanitize input for safe logging by removing potentially harmful characters.

    Args:
        value: Input value to sanitize (will be converted to string)

    Returns:
        Sanitized string safe for logging
    """
    if not isinstance(value, str):
        value = str(value)

    # Remove newlines and carriage returns to prevent log injection
    sanitized = re.sub(r"[\r\n]", "", value)

    # Limit length to prevent log flooding
    if len(sanitized) > 100:
        sanitized = sanitized[:100] + "..."

    return sanitized


def sanitize_multiple_log_inputs(*values: Any) -> tuple[str, ...]:
    """Sanitize multiple inputs for safe logging.

    Args:
        *values: Variable number of values to sanitize

    Returns:
        Tuple of sanitized strings
    """
    return tuple(sanitize_log_input(value) for value in values)
