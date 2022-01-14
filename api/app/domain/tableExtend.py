# -- coding: utf-8 --

from sqlalchemy import Column, String, Integer, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from .model import model

class tableExtend(model):
    __tablename__ = "tbl_extend"

    id = Column(Integer, primary_key=True)
    tid = Column(Integer, ForeignKey("tbl.id"))
    name = Column(String(128))
    value = Column(String(2048))

    def __init__(self, tid, name, value):
        self.tid = tid
        self.name = name
        self.value = value