"""
Safety Module for MindSpace.ai

Handles crisis detection and provides appropriate resources.
"""

import re
from typing import Dict, List

# Crisis keywords that trigger safety protocols
CRISIS_KEYWORDS = [
    r"\b(suicide|suicidal|kill myself|end my life|want to die|better off dead)\b",
    r"\b(self.?harm|hurt myself|cut myself|cutting)\b",
    r"\b(overdose|end it all|no reason to live)\b",
    r"\b(plan to die|planning to|how to kill)\b"
]

# Safety resources
SAFETY_RESOURCES = [
    "🆘 National Suicide Prevention Lifeline: 988 (US)",
    "📱 Crisis Text Line: Text HOME to 741741",
    "🌍 International Association for Suicide Prevention: https://www.iasp.info/resources/Crisis_Centres/",
    "💬 Trevor Project (LGBTQ+ Youth): 1-866-488-7386",
    "🤝 SAMHSA National Helpline: 1-800-662-4357"
]

CRISIS_MESSAGE = """I'm really concerned about what you're sharing. Your safety is the top priority, and I care about your wellbeing.

Please know that I'm an AI and not equipped to handle crisis situations, but there are trained professionals available 24/7 who can provide immediate support.

Please reach out to one of these crisis resources right away:

{}

You deserve support, and there are people who want to help. Please don't hesitate to contact them."""

def check_safety_concerns(message: str) -> Dict:
    """
    Check if message contains crisis keywords.
    
    Args:
        message: User's message to check
    
    Returns:
        Dict with is_crisis flag and appropriate message
    """
    message_lower = message.lower()
    
    # Check for crisis keywords
    for pattern in CRISIS_KEYWORDS:
        if re.search(pattern, message_lower, re.IGNORECASE):
            resources_text = "\n".join(SAFETY_RESOURCES)
            return {
                "is_crisis": True,
                "message": CRISIS_MESSAGE.format(resources_text)
            }
    
    return {
        "is_crisis": False,
        "message": ""
    }
