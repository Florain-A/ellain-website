from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from passlib.context import CryptContext
from datetime import datetime, timedelta, timezone
import jwt

app = FastAPI(title="Design Studio Secure Gateway")

SECRET_KEY = "DEVELOPMENT_SIGNING_KEY_REPLACE_THIS_BEFORE_DEPLOYING"
ALGORITHM = "HS256"
TOKEN_VALIDITY_WINDOW_MINUTES = 60

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

IN_MEMORY_USER_STORE = {}

class UserAuthenticationModel(BaseModel):
    email: EmailStr
    password: str

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password_match(plain_text: str, hashed_db_text: str) -> bool:
    return pwd_context.verify(plain_text, hashed_db_text)

def generate_signed_session_jwt(subject_payload: str) -> str:
    expiry_time = datetime.now(timezone.utc) + timedelta(minutes=TOKEN_VALIDITY_WINDOW_MINUTES)
    claims_payload = {
        "sub": subject_payload,
        "exp": expiry_time
    }
    return jwt.encode(claims_payload, SECRET_KEY, algorithm=ALGORITHM)

@app.post("/api/auth/signup", status_code=status.HTTP_201_CREATED)
async def process_user_registration(user_payload: UserAuthenticationModel):
    normalized_email = user_payload.email.lower()
    if normalized_email in IN_MEMORY_USER_STORE:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail="An account with this email address already exists."
        )
    IN_MEMORY_USER_STORE[normalized_email] = {
        "email": normalized_email,
        "secure_hash": hash_password(user_payload.password)
    }
    return {"status": "success", "message": "User file initialized successfully"}

@app.post("/api/auth/login")
async def process_user_authentication(user_payload: UserAuthenticationModel):
    normalized_email = user_payload.email.lower()
    user_record = IN_MEMORY_USER_STORE.get(normalized_email)
    if not user_record or not verify_password_match(user_payload.password, user_record["secure_hash"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password credentials provided."
        )
    session_token = generate_signed_session_jwt(subject_payload=normalized_email)
    return {
        "access_token": session_token,
        "token_type": "bearer"
    }
