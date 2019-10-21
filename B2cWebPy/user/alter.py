# encoding: utf-8

from user import user
from flask import request, jsonify, session
from models import *
from exts import db
from datetime import datetime
from sqlalchemy import and_

@user.route('/alter/userAddress/', methods=['POST'])
def alterUserAddress():
    userId = session.get('userId')
    newAddress = request.form.get('newAddress')
    if userId:
        newUser = User.query.filter(User.id == userId).first()
    else:
        return jsonify({'code': 0}) # 用户未登录

    newUser.address = newAddress
    db.session.commit()
    return jsonify({'code': 1})  # 用户未登录

# 前端将商品加入购物车
@user.route('/addProductToCart/', methods=['POST'])
def addProductToCart():
    userId = session.get('userId')
    if userId:
        newUser = User.query.filter(User.id == userId).first()
    else:
        return jsonify({'code': 0}) # 用户未登录

    productId = request.form.get('productId')
    quantity = request.form.get('quantity')
    checked = request.form.get('checked')

    if productId and quantity and checked:
        oldCart = Cart.query.filter(and_(Cart.userId == userId, Cart.productId == productId)).first()
        if oldCart: # 如果用户购物车中已有该商品，则增加数量
            oldCart.quantity = oldCart.quantity + 1
            db.session.commit()
        else:
            newCart = Cart(userId=userId, productId=productId, quantity=quantity, checked=checked, createTime=datetime.now(), updateTime=datetime.now())
            db.session.add(newCart)
            db.session.commit()
        return jsonify({'code': 1})
    return jsonify({'code': -1})

# 增加数量
@user.route('/addQuantity/', methods=['POST'])
def addQuantity():
    userId = session.get('userId')
    cartId = int(request.form.get('cartId'))
    if userId and cartId:
        newUser = User.query.filter(User.id == userId).first()
        newCart = Cart.query.filter(and_(Cart.id == cartId, Cart.userId == userId)).first()
        if newCart and newUser:
            newCart.quantity = newCart.quantity + 1
            db.session.commit()

            orderTotalMoney = 0
            orderTotalQuantity = 0
            isSelectCart = False
            for cart in newUser.myCart:
                if cart.checked:
                    isSelectCart = True
                    orderTotalMoney += cart.quantity * cart.product.price
                    orderTotalQuantity += cart.quantity
            msg = {
                'code': 1,
                'orderTotalMoney': "%.2f" % orderTotalMoney,
                'orderTotalQuantity': orderTotalQuantity,
                'isSelectCart': isSelectCart
            }
            return jsonify(msg)
        else:
            return jsonify({'code': 0})  # 用户未登录
    else:
        return jsonify({'code': 0}) # 用户未登录

# 减少数量
@user.route('/subQuantity/', methods=['POST'])
def subQuantity():
    userId = session.get('userId')
    cartId = int(request.form.get('cartId'))
    if userId and cartId:
        newUser = User.query.filter(User.id == userId).first()
        newCart = Cart.query.filter(and_(Cart.id == cartId, Cart.userId == userId)).first()
        if newCart and newUser:
            if newCart.quantity > 1:
                newCart.quantity = newCart.quantity - 1
                db.session.commit()

                orderTotalMoney = 0
                orderTotalQuantity = 0
                isSelectCart = False
                for cart in newUser.myCart:
                    if cart.checked:
                        isSelectCart = True
                        orderTotalMoney += cart.quantity * cart.product.price
                        orderTotalQuantity += cart.quantity
                msg = {
                    'code': 1,
                    'orderTotalMoney': "%.2f" % orderTotalMoney,
                    'orderTotalQuantity': orderTotalQuantity,
                    'isSelectCart': isSelectCart
                }
                return jsonify(msg)
            else:
                return jsonify({'code': -1})
        else:
            return jsonify({'code': 0})  # 用户未登录
    else:
        return jsonify({'code': 0}) # 用户未登录


# 手动修改某个商品的数量
@user.route('/inputAlterQuantity/', methods=['POST'])
def inputAlterQuantity():
    userId = session.get('userId')
    cartId = int(request.form.get('cartId'))
    quantity = int(request.form.get('quantity'))

    if userId and cartId and quantity:
        newUser = User.query.filter(User.id == userId).first()
        newCart = Cart.query.filter(and_(Cart.id == cartId, Cart.userId == userId)).first()
        if newCart:
            if quantity >= 1:
                newCart.quantity = quantity
                db.session.commit()

                orderTotalMoney = 0
                orderTotalQuantity = 0
                isSelectCart = False
                for cart in newUser.myCart:
                    if cart.checked:
                        isSelectCart = True
                        orderTotalMoney += cart.quantity * cart.product.price
                        orderTotalQuantity += cart.quantity
                msg = {
                    'code': 1,
                    'orderTotalMoney': "%.2f" % orderTotalMoney,
                    'orderTotalQuantity': orderTotalQuantity,
                    'isSelectCart': isSelectCart
                }
                return jsonify(msg)
            else:
                return jsonify({'code': -1})
        else:
            return jsonify({'code': 0})  # 用户未登录
    else:
        return jsonify({'code': 0}) # 用户未登录

# 从购物车移除商品
@user.route('/removeCart/', methods=['POST'])
def removeCart():
    userId = session.get('userId')
    cartId = int(request.form.get('cartId'))
    if userId and cartId:
        newUser = User.query.filter(User.id == userId).first()
        newCart = Cart.query.filter(and_(Cart.id == cartId, Cart.userId == userId)).first()
        if newCart:
            db.session.delete(newCart)
            db.session.commit()

            newUser = User.query.filter(User.id == userId).first()
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
                    'cartTotalPrice': "%.2f" % ((cart.quantity * cart.product.price)),
                }
                cartsInfo.append(cartInfo)
            msg = {
                'code': 1,
                'cartsInfo': cartsInfo,
                'orderTotalMoney': "%.2f" % orderTotalMoney,
                'orderTotalQuantity': orderTotalQuantity,
                'isSelectCart': isSelectCart
            }
            return jsonify(msg)
        else:
            return jsonify({'code': 0})  # 用户未登录
    else:
        return jsonify({'code': 0}) # 用户未登录

# 取消或选择购物车所有商品
@user.route('/selectAllCart/', methods=['POST'])
def selectAllCart():
    userId = session.get('userId')
    checked = int(request.form.get('checked'))
    if userId and (checked == 0 or checked == 1):
        newUser = User.query.filter(User.id == userId).first()
        if newUser:
            for cart in newUser.myCart:
                cart.checked = checked
            db.session.commit()

            orderTotalMoney = 0
            orderTotalQuantity = 0
            isSelectCart = False
            for cart in newUser.myCart:
                if cart.checked:
                    isSelectCart = True
                    orderTotalMoney += cart.quantity * cart.product.price
                    orderTotalQuantity += cart.quantity
            msg = {
                'code': 1,
                'orderTotalMoney': "%.2f" % orderTotalMoney,
                'orderTotalQuantity': orderTotalQuantity,
                'isSelectCart': isSelectCart
            }
            return jsonify(msg)
        else:
            return jsonify({'code': 0})  # 用户未登录
    else:
        return jsonify({'code': 0}) # 用户未登录

# 取消或选择购物车某个商品
@user.route('/selectOneCart/', methods=['POST'])
def selectOneCart():
    userId = session.get('userId')
    checked = int(request.form.get('checked'))
    cartId = int(request.form.get('cartId'))
    if userId and (checked == 0 or checked == 1) and cartId:
        newUser = User.query.filter(User.id == userId).first()
        newCart = Cart.query.filter(and_(Cart.id == cartId, Cart.userId == userId)).first()
        if newCart:
            newCart.checked = checked
            db.session.commit()

            orderTotalMoney = 0
            orderTotalQuantity = 0
            isSelectCart = False
            for cart in newUser.myCart:
                if cart.checked:
                    isSelectCart = True
                    orderTotalMoney += cart.quantity * cart.product.price
                    orderTotalQuantity += cart.quantity
            msg = {
                'code': 1,
                'orderTotalMoney': "%.2f" % orderTotalMoney,
                'orderTotalQuantity': orderTotalQuantity,
                'isSelectCart': isSelectCart
            }
            return jsonify(msg)
        else:
            return jsonify({'code': 0})  # 用户未登录
    else:
        return jsonify({'code': 0}) # 用户未登录

# 移除购物车所有商品
@user.route('/removeAllCart/', methods=['POST'])
def removeAllCart():
    userId = session.get('userId')

    if userId :
        newUser = User.query.filter(User.id == userId).first()
        if newUser:
            for cart in newUser.myCart:
                db.session.delete(cart)
            db.session.commit()
            return jsonify({'code': 1})
        else:
            return jsonify({'code': 0})  # 用户未登录
    else:
        return jsonify({'code': 0}) # 用户未登录

# 确认收货
@user.route('/confirmReceipt/', methods=['POST'])
def confirmReceipt():
    userId = session.get('userId')
    orderId = int(request.form.get('orderId'))
    status = int(request.form.get('status'))

    newOrder = Order.query.filter(and_(Order.id == orderId, Order.userId == userId)).first()

    if newOrder and status == 4:  # 参数正确
        newOrder.status = status
        newOrder.endTime = datetime.now()
        db.session.commit()

        return jsonify({'code': 1})  # 修改成功
    else:
        return jsonify({'code': 0})  # 参数错误