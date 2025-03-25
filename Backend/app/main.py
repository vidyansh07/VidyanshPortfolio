from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from . import models
from .database import engine
from .routes import blog

# Create database tables
models.Base.metadata.create_all(bind=engine)

# Create FastAPI app
app = FastAPI(
    title="Blog Application API",
    description="Backend for Blog Application with admin features",
    version="1.0.0"
)

# CORS Middleware to allow frontend connections
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with your Vercel frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(blog.router, tags=["blogs"])

# Optional: Root endpoint
@app.get("/")
def read_root():
    return {"message": "Welcome to Blog Application API"}