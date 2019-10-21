# encoding: utf-8

from order import order
from flask import request, jsonify, session
from models import *
from exts import db
from datetime import datetime
from sqlalchemy import and_

@order.route('/getOrder/', methods=['POST'])
def getOrder():
    userId = session.get('userId')

    if userId:
        newUser = User.query.filter(User.id == userId).first()
    else:
        return jsonify({'code': 0})  # 用户未登录
    if newUser:
        isHaveFinishOrder = False
        isHaveNoFinishOrder = False
        finishOrders = []
        notFinishOrders = []
        for order in newUser.myOrder:
            orderInfo = {
                'id': order.id,
                'No': order.orderNo,
                'createTime': str(order.createTime),
                'totalPrice': "%.2f" % order.payment,
                'status': order.status,
                'endTime': str(order.endTime)
            }
            if order.status == 4:
                isHaveFinishOrder = True
                finishOrders.append(orderInfo)
            elif order.status == 2 or order.status == 3:
                isHaveNoFinishOrder = True
                notFinishOrders .append(orderInfo)
        msg = {
            'code': 1,
            'isHaveFinishOrder': isHaveFinishOrder,
            'isHaveNoFinishOrder': isHaveNoFinishOrder,
            'finishOrders': finishOrders,
            'notFinishOrders': notFinishOrders
        }
        return jsonify(msg)
    else:
        return jsonify({'code': 0})  # 用户未登录