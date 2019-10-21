#encoding: utf-8

# Power By Dazedark
# 管理员的密码修改

from flask import jsonify, request, session
from admin import admin
from models import *
from exts import db
from datetime import datetime
import os

ALLOWED_EXTENSIONS = set(['png', 'jpg', 'PNG', 'JPG'])
PATH = 'D:\\RelatedData\\program\\python\\pq\\web\\B2cWebAng\\src\\assets\\img\\product'

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1] in ALLOWED_EXTENSIONS

@admin.route('/product/add/', methods=['POST'])
def productAdd():
    adminId = session.get('adminId')
    newAdmin = Admin.query.filter(Admin.id == adminId).first()

    productName = request.values.get('productName')
    productPrice = request.values.get('productPrice')
    productStock = request.values.get('productStock')
    productCategory = request.values.get('productCategory')
    productMainImg = request.files['productMainImg']

    if newAdmin and productName and productPrice and productStock and \
            productCategory and allowed_file(productMainImg.filename):

        newProduct = Product(name=productName, price=productPrice,
                             stock=productStock, category=productCategory,
                             createTime=datetime.now(), updateTime=datetime.now())
        db.session.add(newProduct)
        db.session.flush()  # 获取新加入商品的ID
        db.session.commit()

        # ---------------------------保存商品图片------------------------
        saveDir = PATH + "\\" + str(newProduct.id)  # 保存路径
        # 获取保存路径并查看是否存在，不存在则新建
        getSaveDir = os.path.join(os.getcwd(), saveDir)
        if not os.path.exists(getSaveDir):
            os.makedirs(getSaveDir, 493)

        mainImgPath = os.path.join(getSaveDir, productMainImg.filename)  # filename是f的固有属性
        productMainImg.save(mainImgPath)  # 保存到指定目录
        newMianImgName = 'main' + '.' + productMainImg.filename.rsplit('.', 1)[1]
        os.rename(getSaveDir + "\\" + productMainImg.filename, getSaveDir + "\\" + newMianImgName) # 修改文件名

        newProduct.mainImg = "../../assets/img/product/{}/main.jpg".format(newProduct.id)
        db.session.commit()
        # ---------------------------保存商品图片结束------------------------

        operate = Operation(time=datetime.now(), ip=request.remote_addr, operate='增加新商品，商品ID为{id}'.format(id=newProduct.id))
        operate.adminId = newAdmin.id
        db.session.add(operate)
        db.session.commit()  # 将管理员的操作记录下来
        return jsonify({'code': 1})  # 增加成功
    else:
        return jsonify({'code': 0}) # 文件类型不符合




