# -- coding: utf-8 --

from sqlalchemy import Column, String, Integer, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from .model import model

class lineage(model):
    __tablename__ = "tbl_lineage"

    tid = Column(Integer, ForeignKey("tbl.id"), primary_key=True)
    ptid = Column(Integer, ForeignKey("tbl.id"), primary_key=True)
    table = relationship("table", primaryjoin="table.id == lineage.tid")
    prevTable = relationship("table", primaryjoin="table.id == lineage.ptid")