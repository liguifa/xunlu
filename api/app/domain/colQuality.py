# -- coding: utf-8 --

from sqlalchemy import Column, String, Integer, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from .model import model
from enum import Enum

class colQuality(model):
    __tablename__ = "col_quality"

    id = Column(Integer, primary_key=True)
    tid = Column(Integer, ForeignKey("tbl.id"))
    col = Column(String(1024))
    indicator = Column(Integer)
    value = Column(Integer)
    time = Column("t", Integer)

class IndicatorTypes(Enum):
    NullValue = 1