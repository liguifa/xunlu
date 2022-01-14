# -- coding: utf-8 --

from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship
from .model import model

class userAccess(model):
    __tablename__ = "user_access"

    userid = Column(Integer, ForeignKey("user.id"), primary_key=True)
    resourceId = Column(Integer, primary_key=True)
    resourceType = Column(Integer,  primary_key=True)
    accessType = Column(Integer, primary_key=True)
    user = relationship("user", primaryjoin="user.id == userAccess.userid")

    class AccessTypes:
        OnlyView = 2
        Admin  = 1
        OperationLogs = 3

    class ResourceTypes:
        Business = 2
        Table = 1

    def __init__(self, userid, resourceId, resourceType, accessType):
        self.userid = userid
        self.resourceType = resourceType
        self.resourceId = resourceId
        self.accessType = accessType
