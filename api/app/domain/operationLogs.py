# -- coding: utf-8 --

from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship
from .model import model
import enum
from datetime import datetime

class operationLogs(model):
    __tablename__ = "operation_logs"

    id = Column(Integer, primary_key=True)
    userid = Column(Integer, ForeignKey("user.id"))
    op = Column(String)
    time = Column("t", Integer)
    type = Column(Integer)
    user = relationship('user', primaryjoin="user.id == operationLogs.userid")
    resourceId = Column("resourceid", String)
    resourceType = Column("resource_type", Integer)
    newValue = Column("new_value", String)
    valueType = Column("value_type", String)

    class ResourceTypes:
        Field = 2
        Table = 1

    def __init__(self, userid, op, type, resourceId=0, resourceType=0, newValue="", valueType=""):
        self.userid = userid
        self.op = op
        self.type = type
        self.time = datetime.now().timestamp()
        self.resourceType = resourceType
        self.resourceId = resourceId
        self.newValue = newValue
        self.valueType = valueType

class operationType():
    Insert = 1
    Remove = 2
    Update = 3
    View = 4