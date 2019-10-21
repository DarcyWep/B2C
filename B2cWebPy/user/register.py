# encoding: utf-8

from user import user
from flask import jsonify, request, session, Response
from models import *
import random
import string
from sendEmail import sendEmail

@user.route('/register/isHaveThisEmail/', methods=['POST'])
def isHaveThisEmail():
    '''
        函数功能：验证邮箱是否已注册
        函数返回：return jsonify({'code': {flag} })  flag为1则未注册，为2则已注册，为3则是空Email
    '''
    email = request.form.get('email')
    if email:
        user = User.query.filter(User.email == email).first()
        if user:  # 已注册
            return jsonify({'code': 2})
        else:  # 没有注册过
            return jsonify({'code': 1})
    else: # 空邮箱
        return jsonify({'code': 3})

@user.route('/register/sendVerifyCodeOfEmail/', methods=['POST'])
def sendVerifyCodeOfEmail():
    '''
        函数功能：发送验证码
        函数返回：return jsonify({'code': {flag} })  flag为1则发送成功，为2则发送失败
    '''
    email = request.form.get('email') # 从前端获取邮箱号
    verifyCode = ''.join(random.sample(string.digits, 6)) # 生成一个随机的6位数验证码
    oldEmail = EmailVerifyCode.query.filter(EmailVerifyCode.email == str(email)).first() # 从数据库查找该邮箱是不是有之前的验证码而未注册
    # 数据库中的验证码在邮箱注册之后会删除，如果注册邮箱存在数据库中则有可能是因为超时，或者是拿过验证码但不注册的情况
    if oldEmail: # 如果存在该邮箱未超时的话会发送与第一次请求相同的验证码
        if (datetime.now()-oldEmail.createTime).seconds >= 1800: # 验证码已超时，使用新的验证码
            oldEmail.verifyCode = verifyCode
            oldEmail.createTime = datetime.now()
            db.session.commit()
            content = "您正在研书屋网站上注册新用户，验证码为【{code}】。验证码30分钟内有效，请尽快完成注册，如非本人操作，请忽略。".format(code=verifyCode)
            result = sendEmail(str(email), content)
        else:
            content = "您正在研书屋网站上注册新用户，验证码为【{code}】。验证码30分钟内有效，请尽快完成注册，如非本人操作，请忽略。".format(code=oldEmail.verifyCode)
            result = sendEmail(str(email), content)
    else:  # 不存在该邮箱，则添加到数据库
        newEmailVerifyCode = EmailVerifyCode(email=email, verifyCode=verifyCode, createTime=datetime.now())
        db.session.add(newEmailVerifyCode)
        db.session.commit()
        content = "您正在研书屋网站上注册新用户，验证码为【{code}】。验证码30分钟内有效，请尽快完成注册，如非本人操作，请忽略。".format(code=verifyCode)
        result = sendEmail(str(email), content)
    if result:
        print('已经给{email}验证码，等待该用户前来注册'.format(email=email))
        return jsonify({'code': 1 })  # 发送成功
    else:
        return jsonify({'code': 2 })  # 发送失败


@user.route('/register/', methods=['POST'])
def register():
    '''
        函数功能：接收注册信息，并检验注册验证码
        函数返回：return jsonify({'code': {flag} })  flag为1则注册完成，为2则验证码错误或超时，为3则邮箱未申请验证码
    '''
    email = request.form.get('email')  # string
    verifyCode = request.form.get('verifyCode')  # string
    password = request.form.get('password')  # string，密码是否一致在前端进行验证

    oldEmail = EmailVerifyCode.query.filter(EmailVerifyCode.email == email).first()
    user = User.query.filter(User.email == email).first()
    if user:
        return jsonify({'code': 2})  # 用户已存在
    if oldEmail: # 如果该邮箱为申请过验证码，则进行else语句
        if  oldEmail.verifyCode == verifyCode and (datetime.now()-oldEmail.createTime).seconds < 1800: # 验证码正确且不超过30分钟
            db.session.delete(oldEmail)
            db.session.commit()  # 删除验证码表中的相关信息

            newUser = User(email=email, createTime=datetime.now(), status=1)
            newUser.hashPassword(password)
            db.session.add(newUser)
            db.session.commit()  # 添加新用户

            print(email, '注册成功')
            return jsonify({'code': 1}) # 注册完成
        else:
            return jsonify({'code': 2}) # 验证码错误或超时
    else:
        return jsonify({'code': 3}) # 邮箱未申请验证码