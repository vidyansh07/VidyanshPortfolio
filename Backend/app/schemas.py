from pydantic import BaseModel, ConfigDict
from datetime import datetime
from typing import Optional, List

class BlogBase(BaseModel):
    title: str
    content: str
    author: str
    category: str
    tags: Optional[str] = None
    image_url: Optional[str] = None  # New field for image URL
    is_published: bool = True

class BlogCreate(BlogBase):
    pass

class BlogUpdate(BlogBase):
    pass

class BlogResponse(BlogBase):
    id: int
    likes: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)

class CommentBase(BaseModel):
    name: str
    email: str
    content: str
    blog_id: int

class CommentCreate(CommentBase):
    pass

class CommentResponse(CommentBase):
    id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)