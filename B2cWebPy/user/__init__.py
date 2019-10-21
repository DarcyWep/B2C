# encoding: utf-8

from flask import Blueprint

user = Blueprint('user', __name__)
from user import register, login, getInfo, alter
