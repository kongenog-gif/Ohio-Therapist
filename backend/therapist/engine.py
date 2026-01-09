"""
MindSpace.ai Therapist Engine

This module implements the core therapist logic using:
- CBT (Cognitive Behavioral Therapy) principles
- Reflective listening techniques
- Emotion detection
- Intent classification
"""

import random
import re
from typing import Dict, List

# Emotion detection patterns
EMOTION_PATTERNS = {
    "anxious": [
        r"\b(worried|anxious|nervous|scared|panic|afraid|fear|terrified)\b",
        r"\b(can't (sleep|breathe)|heart racing|sweating)\b"
    ],
    "depressed": [
        r"\b(sad|depressed|hopeless|empty|numb|worthless|alone)\b",
        r"\b(no point|give up|nothing matters)\b"
    ],
    "angry": [
        r"\b(angry|furious|mad|frustrated|irritated|rage|pissed)\b",
        r"\b(can't stand|hate|fed up)\b"
    ],
    "overwhelmed": [
        r"\b(overwhelmed|stressed|too much|can't cope|drowning)\b",
        r"\b(breaking point|can't handle)\b"
    ],
    "confused": [
        r"\b(confused|lost|don't know|uncertain|unsure)\b",
        r"\b(what to do|which way|unclear)\b"
    ],
    "hopeful": [
        r"\b(hopeful|better|improving|positive|good|optimistic)\b",
        r"\b(getting better|making progress|feeling stronger)\b"
    ],
}

# Intent classification patterns
INTENT_PATTERNS = {
    "seeking_support": [
        r"\b(help|support|talk|listen|need someone|be there)\b"
    ],
    "venting": [
        r"\b(just need to say|get this off my chest|need to vent|let it out)\b"
    ],
    "seeking_advice": [
        r"\b(what should|how do i|advice|suggest|recommend|tell me)\b"
    ],
    "exploring_feelings": [
        r"\b(feel|feeling|emotion|experience|going through)\b"
    ],
    "problem_solving": [
        r"\b(problem|issue|situation|how to handle|deal with)\b"
    ],
}

# CBT-based response templates
CBT_RESPONSES = {
    "anxious": [
        "I hear that you're feeling anxious. That must be really difficult. Can you tell me more about what's been triggering these feelings?",
        "Anxiety can feel overwhelming. What thoughts tend to run through your mind when you're feeling this way?",
        "It sounds like you're dealing with a lot of worry. Have you noticed any patterns in when these anxious feelings arise?",
        "Thank you for sharing that. When you feel anxious, what physical sensations do you notice in your body?"
    ],
    "depressed": [
        "I'm really sorry you're feeling this way. Depression can make everything feel heavy. What has your day-to-day been like recently?",
        "Thank you for sharing that with me. When you're feeling down, what activities or thoughts tend to make it worse or better?",
        "It takes courage to talk about depression. Can you tell me about a moment recently, even a small one, that felt a bit lighter?",
        "I understand how hard this must be. What used to bring you joy before these feelings started?"
    ],
    "angry": [
        "It sounds like you're experiencing some strong anger. That's completely valid. What situation is bringing up these feelings?",
        "Anger often comes when we feel wronged or hurt. Can you help me understand what's behind these feelings?",
        "I can hear the frustration in your words. When did you first start noticing this anger building up?",
        "Your feelings are valid. What would you need to happen for this anger to feel resolved?"
    ],
    "overwhelmed": [
        "Feeling overwhelmed is exhausting. Let's take a moment to break things down. What feels most pressing to you right now?",
        "It sounds like you're carrying a lot. Sometimes when we're overwhelmed, it helps to focus on one thing at a time. What's one thing that's weighing on you?",
        "I understand feeling like it's all too much. Can you tell me about what's contributing to this feeling of being overwhelmed?",
        "That sounds like a heavy load. If you could take just one thing off your plate, what would it be?"
    ],
    "confused": [
        "Feeling confused or uncertain is very common, and it's okay not to have all the answers. What's making you feel most uncertain right now?",
        "Confusion can be uncomfortable. Let's explore this together. What questions are running through your mind?",
        "It's understandable to feel lost sometimes. Can you tell me more about what's making you feel this way?",
        "Not knowing what to do can be frustrating. What options have you been considering?"
    ],
    "hopeful": [
        "It's wonderful to hear some hope in your words. What's been helping you feel more positive?",
        "That's really encouraging. What changes have you noticed in yourself or your situation?",
        "I'm glad to hear things are looking up. What's been contributing to this positive shift?",
        "That's great progress. How does it feel to notice these improvements?"
    ],
    "general": [
        "Thank you for sharing that with me. Can you tell me more about what's been on your mind?",
        "I'm here to listen. What would be most helpful for you to talk about today?",
        "I appreciate you opening up. What's the most important thing you'd like to explore right now?",
        "I hear you. How long have you been feeling this way?",
        "That's important. Can you help me understand more about your experience?"
    ],
}

def detect_emotion(message: str) -> str:
    """Detect primary emotion from user message."""
    message_lower = message.lower()
    
    for emotion, patterns in EMOTION_PATTERNS.items():
        for pattern in patterns:
            if re.search(pattern, message_lower, re.IGNORECASE):
                return emotion
    
    return "general"

def classify_intent(message: str) -> str:
    """Classify user intent from message."""
    message_lower = message.lower()
    
    for intent, patterns in INTENT_PATTERNS.items():
        for pattern in patterns:
            if re.search(pattern, message_lower, re.IGNORECASE):
                return intent
    
    return "exploring_feelings"

def generate_therapist_response(message: str, conversation_history: List[Dict] = None) -> Dict:
    """
    Generate therapist response based on CBT principles and reflective listening.
    
    Args:
        message: User's message
        conversation_history: Previous conversation messages
    
    Returns:
        Dict with message, emotion, intent, is_crisis, and strategy
    """
    emotion = detect_emotion(message)
    intent = classify_intent(message)
    
    # Select appropriate response based on detected emotion
    responses = CBT_RESPONSES.get(emotion, CBT_RESPONSES["general"])
    selected_response = random.choice(responses)
    
    return {
        "message": selected_response,
        "emotion": emotion,
        "intent": intent,
        "is_crisis": False,
        "strategy": "cbt_reflective"
    }

def get_welcome_message() -> str:
    """Return welcome message."""
    return "Hello, I'm MindSpace.ai. I'm here to listen and support you through whatever you're experiencing. This is a safe, judgment-free space. What's on your mind today?"
