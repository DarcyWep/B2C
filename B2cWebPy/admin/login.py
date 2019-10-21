# encoding: utf-8

from admin import admin
from models import Admin, Operation
from exts import db
from datetime import datetime
from flask import jsonify, request, session, Response

@admin.route('/login/', methods=['POST'])
def login():
    email = request.form.get('email')
    password = request.form.get('password')

    if email and password: # 所有的数据不为空
        newAdmin = Admin.query.filter(Admin.email == email).first()
        if newAdmin and newAdmin.checkPassword(password=password): #用户存在且密码正确
            session.permanent = True  # 设置session
            session['adminId'] = newAdmin.id

            operate = Operation(time=datetime.now(), ip=request.remote_addr, operate='登录')
            operate.adminId = newAdmin.id
            db.session.add(operate)
            db.session.commit() # 将管理员的操作记录下来

            msg = {
                'code': 1,
                'id': newAdmin.id,
                'email': newAdmin.email,
                'createTime': str(newAdmin.createTime)
            }
            return jsonify(msg)
        else:
            return jsonify({'code': 2}) #用户名或密码错误
    else:
        return jsonify({'code': 0}) #参数错误