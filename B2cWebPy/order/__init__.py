# encoding: utf-8

from flask import Blueprint

order = Blueprint('order', __name__)
from order import create, getInfo