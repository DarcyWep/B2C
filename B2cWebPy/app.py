from flask import Flask, session, request, jsonify
from flask_cors import *
import config
from exts import db
from admin import admin
from user import user
from order import order
from datetime import timedelta
from models import Product

import os

app = Flask(__name__)
app.config.from_object(config)
db.init_app(app)

CORS(app, supports_credentials=True, methods=['POST'])

# app.permanent_session_lifetime = timedelta(days=10)

app.register_blueprint(admin, url_prefix='/admin')   # 管理员
app.register_blueprint(user, url_prefix='/user')   # 用户
app.register_blueprint(order, url_prefix='/order')   # 订单

@app.route('/')
def hello_world():
    return 'Hello World!'

# 前端获取商品展示
@app.route('/get/products/', methods=['POST'])
def getProducts():
    category = request.form.get('category')

    if category == 'home':
        products = Product.query.all()
    else:
        products = Product.query.filter(Product.category == category).all()

    productsInfo = []
    for product in products:
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
        'productsInfo': productsInfo
    }
    return jsonify(msg)

if __name__ == '__main__':
    CORS(app, supports_credentials=True, methods=['POST'])
    app.run(host='0.0.0.0', port=2010)
