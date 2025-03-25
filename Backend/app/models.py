from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean
from sqlalchemy.sql import func
from .database import Base

class Blog(Base):
    __tablename__ = "blogs"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), index=True)
    content = Column(Text)
    author = Column(String(100))
    category = Column(String(100))
    tags = Column(String(255))
    image_url = Column(String(255)) 
    is_published = Column(Boolean, default=True)
    likes = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

class Comment(Base):
    __tablename__ = "comments"

    id = Column(Integer, primary_key=True, index=True)
    blog_id = Column(Integer, index=True)
    name = Column(String(100))
    email = Column(String(100))
    content = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())