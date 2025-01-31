import firebase_admin
from firebase_admin import credentials, firestore
from typing import List, Optional
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, EmailStr
from passlib.context import CryptContext
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Firebase Admin SDK
try:
    cred = credentials.Certificate(r"C:\Users\user\Documents\JSON\service_account.json")
    firebase_admin.initialize_app(cred)
    db = firestore.client()
    print("Firebase initialized successfully!")
except Exception as e:
    raise HTTPException(status_code=500, detail=f"Failed to initialize Firebase: {e}")

# Single User Model
class UserModel(BaseModel):
    username: EmailStr
    password: Optional[str] = None  # Make password optional
    FirstName: str
    LastName: str

    # class Config:
    #     orm_mode = True
class LoginRequest(BaseModel):
    username: EmailStr
    password: str

# API Endpoints
@app.get("/users", response_model=List[UserModel])
async def get_users():
    try:
        user_docs = db.collection('Users').stream()
        users = [UserModel(**doc.to_dict()) for doc in user_docs]

        # Correctly exclude passwords before returning
        return [UserModel(**user.model_dump(exclude={"password"})) for user in users]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching users: {e}")

@app.get("/userById/{id}", response_model=UserModel)
async def get_user_by_id(id: str):
    try:
        user_doc = db.collection('Users').document(id).get()
        if not user_doc.exists:
            raise HTTPException(status_code=404, detail="User not found")
        
        user_data = user_doc.to_dict()
        
        # Exclude password field from the response
        user_data_without_password = {}
        for key, value in user_data.items():
            if key != "password":
                user_data_without_password[key] = value
        
        return UserModel(**user_data_without_password)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching user: {e}")

@app.post("/createUser/")
async def create_user(user: UserModel):
    try:
        # Check if user already exists
        if db.collection('Users').document(user.username).get().exists:
            raise HTTPException(status_code=400, detail="User already exists")

        # Hash the password
        hashed_pw = pwd_context.hash(user.password)

        # Create the user document in Firestore
        user_data = user.model_dump(exclude={"password"})  # Exclude password from being saved as plain text
        user_data["password"] = hashed_pw  # Store the hashed password

        db.collection('Users').document(user.username).set(user_data)
        return {"message": "User created successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating user: {e}")

@app.put("/updateUser/{id}")
async def update_user(id: str, user: UserModel):
    try:
        user_ref = db.collection('Users').document(id)
        if not user_ref.get().exists:
            raise HTTPException(status_code=404, detail="User not found")

        # Exclude 'password' and 'username' (email) from updates
        update_data = user.model_dump(exclude_unset=True, exclude={"password", "username"})

        # Update Firestore document without modifying the password and username
        user_ref.update(update_data)

        return {"message": "User updated successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error updating user: {e}")

@app.delete("/deleteUser/{id}")
async def delete_user(id: str):
    try:
        user_ref = db.collection('Users').document(id)
        if not user_ref.get().exists:
            raise HTTPException(status_code=404, detail="User not found")
        user_ref.delete()
        return {"message": f"User {id} deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error deleting user: {e}")

@app.post("/login/")
async def login_user(login_data: LoginRequest):
    try:
        user_doc = db.collection('Users').document(login_data.username).get()

        # Check if user exists
        if not user_doc.exists:
            raise HTTPException(status_code=401, detail="Invalid credentials")

        user_data = user_doc.to_dict()

        # Verify the password
        if not pwd_context.verify(login_data.password, user_data["password"]):
            raise HTTPException(status_code=401, detail="Invalid credentials")

        return {"message": "Login successful", "user": {"username": login_data.username}}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Login error: {e}")