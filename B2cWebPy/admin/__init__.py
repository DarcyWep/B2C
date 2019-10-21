# encoding: utf-8

from flask import Blueprint

admin = Blueprint('admin', __name__)

from admin import login, register, getInfo, alter, product