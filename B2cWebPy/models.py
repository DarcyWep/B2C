# encoding: utf-8

# Power By Dazedark
# 数据库模型
# 备注：模型名字首字母全部采用大写,数据库名采用下划线连接，其余变量采用首字母大写连接

from exts import db
from datetime import datetime
from werkzeug.security import check_password_hash, generate_password_hash

class Product(db.Model):  # 商品模型
    __tablename__ = 'products'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True, index=True)
    name = db.Column(db.String(60), nullable=False)
    mainImg = db.Column(db.String(100), nullable=True)
    price = db.Column(db.Float, nullable=False)
    stock = db.Column(db.Integer, nullable=False)
    category = db.Column(db.String(20), nullable=False) # 类别
    createTime = db.Column(db.DateTime, nullable=False)
    updateTime = db.Column(db.DateTime, nullable=True)

class User(db.Model):   # 用户模型
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True, index=True)
    email = db.Column(db.String(50), nullable=False)
    createTime = db.Column(db.DateTime, nullable=False)
    address = db.Column(db.String(100), nullable=True)
    status = db.Column(db.Integer, nullable=False)  # 0-冻结 1-正常
    passwordHash = db.Column(db.String(128), nullable=False)

    def hashPassword(self, password):
        self.passwordHash = generate_password_hash(password)

    def checkPassword(self, password):
        return check_password_hash(self.passwordHash, password)

class Cart(db.Model):   # 购物车模型
    __tablename__ = 'carts'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True, index=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'))
    productId = db.Column(db.Integer, db.ForeignKey('products.id'))
    quantity = db.Column(db.Integer, nullable=False)
    checked = db.Column(db.Integer, nullable=False) # 是否选择 1-勾选 0-未勾选
    createTime = db.Column(db.DateTime, nullable=False)
    updateTime = db.Column(db.DateTime, nullable=True)

    user = db.relationship('User', backref=db.backref('myCart'))
    product = db.relationship('Product', backref=db.backref('products'))

class Order(db.Model):  # 订单模型
    __tablename__ = 'orders'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True, index=True)
    orderNo = db.Column(db.String(20), unique=True, nullable=False, index=True) # 订单号
    userId = db.Column(db.Integer, db.ForeignKey('users.id'))
    payment = db.Column(db.Float, nullable=False)
    paymentType = db.Column(db.Integer, nullable=False) # 1-在线支付 2-货到付款
    postage = db.Column(db.Float, nullable=False) # 运费
    status = db.Column(db.Integer, nullable=False)  # 0-已取消 1-未付款 2-已付款 3-已发货 4-交易完成 5-交易关闭
    paymentTime = db.Column(db.DateTime, nullable=True)
    sendTime = db.Column(db.DateTime, nullable=True)
    endTime = db.Column(db.DateTime, nullable=True)
    closeTime = db.Column(db.DateTime, nullable=True)
    createTime = db.Column(db.DateTime, nullable=True)
    updateTime = db.Column(db.DateTime, nullable=True)

    user = db.relationship('User', backref=db.backref('myOrder'))

class OrderItem(db.Model):  # 订单商品详情模型
    __tablename__ = 'orderItems'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True, index=True)
    orderNo = db.Column(db.String(20), db.ForeignKey('orders.orderNo'), index=True)
    productId = db.Column(db.Integer, db.ForeignKey('products.id'))
    currentPrice = db.Column(db.Float, nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    totalPrice = db.Column(db.Float, nullable=False)
    createTime = db.Column(db.DateTime, nullable=True)
    updateTime = db.Column(db.DateTime, nullable=True)

    order = db.relationship('Order', backref=db.backref('orderItems'))


class Admin(db.Model):   # 用户模型
    __tablename__ = 'admins'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True, index=True)
    email = db.Column(db.String(50), nullable=False)
    createTime = db.Column(db.DateTime, nullable=False)
    password = db.Column(db.String(128), nullable=False)

    def hashPassword(self, password):
        self.password = generate_password_hash(password)

    def checkPassword(self, password):
        return check_password_hash(self.password, password)

class Operation(db.Model):
    __tablename__ = 'operations'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True, index=True)
    time = db.Column(db.DateTime, nullable=False)
    ip = db.Column(db.String(20),nullable=False)
    operate = db.Column(db.String(100), nullable=False)
    adminId = db.Column(db.Integer, db.ForeignKey('admins.id'))

    admin = db.relationship('Admin', backref=db.backref('operations'))

class EmailVerifyCode(db.Model):  #邮箱验证码
    __tablename__ = 'emailVerifyCodes'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email = db.Column(db.String(50), nullable=False, index=True)
    verifyCode = db.Column(db.String(10), nullable=False)
    createTime = db.Column(db.DateTime, nullable=False)