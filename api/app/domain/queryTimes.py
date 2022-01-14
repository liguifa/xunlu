# -- coding: utf-8 --

from sqlalchemy import Column, String, Integer, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from .model import model
from enum import Enum

class queryTimes(model):
    __tablename__ = "tbl_querytimes"

    tid = Column(Integer, ForeignKey("tbl.id"), primary_key=True)
    value = Column("querytimes", Integer)
    time = Column("t", Integer, primary_key=True)