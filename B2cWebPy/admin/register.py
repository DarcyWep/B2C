# encoding: utf-8

from admin import admin
from models import Admin
from flask import jsonify, request, session, Response
from datetime import datetime
from exts import db

@admin.route('/register/', methods=['POST'])
def register():
    '''
        函数功能：接收注册信息，并检验注册验证码
        函数返回：return jsonify({'code': {flag} })  flag为1则注册完成，为2则验证码错误或超时，为3则邮箱未申请验证码
    '''
    email = request.form.get('email')  # string
    password = request.form.get('password')  # string，密码是否一致在前端进行验证

    newAdmin = Admin(email=email)
    newAdmin.hashPassword(password=password)
    newAdmin.createTime = datetime.now()

    db.session.add(newAdmin)
    db.session.commit()  # 添加新用户
    return jsonify({'code': 1}) # 注册完成