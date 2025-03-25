from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# For PythonAnywhere, you'll use MySQL or SQLite
# This example uses SQLite, but you can modify for MySQL
SQLALCHEMY_DATABASE_URL = "sqlite:///./blog.db"
# For MySQL on PythonAnywhere: 
# SQLALCHEMY_DATABASE_URL = "mysql+pymysql://username:password@localhost/dbname"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, 
    connect_args={"check_same_thread": False}  # Only for SQLite
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()