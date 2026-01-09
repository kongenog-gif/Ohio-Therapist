from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from therapist.engine import generate_therapist_response, get_welcome_message
from therapist.safety import check_safety_concerns

app = FastAPI(
    title="MindSpace.ai API",
    description="Therapist chatbot API with CBT + Reflective Listening",
    version="1.0.0"
)

# CORS configuration for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatMessage(BaseModel):
    message: str
    conversation_history: list[dict] = []

class ChatResponse(BaseModel):
    message: str
    emotion: str
    intent: str
    is_crisis: bool
    strategy: str

@app.get("/")
async def root():
    return {
        "name": "MindSpace.ai API",
        "version": "1.0.0",
        "status": "online"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

@app.get("/welcome")
async def welcome():
    return {"message": get_welcome_message()}

@app.post("/chat", response_model=ChatResponse)
async def chat(chat_message: ChatMessage):
    """
    Process user message and return therapist response.
    Includes emotion detection, intent classification, and safety checks.
    """
    # Check for safety concerns first
    safety_result = check_safety_concerns(chat_message.message)
    
    if safety_result["is_crisis"]:
        return ChatResponse(
            message=safety_result["message"],
            emotion="crisis",
            intent="crisis",
            is_crisis=True,
            strategy="safety_protocol"
        )
    
    # Generate normal therapist response
    response = generate_therapist_response(
        chat_message.message,
        chat_message.conversation_history
    )
    
    return ChatResponse(**response)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
