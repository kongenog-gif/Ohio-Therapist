export interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
    emotion?: string;
    intent?: string;
}

export interface ConversationState {
    messages: Message[];
    isLoading: boolean;
    error: string | null;
}

export interface TherapistResponse {
    message: string;
    emotion: string;
    intent: string;
    isCrisis: boolean;
    strategy: string;
}

export interface SafetyAlert {
    triggered: boolean;
    message: string;
    resources: string[];
}
