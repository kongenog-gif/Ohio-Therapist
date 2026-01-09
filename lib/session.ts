import { TherapistResponse, SafetyAlert } from '@/types';

// Crisis focus check
const CRISIS_KEYWORDS = [
    'suicide', 'kill myself', 'end my life', 'want to die', 'better off dead',
    'self-harm', 'hurt myself', 'cut myself', 'overdose', 'end it all'
];

// Focus detection
const FOCUS_PATTERNS = {
    anxious: ['worried', 'anxious', 'nervous', 'scared', 'panic', 'afraid', 'fear'],
    depressed: ['sad', 'depressed', 'hopeless', 'empty', 'numb', 'worthless', 'alone'],
    angry: ['angry', 'furious', 'mad', 'frustrated', 'irritated', 'rage'],
    overwhelmed: ['overwhelmed', 'stressed', 'too much', 'can\'t cope', 'drowning'],
    confused: ['confused', 'lost', 'don\'t know', 'uncertain', 'unsure'],
    hopeful: ['hopeful', 'better', 'improving', 'positive', 'good'],
};

// Selection helpers
const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

// Modular Response Fragments
const REFLECTIONS = {
    anxious: [
        "It sounds like there's a lot of noise in your mind right now.",
        "I can hear the tension in what you're sharing.",
        "It seems like you're carrying a heavy weight of 'what-ifs' today.",
        "I get the sense that things feel a bit fast and overwhelming for you.",
        "That sounds like a really restless place to be."
    ],
    depressed: [
        "I can sense how heavy and slow things feel right now.",
        "It sounds like you're in a very quiet, perhaps lonely space.",
        "I hear how much energy it's taking just to navigate this day.",
        "It seems like the world feels a bit gray and distant to you lately.",
        "I can tell how draining this has been for you."
    ],
    angry: [
        "I can hear the intensity and the frustration in your voice.",
        "It sounds like a boundary was crossed, and that's incredibly difficult.",
        "I can sense how much this has stirred you up.",
        "It seems like there’s a real sense of unfairness in what happened.",
        "That sounds like a lot of bottled-up pressure."
    ],
    overwhelmed: [
        "It sounds like you're being pulled in a dozen directions at once.",
        "I can hear how much is on your plate, and it’s a lot for one person.",
        "It seems like the noise of everything is becoming very loud.",
        "I get the sense that you don't even know where to start because it's all so much.",
        "That sounds like a real state of 'too muchness'."
    ],
    general: [
        "Thank you for opening up to me about this.",
        "I appreciate you sharing that; it helps me understand where you are.",
        "It sounds like you've been sitting with this for a while.",
        "I can hear how much this matters to you.",
        "Thank you for trusting me with these thoughts."
    ]
};

const VALIDATIONS = [
    "It makes total sense that you'd feel this way given the circumstances.",
    "That is a very human reaction to have.",
    "It’s okay to let yourself feel that; you don’t have to push it away.",
    "I want you to know that your feelings are valid here.",
    "Anyone in your shoes would likely feel similarly.",
    "It's understandable that this is hitting you hard."
];

const INSIGHTS = {
    anxious: [
        "Our minds often try to protect us by over-calculating risks when we're stressed.",
        "Anxiety tends to magnify the 'threat' while minimizing our ability to handle it.",
        "When we're worried, our focus often gets stuck on a future that hasn't happened yet.",
        "Sometimes the physiological feeling of anxiety is just our body trying to tell us it's under pressure."
    ],
    depressed: [
        "When things feel heavy, our perspective can become very narrow and focused on the exhaustion.",
        "Depression often creates a filter that makes it hard to see the small gaps of light.",
        "Sometimes the 'nothing matters' feeling is just the mind's way of trying to shut down and rest.",
        "It's common to feel like this state is permanent, even when it isn't."
    ],
    general: [
        "Slowing down enough to notice these patterns is a big part of the work.",
        "Our thoughts can be very loud, but they aren't always accurate reflections of reality.",
        "Being kind to yourself during these harder moments is often the first step forward.",
        "Growth often happens in these quiet, difficult reflections."
    ]
};

const SUGGESTIONS = {
    anxious: [
        "Let's try a grounding '5-4-3-2-1' pause. Name five things you can see right now.",
        "Try taking one slow, intentional breath—focus entirely on the air moving.",
        "What if we just look at the next ten minutes, rather than the whole day?",
        "If you can, try to plant your feet firmly on the floor and just feel the support there."
    ],
    depressed: [
        "What's one tiny activity—even just moving to a different chair—that feels manageable?",
        "If you could find one very small win from today, what would it be?",
        "Perhaps we could think of one small thing that would make the next hour feel 1% better?",
        "Is there a small piece of comfort, like a warm drink or a soft blanket, nearby?"
    ],
    general: [
        "What if we take a moment just to sit with this before trying to fix it?",
        "If you were speaking to a dear friend in this state, what would you say to them?",
        "What's the one part of this that feels most important to talk about next?",
        "What does your body feel like right now as we talk about this?"
    ]
};

const SAFETY_RESOURCES = [
    "National Helpline: 988 (US)",
    "Crisis Text: Text HOME to 741741",
    "International: https://www.iasp.info/resources/Crisis_Centres/",
];

export function checkSafety(message: string): SafetyAlert {
    const lowerMessage = message.toLowerCase();
    const triggered = CRISIS_KEYWORDS.some(keyword => lowerMessage.includes(keyword));

    if (triggered) {
        return {
            triggered: true,
            message: "I'm deeply concerned by what you're sharing. Your safety is paramount. Please reach out to a support line immediately. There are professionals available 24/7 who can truly help.",
            resources: SAFETY_RESOURCES,
        };
    }

    return { triggered: false, message: '', resources: [] };
}

export function detectEmotion(message: string): string {
    const lowerMessage = message.toLowerCase();
    for (const [emotion, keywords] of Object.entries(FOCUS_PATTERNS)) {
        if (keywords.some(keyword => lowerMessage.includes(keyword))) {
            return emotion;
        }
    }
    return 'general';
}

export function getReply(message: string): TherapistResponse {
    const safety = checkSafety(message);
    if (safety.triggered) {
        return {
            message: safety.message + '\n\nResources:\n' + safety.resources.join('\n'),
            emotion: 'concern',
            intent: 'safety',
            isCrisis: true,
            strategy: 'support',
        };
    }

    const emotion = detectEmotion(message);
    const intent = 'exploring_feelings';

    // Build response modularly to maximize variety
    const reflection = pick(REFLECTIONS[emotion as keyof typeof REFLECTIONS] || REFLECTIONS.general);
    const validation = pick(VALIDATIONS);
    const insight = pick(INSIGHTS[emotion as keyof typeof INSIGHTS] || INSIGHTS.general);
    const suggestion = pick(SUGGESTIONS[emotion as keyof typeof SUGGESTIONS] || SUGGESTIONS.general);

    // Randomly combine items to keep it fresh
    const fullMessage = `${reflection} ${validation}\n\n${insight} ${suggestion}`;

    return {
        message: fullMessage,
        emotion,
        intent,
        isCrisis: false,
        strategy: 'standard_care',
    };
}

export function getWelcomeMessage(): string {
    return "Hello, I'm Ohio Therapy. I'm here to listen and support you through whatever you're experiencing. This is a safe, judgment-free space. What's on your mind today?";
}
