from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient, DESCENDING
from bson.errors import InvalidId  # Corrected import
from bson.objectid import ObjectId  # Corrected import
from pydantic import BaseModel, Field
from typing import List, Optional
from fastapi.responses import JSONResponse
from datetime import datetime

class Config:
    json_encoders = {ObjectId: str}

# Initialize FastAPI app
app = FastAPI(title="Portfolio API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Add your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB connection
MONGODB_URL = "mongodb://localhost:27017"
client = MongoClient(MONGODB_URL)
db = client.portfolio_db

from bson import ObjectId
from pydantic import BaseModel, Field
from pydantic.json_schema import JsonSchemaValue


# Custom ObjectId validator
class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v, field=None):  # Add `field` as the third argument
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid ObjectId")
        return ObjectId(v)

    @classmethod
    def __get_pydantic_json_schema__(cls, core_schema, handler):
        # Define a JSON schema representation for ObjectId
        return {
            "type": "string",
            "pattern": "^[a-fA-F0-9]{24}$",
            "example": "507f1f77bcf86cd799439011",
        }


# Example Pydantic model
class ExampleModel(BaseModel):
    id: PyObjectId = Field(...)

    class Config:
        arbitrary_types_allowed = True


# Pydantic models
class ProjectBase(BaseModel):
    title: str
    description: str
    technologies: List[str]
    category: str
    image_url: Optional[str]
    demo_link: Optional[str]
    github_link: Optional[str]


class ProjectDB(ProjectBase):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        json_encoders = {ObjectId: str}
        allow_population_by_field_name = True


class ProjectCreate(ProjectBase):
    pass


class ProjectUpdate(BaseModel):
    title: Optional[str]
    description: Optional[str]
    technologies: Optional[List[str]]
    category: Optional[str]
    image_url: Optional[str]
    demo_link: Optional[str]
    github_link: Optional[str]


class BlogBase(BaseModel):
    title: str
    content: str
    summary: str
    author: str
    tags: List[str]
    image_url: Optional[str]


class BlogDB(BlogBase):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    slug: str

    class Config:
        json_encoders = {ObjectId: str}
        allow_population_by_field_name = True


class BlogCreate(BlogBase):
    pass


class BlogUpdate(BaseModel):
    title: Optional[str]
    content: Optional[str]
    summary: Optional[str]
    tags: Optional[List[str]]
    image_url: Optional[str]


# Project Routes
@app.get("/api/projects/", response_model=List[ProjectDB])
async def get_projects(
    skip: int = 0, limit: int = 10, category: Optional[str] = None, search: Optional[str] = None
):
    query = {}
    if category and category != "all":
        query["category"] = category
    if search:
        query["$or"] = [
            {"title": {"$regex": search, "$options": "i"}},
            {"description": {"$regex": search, "$options": "i"}},
            {"technologies": {"$in": [search]}},
        ]

    projects = list(
        db.projects.find(query).skip(skip).limit(limit)
    )
    return projects


@app.post("/api/projects/", response_model=ProjectDB)
async def create_project(project: ProjectCreate):
    project_dict = project.dict()
    project_dict["created_at"] = datetime.utcnow()
    project_dict["updated_at"] = datetime.utcnow()

    result = db.projects.insert_one(project_dict)
    created_project = db.projects.find_one({"_id": result.inserted_id})
    return created_project


@app.get("/api/projects/{project_id}", response_model=ProjectDB)
async def get_project(project_id: str):
    try:
        project = db.projects.find_one({"_id": ObjectId(project_id)})  # Validate ObjectId
        if not project:
            raise HTTPException(status_code=404, detail="Project not found")
        return project
    except InvalidId:  # Catch InvalidId here
        raise HTTPException(status_code=400, detail="Invalid project ID")


@app.put("/api/projects/{project_id}", response_model=ProjectDB)
async def update_project(project_id: str, project_update: ProjectUpdate):
    try:
        update_dict = {k: v for k, v in project_update.dict(exclude_unset=True).items()}
        update_dict["updated_at"] = datetime.utcnow()

        result = db.projects.update_one({"_id": ObjectId(project_id)}, {"$set": update_dict})
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Project not found")

        updated_project = db.projects.find_one({"_id": ObjectId(project_id)})
        return updated_project
    except InvalidId:
        raise HTTPException(status_code=400, detail="Invalid project ID")


@app.delete("/api/projects/{project_id}")
async def delete_project(project_id: str):
    try:
        result = db.projects.delete_one({"_id": ObjectId(project_id)})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Project not found")

        return JSONResponse(status_code=status.HTTP_200_OK, content={"message": "Project deleted successfully"})
    except InvalidId:
        raise HTTPException(status_code=400, detail="Invalid project ID")


# Blog Routes
@app.get("/api/blogs/", response_model=List[BlogDB])
async def get_blogs(skip: int = 0, limit: int = 10, tag: Optional[str] = None, search: Optional[str] = None):
    query = {}
    if tag:
        query["tags"] = tag
    if search:
        query["$or"] = [
            {"title": {"$regex": search, "$options": "i"}},
            {"content": {"$regex": search, "$options": "i"}},
            {"tags": {"$in": [search]}},
        ]

    blogs = list(
        db.blogs.find(query).skip(skip).limit(limit).sort("created_at", DESCENDING)
    )
    return blogs


@app.post("/api/blogs/", response_model=BlogDB)
async def create_blog(blog: BlogCreate):
    blog_dict = blog.dict()
    blog_dict["created_at"] = datetime.utcnow()
    blog_dict["updated_at"] = datetime.utcnow()
    blog_dict["slug"] = blog.title.lower().replace(" ", "-")

    result = db.blogs.insert_one(blog_dict)
    created_blog = db.blogs.find_one({"_id": result.inserted_id})
    return created_blog


@app.get("/api/blogs/{blog_id}", response_model=BlogDB)
async def get_blog(blog_id: str):
    try:
        blog = db.blogs.find_one({"_id": ObjectId(blog_id)})
        if not blog:
            raise HTTPException(status_code=404, detail="Blog not found")
        return blog
    except InvalidId:
        raise HTTPException(status_code=400, detail="Invalid blog ID")


@app.put("/api/blogs/{blog_id}", response_model=BlogDB)
async def update_blog(blog_id: str, blog_update: BlogUpdate):
    try:
        update_dict = {k: v for k, v in blog_update.dict(exclude_unset=True).items()}
        update_dict["updated_at"] = datetime.utcnow()

        result = db.blogs.update_one({"_id": ObjectId(blog_id)}, {"$set": update_dict})
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Blog not found")

        updated_blog = db.blogs.find_one({"_id": ObjectId(blog_id)})
        return updated_blog
    except InvalidId:
        raise HTTPException(status_code=400, detail="Invalid blog ID")


@app.delete("/api/blogs/{blog_id}")
async def delete_blog(blog_id: str):
    try:
        result = db.blogs.delete_one({"_id": ObjectId(blog_id)})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Blog not found")

        return JSONResponse(status_code=status.HTTP_200_OK, content={"message": "Blog deleted successfully"})
    except InvalidId:
        raise HTTPException(status_code=400, detail="Invalid blog ID")


# Run the application
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
