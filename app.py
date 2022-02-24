from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import enum

from create_db import DATABASE_PATH

app = Flask(__name__)

# Database
app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE_PATH
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)

# Enum
class FlagType(enum.Enum):
    delayed = 1
    more_information_required = 2
    out_of_stock = 3


class NotificationType(enum.Enum):
    message = 1
    issue = 2
    new_order = 3


class OrderStatus(enum.Enum):
    new = 1
    processing = 2
    delivery_set = 3
    delivered = 4


class ProductType(enum.Enum):
    standard = 1
    push_order = 2


# Tables
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)


class Team(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False, unique=True)


class Region(db.Model):
    name = db.Column(db.String(80), primary_key=True)


class Practice(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False, unique=True)
    size = db.Column(db.Integer, nullable=False)
    region_name = db.Column(db.String(80), db.ForeignKey(Region.name), nullable=False)


class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, default=datetime.now, nullable=False)
    status = db.Column(db.Enum(OrderStatus), default=OrderStatus.new, nullable=False)
    team_id = db.Column(db.Integer, db.ForeignKey(Team.id), nullable=False)
    practice_id = db.Column(db.Integer, db.ForeignKey(Practice.id), nullable=True)
    assigned_user = db.Column(db.Integer, db.ForeignKey(User.id), nullable=True)
    # destination


class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False, unique=True)
    type = db.Column(db.Enum(ProductType), nullable=False)
    # additonal details


class ProductOnOrder(db.Model):
    order_id = db.Column(db.Integer, db.ForeignKey(Order.id), primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey(Product.id), primary_key=True)
    quantity = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Float, nullable=False)


class Flag(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey(Order.id), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    type = db.Column(db.Enum(FlagType), nullable=False)
    description = db.Column(db.String(255), nullable=False)


class Notification(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.Enum(NotificationType), nullable=False)
    description = db.Column(db.String(50), nullable=False)
    object_id = db.Column(db.Integer, nullable=False)


class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    team_id = db.Column(db.Integer, db.ForeignKey(Team.id), nullable=False)
    text = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now, nullable=False)


class Stock(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey(Product.id), nullable=False)
    current_qty = db.Column(db.Integer, nullable=False)
    target_qty = db.Column(db.Integer, nullable=False)


# Setup
db.create_all()
from views import *

if __name__ == "__main__":
    app.run(debug=True)
