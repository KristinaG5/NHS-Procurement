import os

from sqlalchemy import create_engine
from sqlalchemy_utils import database_exists, create_database


if os.path.isfile("database.txt"):
    DATABASE_PATH = open("database.txt").read().strip()
else:
    DATABASE_PATH = "postgres://mqprvgkabtlhft:7565c74b19b65d21a20f88842234e87c6609d52b2f4557d18c3848a9be8b055e@ec2-52-17-53-249.eu-west-1.compute.amazonaws.com:5432/d9khoj7p3ihtlf"
    print(DATABASE_PATH)


def create_db():
    engine = create_engine(DATABASE_PATH)
    if not database_exists(engine.url):
        create_database(engine.url)
        print("DATABASE CREATED")
    else:
        print("DATABASE ALREADY EXISTS")


if __name__ == "__main__":
    create_db()
