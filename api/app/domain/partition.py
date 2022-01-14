# -- coding: utf-8 --

from sqlalchemy import Column, String, Integer, Boolean, ForeignKey, Text
from sqlalchemy.orm import relationship
from .model import model

class partition(model):
    __tablename__ = "tbl_partition"

    tid = Column(Integer, ForeignKey("tbl.id"), primary_key=True)
    part = Column(String(768))
    time = Column("t", Integer, primary_key=True)