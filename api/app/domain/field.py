# -- coding: utf-8 --

from sqlalchemy import Column, String, Integer, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from .model import model

class field(model):
    __tablename__ = "col"

    tid = Column(Integer, ForeignKey("tbl.id"), primary_key=True)
    name = Column(String(128), primary_key=True)
    datatype = Column(String(128))
    comment = Column(String(1024))
    no = Column(Integer)
    dict = Column(String(1024))
    type = Column(Integer)
    table = relationship('table', primaryjoin="table.id == field.tid")
    secret = Column(Boolean)