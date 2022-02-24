from sqlalchemy_utils import drop_database

from create_db import DATABASE_PATH, create_db


def delete_db():
    drop_database(DATABASE_PATH)
    print("DELETED DATABASE")


if __name__ == "__main__":
    delete_db()
    create_db()
