from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from .. import crud, schemas
from ..database import get_db

router = APIRouter()

@router.post("/blogs/", response_model=schemas.BlogResponse)
def create_blog(blog: schemas.BlogCreate, db: Session = Depends(get_db)):
    return crud.create_blog(db=db, blog=blog)

@router.get("/blogs/", response_model=List[schemas.BlogResponse])
def read_blogs(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    blogs = crud.get_blogs(db, skip=skip, limit=limit)
    return blogs

@router.get("/blogs/{blog_id}", response_model=schemas.BlogResponse)
def read_blog(blog_id: int, db: Session = Depends(get_db)):
    db_blog = crud.get_blog_by_id(db, blog_id=blog_id)
    if db_blog is None:
        raise HTTPException(status_code=404, detail="Blog not found")
    return db_blog

@router.put("/blogs/{blog_id}", response_model=schemas.BlogResponse)
def update_blog(blog_id: int, blog: schemas.BlogUpdate, db: Session = Depends(get_db)):
    db_blog = crud.update_blog(db, blog_id=blog_id, blog=blog)
    if db_blog is None:
        raise HTTPException(status_code=404, detail="Blog not found")
    return db_blog

@router.delete("/blogs/{blog_id}")
def delete_blog(blog_id: int, db: Session = Depends(get_db)):
    success = crud.delete_blog(db, blog_id=blog_id)
    if not success:
        raise HTTPException(status_code=404, detail="Blog not found")
    return {"detail": "Blog deleted successfully"}

@router.post("/blogs/{blog_id}/like")
def like_blog(blog_id: int, db: Session = Depends(get_db)):
    db_blog = crud.like_blog(db, blog_id=blog_id)
    if db_blog is None:
        raise HTTPException(status_code=404, detail="Blog not found")
    return {"likes": db_blog.likes}

@router.post("/comments/", response_model=schemas.CommentResponse)
def create_comment(comment: schemas.CommentCreate, db: Session = Depends(get_db)):
    return crud.create_comment(db=db, comment=comment)

@router.get("/blogs/{blog_id}/comments", response_model=List[schemas.CommentResponse])
def read_blog_comments(blog_id: int, db: Session = Depends(get_db)):
    return crud.get_comments_for_blog(db, blog_id=blog_id)