from sqlalchemy.orm import Session
from . import models, schemas

def create_blog(db: Session, blog: schemas.BlogCreate):
    db_blog = models.Blog(**blog.model_dump())
    db.add(db_blog)
    db.commit()
    db.refresh(db_blog)
    return db_blog

def get_blogs(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Blog).offset(skip).limit(limit).all()

def get_blog_by_id(db: Session, blog_id: int):
    return db.query(models.Blog).filter(models.Blog.id == blog_id).first()

def update_blog(db: Session, blog_id: int, blog: schemas.BlogUpdate):
    db_blog = db.query(models.Blog).filter(models.Blog.id == blog_id).first()
    if not db_blog:
        return None
    
    for key, value in blog.model_dump(exclude_unset=True).items():
        setattr(db_blog, key, value)
    
    db.commit()
    db.refresh(db_blog)
    return db_blog

def delete_blog(db: Session, blog_id: int):
    db_blog = db.query(models.Blog).filter(models.Blog.id == blog_id).first()
    if not db_blog:
        return False
    
    db.delete(db_blog)
    db.commit()
    return True

def like_blog(db: Session, blog_id: int):
    db_blog = db.query(models.Blog).filter(models.Blog.id == blog_id).first()
    if not db_blog:
        return None
    
    db_blog.likes += 1
    db.commit()
    db.refresh(db_blog)
    return db_blog

def create_comment(db: Session, comment: schemas.CommentCreate):
    db_comment = models.Comment(**comment.model_dump())
    db.add(db_comment)
    db.commit()
    db.refresh(db_comment)
    return db_comment

def get_comments_for_blog(db: Session, blog_id: int):
    return db.query(models.Comment).filter(models.Comment.blog_id == blog_id).all()