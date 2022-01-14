from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, scoped_session
import pymysql
from .. import config
import threading

pymysql.install_as_MySQLdb()
engine = create_engine(config.database.url, pool_size=50, pool_pre_ping=True, pool_recycle=290, max_overflow=50)
session = sessionmaker(bind=engine)
localThread = threading.local()

def DbSessionScope(func):
    def scope(*args, **kwargs):
        DbSessionManager.set(dbSession())
        try:
            result = func(*args, **kwargs)
            scopesession = DbSessionManager.get()
            DbSessionManager.clear()
            if not DbSessionManager.isExists():
                scopesession.commit()
                scopesession.close()
        except Exception as e:
            scopesession = DbSessionManager.get()
            DbSessionManager.clear()
            if not DbSessionManager.isExists() and scopesession:
                scopesession.rollback()
                scopesession.close()
            raise e
        return result
    return scope

class dbSession:
    def __init__(self):
        self.scopedsession = scoped_session(session)()

    def query(self, *args, **kwargs):
        return self.scopedsession.query(*args, **kwargs)
        
    def add(self, model):
        if isinstance(model, list):
            for m in model:
                self.scopedsession.add(m)
        else:
            self.scopedsession.add(model)
        return model

    def delete(self, model):
        if isinstance(model, list):
            for m in model:
                self.scopedsession.delete(m)
        else:
            self.scopedsession.delete(model)
        return model

    def commit(self):
        self.scopedsession.commit()

    def close(self):
        self.scopedsession.close()

    def rollback(self):
        self.scopedsession.rollback()

class DbSessionManager:
    @staticmethod
    def set(session):
        if not hasattr(localThread, "scope") or localThread.scope == 0:
            localThread.session = session
        else:
            session.close()
        localThread.scope = 1 if not hasattr(localThread, "scope") else localThread.scope + 1

    @staticmethod
    def get():
        return localThread.session

    @staticmethod
    def clear():
        if not localThread.scope or localThread.scope <= 1:
            localThread.session = None
        localThread.scope = 0 if not hasattr(localThread, "scope") else localThread.scope - 1
        if localThread.scope < 0:
            localThread.scope = 0
    
    @staticmethod
    def isExists():
        return DbSessionManager.get() != None
