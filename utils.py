from sqlalchemy import func
from datetime import date
from math import floor
from app import *


def get_current_view(request):
    return request.path.split("/")[1]


def get_products_for_order(order_id):
    products_on_order = ProductOnOrder.query.filter_by(order_id=order_id).with_entities(
        ProductOnOrder.product_id, ProductOnOrder.price, ProductOnOrder.quantity
    )
    product_names = dict(Product.query.with_entities(Product.id, Product.name))
    products = [{"id": p[0], "price": p[1], "quantity": p[2]} for p in products_on_order]

    for i in range(len(products)):
        product_id = products[i]["id"]
        products[i]["name"] = product_names[product_id]

    return products


def get_total_items_on_order(orders):
    products_on_order = {order.id: 0 for order in orders}
    for order_number in products_on_order:
        products_on_order[order_number] = ProductOnOrder.query.filter_by(order_id=order_number).count()

    return products_on_order


def calculate_days_elapsed_for_orders(orders):
    now = date.today()
    orders = {order.id: order.created_at for order in orders}
    for order in orders:
        orders[order] = (now - orders[order].date()).days

    return orders


def check_order_has_flag(orders):
    has_flag = {order.id: False for order in orders}
    order_with_flags = set([f[0] for f in Flag.query.with_entities(Flag.order_id)])
    for order_number in order_with_flags:
        has_flag[order_number] = True

    return has_flag


def get_stock_item_names(stock_items):
    products = {i[0]: i[1] for i in Product.query.with_entities(Product.id, Product.name)}

    for stock_item in stock_items:
        name = products[stock_item["product_id"]]
        stock_item["name"] = name

    return stock_items


def get_stock_pending_quantity(stock):
    products_on_orders = {
        i[0]: i[1]
        for i in ProductOnOrder.query.with_entities(
            ProductOnOrder.product_id, func.sum(ProductOnOrder.quantity).label("mySum")
        ).group_by(ProductOnOrder.product_id)
    }
    for item in stock:
        item["pending_qty"] = products_on_orders.get(item["product_id"], 0)
    return stock

def get_assigned_user(orders):
    users = {i[0]: i[1] for i in User.query.with_entities(User.id, User.name)}
    users_on_order = {}
    for order in orders:
        if order.assigned_user:
            name = users[order.assigned_user]
            short_name = ''.join([x[0].upper() for x in name.split(' ')])
            users_on_order[order.id] = [name, short_name]

    return users_on_order
