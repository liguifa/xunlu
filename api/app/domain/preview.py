# -- coding: utf-8 --

from sqlalchemy import Column, String, Integer, Boolean, ForeignKey, Text
from sqlalchemy.orm import relationship
from .model import model

class preview(model):
    __tablename__ = "tbl_preview"

    tid = Column(Integer, ForeignKey("tbl.id"), primary_key=True)
    data = Column(Text)
    lineno = Column(Integer, primary_key=True)
    time = Column("t", Integer)
    table = relationship('table', primaryjoin="table.id == preview.tid")