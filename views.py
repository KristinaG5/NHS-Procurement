from app import *
from utils import *

from flask import request, render_template, redirect


# Base
@app.context_processor
def inject_data():
    view = get_current_view(request)
    current_url = request.path.replace("/" + view, "")

    if view == "procurement":
        num_notifications = Notification.query.filter_by(type=NotificationType.issue).count()
    else:
        num_notifications = Notification.query.filter(Notification.type != NotificationType.message).count()

    data = {
        "notifications": Notification.query.all(),
        "num_notifications": num_notifications,
        "num_message_notifications": Notification.query.filter_by(type=NotificationType.message).count(),
        "view": view,
        "current_url": current_url,
    }
    return data


# default redirect
@app.route("/", methods=["GET"])
def index():
    return render_template("view.html")


# Kanban
@app.route("/<view>/", methods=["GET"])
def kanban(view):
    if request.args.get("search"):
        orders = Order.query.filter_by(id=request.args.get("search"))
    elif view == "supplier":
        if request.args.get("order_type") == "4": 
            orders = Order.query.filter(Order.practice_id == None, Order.id == Flag.order_id)
        else:
            orders = Order.query.filter(Order.practice_id == None)
    else:
        if request.args.get("order_type") == "2":
            orders = Order.query.filter(Order.practice_id != None)
        elif request.args.get("order_type") == "3": 
            orders = Order.query.filter(Order.practice_id == None)
        elif request.args.get("order_type") == "4":
            orders = Order.query.filter(Order.id == Flag.order_id)
        else:
            orders = Order.query.all() 

    products_on_order = get_total_items_on_order(orders)
    users_on_order = get_assigned_user(orders)
    days_elapsed = calculate_days_elapsed_for_orders(orders)
    order_has_flag = check_order_has_flag(orders)
    statuses = {
        "new": ["New Orders", "Orders that have just been added"],
        "processing": ["Order Processing", "Orders that are currently being processed but are not yet ready for delivery"],
        "delivery_set": ["Delivery Set", "Orders that are ready for delivery & have a delivery date set"],
        "delivered": ["Delivered", "Orders that have been delivered"],
    }
    flag_types = {
        "delayed": "Delayed",
        "more_information_required": "More information required",
        "out_of_stock": "out of stock",
    }
    users = User.query.all()
    order = None
    products = None
    flags = None
    practice_name = None

    if request.args.get("order"):
        order = Order.query.filter_by(id=request.args.get("order")).one()
        products = get_products_for_order(request.args.get("order"))
        flags = Flag.query.filter_by(order_id=request.args.get("order")).order_by(Flag.created_at)
        if order.practice_id:
            practice_name = Practice.query.filter_by(id=order.practice_id).one().name

    return render_template(
        "kanban.html",
        statuses=statuses,
        flag_types=flag_types,
        orders=orders,
        order_has_flag=order_has_flag,
        products_on_order=products_on_order,
        days_elapsed=days_elapsed,
        order=order,
        products=products,
        flags=flags,
        users=users,
        users_on_order=users_on_order,
        practice_name=practice_name
    )


@app.route("/<view>/status-update", methods=["POST"])
def status_update(view):
    order = Order.query.filter_by(id=request.form["order"]).one()
    order.status = request.form["status"]
    db.session.add(order)
    db.session.commit()
    return redirect(f"/{view}/")


@app.route("/<view>/flag", methods=["POST"])
def create_flag(view):
    flag = Flag(order_id=request.form["order"], type=request.form["type"], description=request.form["text"])
    notification = Notification(
        type=NotificationType.issue,
        description=f"Flag on order {request.form['order']}",
        object_id=request.form["order"],
    )
    db.session.add(flag)
    db.session.add(notification)
    db.session.commit()
    return redirect(f"/{view}/?order={request.form['order']}")


@app.route("/<view>/delete-flag", methods=["POST"])
def delete_flag(view):
    flag = Flag.query.get(request.form["flag"])
    db.session.delete(flag)
    db.session.commit()
    return redirect(f"/{view}/?order={request.form['order']}")


@app.route("/<view>/assign-user", methods=["POST"])
def assign_user(view):
    order = Order.query.filter_by(id=request.form["order"]).one()
    order.assigned_user = request.form["user"]
    db.session.add(order)
    db.session.commit()
    return redirect(f"/{view}/?order={request.form['order']}")


# Chat
@app.route("/<view>/chat/<chat_id>", methods=["GET"])
def chat(view, chat_id):
    team_id = Team.query.filter_by(name=view.capitalize()).with_entities(Team.id).one()[0]
    contact = Team.query.filter_by(id=chat_id).with_entities(Team.name).one()[0]
    messages = Message.query.order_by(Message.created_at).all()
    return render_template("chat.html", messages=messages, team_id=team_id, contact=contact)


@app.route("/<view>/chat/", methods=["GET"])
def chat_home(view):
    chat_id = Team.query.filter(Team.name != view.capitalize()).with_entities(Team.id).one()[0]
    return redirect(f"/{view}/chat/{chat_id}")


@app.route("/<view>/chat", methods=["POST"])
def add_message(view):
    message = Message(team_id=request.form["team_id"], text=request.form["chat_msg"])
    notification = Notification(
        type=NotificationType.message, description="You have recieved a message!", object_id=request.form["team_id"]
    )
    db.session.add(message)
    db.session.add(notification)
    db.session.commit()
    return redirect(f"/{view}/chat")


# Auto-order
@app.route("/<view>/auto-order", methods=["GET"])
def auto_order(view):
    stock_items = [
        {"id": i[0], "product_id": i[1], "current_qty": i[2], "target_qty": i[3]}
        for i in Stock.query.with_entities(Stock.id, Stock.product_id, Stock.current_qty, Stock.target_qty)
    ]
    stock_items = get_stock_item_names(stock_items)
    stock_items = get_stock_pending_quantity(stock_items)
    return render_template("autoOrder.html", stock=stock_items)


@app.route("/<view>/auto-order", methods=["POST"])
def create_orders(view):
    stock = [
        {"product_id": i[0], "current_qty": i[1], "target_qty": i[2]}
        for i in Stock.query.with_entities(Stock.product_id, Stock.current_qty, Stock.target_qty)
    ]
    stock = get_stock_item_names(stock)
    stock = get_stock_pending_quantity(stock)
    team_id = Team.query.filter(Team.name != view.capitalize()).with_entities(Team.id).one()[0]

    order_required = any([item["target_qty"] - item["pending_qty"] - item["current_qty"] > 0 for item in stock])
    order = None
    item_names = []

    if order_required:
        order = Order(team_id=team_id)
        db.session.add(order)
        db.session.commit()

        for item in stock:
            item_qty = item["target_qty"] - item["pending_qty"] - item["current_qty"]
            if item_qty > 0:
                product_on_order = ProductOnOrder(
                    order_id=order.id, product_id=item["product_id"], quantity=item_qty, price=5
                )
                db.session.add(product_on_order)
                item_names.append(item["name"])

        db.session.commit()

        # Create notification
        notification = Notification(
            type=NotificationType.new_order,
            description=f"New order #{order.id}",
            object_id=order.id,
        )
        db.session.add(notification)
        db.session.commit()

    return render_template("autoOrderSummary.html", order=order, item_names=item_names)


@app.route("/<view>/add-stock", methods=["GET"])
def add_stock(view):
    existing_stock_items = [i[0] for i in list(Stock.query.with_entities(Stock.product_id))]
    products = Product.query.filter(Product.id.notin_(existing_stock_items))
    return render_template("addStockItem.html", products=products)


@app.route("/<view>/add-stock", methods=["POST"])
def create_stock(view):
    stock = Stock(
        product_id=request.form["good"], current_qty=request.form["quantity"], target_qty=request.form["target"]
    )
    db.session.add(stock)
    db.session.commit()
    return redirect(f"/{view}/auto-order")


@app.route("/<view>/delete-stock", methods=["POST"])
def delete_stock(view):
    stock = Stock.query.get(request.form["stock"])
    db.session.delete(stock)
    db.session.commit()
    return redirect(f"/{view}/auto-order")


# Push order
@app.route("/<view>/pushorder", methods=["GET"])
def push_order(view):
    regions = Region.query.all()
    products = Product.query.filter_by(type=ProductType.push_order)
    return render_template("pushOrder.html", regions=regions, products=products)


@app.route("/<view>/pushorder/breakdown", methods=["POST"])
def push_order_breakdown(view):
    region = request.form["region"]
    practices = [
        {"id": i[0], "name": i[1], "size": i[2]}
        for i in Practice.query.filter_by(region_name=region).with_entities(Practice.id, Practice.name, Practice.size)
    ]
    return render_template(
        "pushOrderBreakdown.html",
        good=request.form["good"],
        quantity=request.form["quantity"],
        region=region,
        practices=practices,
    )


@app.route("/<view>/pushorder/summary", methods=["POST"])
def push_order_summary(view):
    data = request.form.copy()
    good = data.pop("good")
    quantity = data.pop("quantity")
    region = data.pop("region")

    all_practices = {i[0]: i[1] for i in Practice.query.with_entities(Practice.id, Practice.name)}
    practices = [{"id": key, "name": all_practices[int(key)], "value": value} for key, value in data.items()]

    return render_template("pushOrderSummary.html", good=good, quantity=quantity, region=region, practices=practices)


@app.route("/<view>/pushorder/submit", methods=["POST"])
def push_order_submit(view):
    product_name = request.form["good"]
    team_id = Team.query.filter(Team.name != view.capitalize()).with_entities(Team.id).one()[0]
    product_id = Product.query.filter(Product.name == product_name).with_entities(Product.id).one()[0]

    data = request.form.copy()
    good = data.pop("good")
    quantity = data.pop("quantity")
    region = data.pop("region")
    create_another = data.pop("create_another", False)

    for key, value in data.items():
        order = Order(status=OrderStatus.new, team_id=team_id, practice_id=key)
        db.session.add(order)
        db.session.commit()
        product_on_order = ProductOnOrder(order_id=order.id, product_id=product_id, quantity=value, price=5)
        db.session.add(product_on_order)
        db.session.commit()

    if create_another:
        return redirect(f"/{view}/pushorder")
    else:
        return redirect(f"/{view}/")


# Seed
@app.route("/seed", methods=["GET"])
def seed():
    teams = ["Procurement", "Supplier"]
    regions = ["Antrim", "Armagh", "Down", "Fermanagh", "Derry/Londonderry", "Tyrone"]
    practices = ["Abc hospital", "General hospital"]
    products = ["Spoon", "Syringe"]
    push_ordered_products = ["Face Mask", "Gloves"]
    users = ["Kristina Geddis", "Ben Andrew", "Samuel Philip", "Conor Brown"]

    for user_name in users:
        user = User(name=user_name)
        db.session.add(user)
        db.session.commit()

    for team_name in teams:
        team = Team(name=team_name)
        db.session.add(team)
        db.session.commit()

    for region_name in regions:
        region = Region(name=region_name)
        db.session.add(region)
        db.session.commit()

    for practice_name in practices:
        practice = Practice(name=practice_name, size=100, region_name=regions[0])
        db.session.add(practice)
        db.session.commit()

    for product_name in push_ordered_products:
        product = Product(name=product_name, type=ProductType.push_order)
        db.session.add(product)
        db.session.commit()

    for product_name in products:
        product = Product(name=product_name, type=ProductType.standard)
        db.session.add(product)
        db.session.commit()

    order = Order(status=OrderStatus.new, team_id=2)
    db.session.add(order)
    db.session.commit()

    product_on_order = ProductOnOrder(order_id=order.id, product_id=product.id, price=33.50, quantity=5)
    db.session.add(product_on_order)
    db.session.commit()

    msg = Message(team_id=1, text="Hello")
    db.session.add(msg)
    db.session.commit()

    return redirect("/")
