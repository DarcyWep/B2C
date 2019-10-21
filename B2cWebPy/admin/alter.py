#encoding: utf-8

# Power By Dazedark
# 管理员的密码修改

from flask import jsonify, request, session
from admin import admin
from models import *
from exts import db


@admin.route('/alter/adminPassword/', methods=['POST'])
def adminPassword():
    adminId = session.get('adminId')
    newAdmin = Admin.query.filter(Admin.id == adminId).first()

    oldPassword = request.form.get('oldPassword')
    newPassword = request.form.get('newPassword')

    if newAdmin and oldPassword and newPassword:
        if newAdmin.checkPassword(oldPassword):
            newAdmin.hashPassword(newPassword)
            db.session.commit()

            operate = Operation(time=datetime.now(), ip=request.remote_addr, operate='修改本人密码')
            operate.adminId = newAdmin.id
            db.session.add(operate)
            db.session.commit()  # 将管理员的操作记录下来

            return jsonify({'code': 1})  # 修改成功
        else:
            return jsonify({'code': 2})  # 原密码错误
    else:
        return jsonify({'code': 0}) # 参数错误

@admin.route('/alter/userStatus/', methods=['POST'])
def alterUserStatus():
    adminId = session.get('adminId')
    userId = int(request.form.get('userId'))
    newStatus = int(request.form.get('newStatus'))

    newAdmin = Admin.query.filter(Admin.id == adminId).first()
    user = User.query.filter(User.id == userId).first()

    if newAdmin and user and (newStatus == -1 or newStatus == 1): # 参数正确

        user.status = newStatus
        db.session.commit()

        if newStatus == -1:
            operate = Operation(time=datetime.now(), ip=request.remote_addr, operate='冻结用户ID为{id}的用户'.format(id=userId))
        else:
            operate = Operation(time=datetime.now(), ip=request.remote_addr, operate='激活用户ID为{id}的用户'.format(id=userId))
        operate.adminId = newAdmin.id
        db.session.add(operate)
        db.session.commit()  # 将管理员的操作记录下来

        return jsonify({'code': 1})  # 修改成功
    else:
        return jsonify({'code': 0}) # 参数错误

@admin.route('/alter/userPassword/', methods=['POST'])
def alterUserPassword():
    adminId = session.get('adminId')
    userId = int(request.form.get('userId'))
    newPassword = request.form.get('newPassword')

    newAdmin = Admin.query.filter(Admin.id == adminId).first()
    user = User.query.filter(User.id == userId).first()

    if newAdmin and user and newPassword: # 参数正确
        user.hashPassword(newPassword)
        db.session.commit()

        operate = Operation(time=datetime.now(), ip=request.remote_addr, operate='修改用户ID为{id}的密码'.format(id=userId))
        operate.adminId = newAdmin.id
        db.session.add(operate)
        db.session.commit()  # 将管理员的操作记录下来

        return jsonify({'code': 1})  # 修改成功
    else:
        return jsonify({'code': 0}) # 参数错误

@admin.route('/alter/deliverGoods/', methods=['POST'])
def deliverGoods():
    adminId = session.get('adminId')
    orderId = int(request.form.get('orderId'))
    status = int(request.form.get('status'))

    newAdmin = Admin.query.filter(Admin.id == adminId).first()
    newOrder = Order.query.filter(Order.id == orderId).first()

    if newAdmin and newOrder and status == 3: # 参数正确
        newOrder.status = status
        db.session.commit()

        operate = Operation(time=datetime.now(), ip=request.remote_addr, operate='将ID为{id}的订单打包发货'.format(id=orderId))
        operate.adminId = newAdmin.id
        db.session.add(operate)
        db.session.commit()  # 将管理员的操作记录下来

        return jsonify({'code': 1})  # 修改成功
    else:
        return jsonify({'code': 0}) # 参数错误