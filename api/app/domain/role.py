# -- coding: utf-8 --

from sqlalchemy import Column, String, Integer
from .model import model

class role(model):
    __tablename__ = "role"

    id = Column(Integer, primary_key=True)
    name = Column(String(128))