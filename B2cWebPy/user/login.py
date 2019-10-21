# encoding: utf-8

# Power By Dazedark And PopMa
# 用户的登入与注销

from user import user
from flask import request, jsonify, session
from models import *


@user.route('/login/', methods=['POST'])
def login():
    '''
        函数功能：用户登录
        函数返回：return jsonify({'code': {flag} })  flag为1则登录成功，并设置session且返回username，为2则密码错误，为3则用户不存在或用户名错误
    '''
    email = request.form.get('email')
    password = request.form.get('password')
    oldUser = User.query.filter(User.email == email).first()
    if oldUser:  # 这个账户存在
        if oldUser.checkPassword(password=password):  # 密码正确
            if(oldUser.status == 1):
                session.permanent = True  # 设置session
                session['userId'] = oldUser.id
                return jsonify({'code': 1, 'userEmail': oldUser.email, 'userId': oldUser.id, 'userAddress': oldUser.address }) # 登录成功
            else:
                return jsonify({'code': 4})  # 用户已被冻结
        else:
            return jsonify({'code': 2}) # 密码错误
    else:
        return jsonify({'code': 3}) # 用户不存在或用户名错误


@user.route('/logout/', methods=['POST'])
def logout():
    session.clear()
    return jsonify({'code': 1})
