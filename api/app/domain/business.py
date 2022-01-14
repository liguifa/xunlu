# -- coding: utf-8 --

from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship
from .model import model
from datetime import *

class business(model):
    __tablename__ = "product"

    id = Column(Integer, primary_key=True)
    name = Column(String(256))
    createdTime = Column(Integer)
    tables = relationship('table', primaryjoin="table.productId == business.id")
    no = Column(Integer)

    def __init__(self, name):
        self.name = name
        self.createdTime = datetime.now().timestamp()
        self.no = 999