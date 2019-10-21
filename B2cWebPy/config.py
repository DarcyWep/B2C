# encoding: utf-8

# Power By Dazedark
# 配置文件

# 使用session必须要用到SECRET_KEY
import os
SECRET_KEY = os.urandom(24)     # urandom随机生成一个24位的字符串
MAX_CONTENT_LENGTH = 16 * 1024 * 1024
# SECRET_KEY = 'fwp4RzMsoJPqiukyFnVWrg0C'
DEBUG = True

# 数据库配置：dialect+driver://username:password@host:port/database
DIALECT = "mysql"
DRIVER = "mysqlconnector"  #pip install mysql-connector-python
USERNAME = "root"
PASSWORD = "dazedark"
HOST = "127.0.0.1"  #本地测试HOST
# HOST = '118.31.5.124'
PORT = "3306"
DATABASE = "shop"   #事先创建好的数据库
DATABASE_URL = "{}+{}://{}:{}@{}:{}/{}?charset=utf8".format(DIALECT, DRIVER, USERNAME, PASSWORD, HOST, PORT, DATABASE)
SQLALCHEMY_DATABASE_URI = "{}+{}://{}:{}@{}:{}/{}?charset=utf8".format(DIALECT, DRIVER, USERNAME, PASSWORD, HOST, PORT, DATABASE)

SQLALCHEMY_TRACK_MODIFICATIONS = False      #禁止一个基本问题的报错


UPLOAD_FOLDER = '/path/to/the/uploads'
