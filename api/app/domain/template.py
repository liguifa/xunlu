# -- coding: utf-8 --

from sqlalchemy import Column, String, Integer, Boolean, Text, ForeignKey
from sqlalchemy.orm import relationship
from .model import model

class template(model):
    __tablename__ = "template"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(128), primary_key=True)
    template = Column(Text)

    def __init__(self, name, value):
        self.name = name
        self.template = value
