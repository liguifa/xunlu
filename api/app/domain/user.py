# -- coding: utf-8 --

from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship
from .model import model
from datetime import *

class user(model):
    __tablename__ = "user"

    id = Column(Integer, primary_key=True)
    username = Column(String(1024))
    # displayName = Column(String(1024))
    # email = Column(String(1024))
    # createdTime = Column(Integer)
    roleId = Column(Integer, ForeignKey("role.id"))
    status = Column(Integer)
    role = relationship('role', primaryjoin="role.id == user.roleId")
    userAccess = relationship('userAccess', primaryjoin="userAccess.userid == user.id")

    def __init__(self, username, role):
        self.username = username
        # self.displayName = displayName
        # self.email = email
        # self.createdTime = datetime.now().timestamp()
        self.roleId = role
        self.status = 1
