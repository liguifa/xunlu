# -- coding: utf-8 --

from sqlalchemy import Column, String, Integer, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from .model import model

class table(model):
    __tablename__ = "tbl"

    id = Column(Integer, primary_key=True)
    name = Column(String(128))
    dbname = Column(String(128))
    location = Column(String(1024))
    comment = Column(String(1024))
    type = Column(Integer)
    productId = Column(Integer, ForeignKey("product.id"))
    secret = Column(Boolean)
    querytimes = Column(Integer)
    format = Column(String(1024))
    tbl_type = Column(Integer)
    create_time = Column(Integer)
    update_time  = Column(Integer)
    qualities = relationship('quality', primaryjoin="quality.tid == table.id")
    business = relationship('business', primaryjoin="business.id == table.productId")
    fields = relationship('field', primaryjoin="table.id == field.tid")
    extends = relationship('tableExtend', primaryjoin="table.id == tableExtend.tid")