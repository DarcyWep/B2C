# encoding: utf-8

from admin import admin
from models import *
from flask import jsonify, request, session, Response

@admin.route('/get/adminInfo/', methods=['POST'])
def adminInfo():
    adminId = session.get('adminId')
    newAdmin = Admin.query.filter(Admin.id == adminId).first()

    if newAdmin:  # 如果管理员存在
        msg = {
            'code': 1,
            'id': newAdmin.id,
            'email': newAdmin.email,
            'createTime': str(newAdmin.createTime),
        }
        return jsonify(msg)
    else:
        return jsonify({'code': 0}) #参数错误

@admin.route('/get/adminOperations/', methods=['POST'])
def adminOperations():
    adminId = session.get('adminId')
    page = int(request.form.get('page'))

    newAdmin = Admin.query.filter(Admin.id == adminId).first()
    if newAdmin and page:  # 参数无误
        operations = Operation.query.order_by(Operation.time.desc()).paginate(page=page, per_page=10)

        if operations.pages != 0:
            operationInfos = []
            for operation in operations.items:
                operationInfo = {
                    'id': operation.id,
                    'time': str(operation.time),
                    'adminId': operation.adminId,
                    'adminEmail': operation.admin.email,
                    'ip': operation.ip,
                    'operation': operation.operate
                }
                operationInfos.append(operationInfo)
            msg = {
                'code': 1,
                'currentPage': str(operations.page),
                'allPages': str(operations.pages),
                'isLastPage': not (operations.has_next),
                'operationInfos': operationInfos
            }
            return jsonify(msg)
        else:
            return jsonify({'code': 2}) #未匹配到结果
    else:
        return jsonify({'code': 0}) #参数错误

@admin.route('/get/usersInfo/', methods=['POST'])
def getUsersInfo():
    adminId = session.get('adminId')
    page = int(request.form.get('page'))

    newAdmin = Admin.query.filter(Admin.id == adminId).first()
    if newAdmin and page:  # 参数无误
        users = User.query.paginate(page=page, per_page=10)
        if users.pages != 0:
            userInfos = []
            for user in users.items:
                userInfo = {
                    'id': user.id,
                    'email': str(user.email),
                    'createTime': str(user.createTime),
                    'status': user.status,
                }
                userInfos.append(userInfo)
            msg = {
                'code': 1,
                'currentPage': str(users.page),
                'allPages': str(users.pages),
                'isLastPage': not (users.has_next),
                'userInfos': userInfos
            }
            return jsonify(msg)
        else:
            return jsonify({'code': 2}) # 未匹配到结果
    else:
        return jsonify({'code': 0}) # 参数错误

@admin.route('/get/productsInfo/', methods=['POST'])
def getProductsInfo():
    adminId = session.get('adminId')
    page = int(request.form.get('page'))

    newAdmin = Admin.query.filter(Admin.id == adminId).first()
    if newAdmin and page:  # 参数无误
        products = Product.query.paginate(page=page, per_page=10)
        if products.pages != 0:
            productsInfo = []
            for product in products.items:
                productInfo = {
                    'id': product.id,
                    'name': str(product.name),
                    'mainImg': str(product.mainImg),
                    'price': str(product.price),
                    'stock': str(product.stock),
                    'category': str(product.category),
                    'createTime': str(product.createTime),
                    'updateTime': str(product.updateTime),
                }
                productsInfo.append(productInfo)
            msg = {
                'code': 1,
                'currentPage': str(products.page),
                'allPages': str(products.pages),
                'isLastPage': not (products.has_next),
                'productsInfo': productsInfo
            }
            return jsonify(msg)
        else:
            return jsonify({'code': 2}) # 未匹配到结果
    else:
        return jsonify({'code': 0}) # 参数错误

@admin.route('/get/ordersInfo/', methods=['POST'])
def ordersInfo():
    adminId = session.get('adminId')
    page = int(request.form.get('page'))

    newAdmin = Admin.query.filter(Admin.id == adminId).first()
    if newAdmin and page:  # 参数无误
        orders = Order.query.paginate(page=page, per_page=10)
        if orders.pages != 0:
            orderInfos = []
            for order in orders.items:
                orderInfo = {
                    'id': order.id,
                    'No': order.orderNo,
                    'createTime': str(order.createTime),
                    'totalMoney': "%.2f" % order.payment,
                    'status': order.status,
                    'endTime': str(order.endTime),
                    'userEmail': str(order.user.email)
                }
                orderInfos.append(orderInfo)
            msg = {
                'code': 1,
                'currentPage': str(orders.page),
                'allPages': str(orders.pages),
                'isLastPage': not (orders.has_next),
                'orderInfos': orderInfos
            }
            return jsonify(msg)
        else:
            return jsonify({'code': 2}) # 未匹配到结果
    else:
        return jsonify({'code': 0}) # 参数错误