# encoding: utf-8

from order import order
from flask import request, jsonify, session
from models import *
from exts import db
from datetime import datetime
from sqlalchemy import and_

@order.route('/createOrder/', methods=['POST'])
def createOrder():
    userId = session.get('userId')

    if userId:
        newUser = User.query.filter(User.id == userId).first()
    else:
        return jsonify({'code': 0}) # 用户未登录
    if newUser:
        payment = 0
        for cart in newUser.myCart:
            if cart.checked:
                payment += cart.quantity * cart.product.price

        if payment == 0:
            return jsonify({'code': -1})

        orders = Order.query.all()
        orderLen1 = (len(orders) + 1) % 9999
        orderLen2 = "%04d" % orderLen1  # 生成订单后四位
        newOrder = Order(orderNo=datetime.now().date().strftime('%Y%m%d') + datetime.now().strftime('%H%M') + str(orderLen2),
                         userId=userId, payment=payment, paymentType=1, postage=0, status=2, paymentTime=datetime.now(),
                         createTime=datetime.now(), updateTime=datetime.now())
        db.session.add(newOrder)
        db.session.flush() # 为之后获取newOrder的订单号
        db.session.commit()  # 订单信息入库

        for cart in newUser.myCart:
            if cart.checked:
                newOrderItem = OrderItem(orderNo=newOrder.orderNo, productId=cart.productId, currentPrice=cart.product.price,
                                         quantity=cart.quantity, totalPrice=(cart.quantity*cart.product.price),
                                         createTime=datetime.now(), updateTime=datetime.now())
                db.session.add(newOrderItem)
                db.session.delete(cart)
            db.session.commit()
        return jsonify({'code': 1})
    else:
        return jsonify({'code': 0}) # 用户未登录