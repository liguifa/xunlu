# -- coding: utf-8 --

from sqlalchemy import Column, String, Integer, Boolean, Text, ForeignKey
from sqlalchemy.orm import relationship
from .model import model

class tableTemplate(model):
    __tablename__ = "tbl_template"

    id = Column(Integer, primary_key=True)
    tid = Column(Integer, ForeignKey("tbl.id"))
    templateId = Column(Integer, ForeignKey("template.id"))
    table = relationship('table', primaryjoin="tableTemplate.tid == table.id")
    template = relationship('template', primaryjoin="tableTemplate.templateId == template.id")

    def __init__(self, tid, templateId, template):
        self.tid = tid
        if template:
            self.template = template
        else:
            self.templateId = templateId