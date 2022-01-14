# -- coding: utf-8 --

from sqlalchemy import Column, String, Integer, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from .model import model
from enum import Enum

class quality(model):
    __tablename__ = "tbl_quality"

    id = Column(Integer, primary_key=True)
    tid = Column(Integer, ForeignKey("tbl.id"))
    indicator = Column(Integer)
    value = Column(Integer)
    time = Column("t", Integer)

class IndicatorTypes(Enum):
    TotalForRow = 1