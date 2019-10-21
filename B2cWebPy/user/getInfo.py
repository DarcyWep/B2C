# encoding: utf-8

# Power By Dazedark
# 用户的登入与注销

from user import user
from flask import request, jsonify, session
from models import *

@user.route('/get/userInfo/', methods=['POST'])
def getUserInfo():
    userId = session.get('userId')
    if userId:
        newUser = User.query.filter(User.id == userId).first()
    else:
        return jsonify({'code': 0}) # 用户未登录
    if newUser:
        userInfo = {
            'id': newUser.id,
            'email': str(newUser.email),
            'createTime': str(newUser.createTime),
            'address': str(newUser.address)
        }
        msg = {
            'code': 1,
            'userInfo': userInfo
        }
        return jsonify(msg)
    else:
        return jsonify({'code': 0}) # 用户不存在

@user.route('/get/userCart/', methods=['POST'])
def getUserCart():
    userId = session.get('userId')
    if userId:
        newUser = User.query.filter(User.id == userId).first()
    else:
        return jsonify({'code': 0}) # 用户未登录
    if newUser:
        cartsInfo = []
        orderTotalMoney = 0
        orderTotalQuantity = 0
        isSelectCart = False
        for cart in newUser.myCart:
            if cart.checked:
                isSelectCart = True
                orderTotalMoney += cart.quantity * cart.product.price
                orderTotalQuantity += cart.quantity
            cartInfo = {
                'cartId': cart.id,
                'cartChecked': cart.checked,
                'productImg': str(cart.product.mainImg),
                'productName': str(cart.product.name),
                'productPrice': "%.2f" % cart.product.price,
                'cartQuantity': cart.quantity,
                'cartTotalPrice': "%.2f" % (cart.quantity * cart.product.price),
            }
            cartsInfo.append(cartInfo)
        msg = {
            'code': 1,
            'userAddress': newUser.address,
            'cartsInfo': cartsInfo,
            'orderTotalMoney': "%.2f" % orderTotalMoney,
            'orderTotalQuantity': orderTotalQuantity,
            'isSelectCart': isSelectCart
        }
        return jsonify(msg)
    else:
        return jsonify({'code': 0}) # 用户不存在