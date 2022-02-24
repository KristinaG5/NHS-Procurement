# CSC3045Team5

## Setup
1. Install [Postgres](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads)
2. Install [Python3](https://www.python.org/downloads/windows/) (version 3.8 or earlier)
3. Run `pip install -r requirements.txt` from terminal in this directory
4. Create a file called `database.txt` in the root of the project with the database url `postgresql://postgres:password@localhost:5432/mydatabase` (replace password with your postgres password)
5. Run `python create_db.py` to create the database 
6. Run `python app.py` to start the web app and go to [127.0.0.1:5000/](http://127.0.0.1:5000/)
