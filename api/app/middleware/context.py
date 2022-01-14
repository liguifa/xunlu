from app.base.controller import controller
from app.base.filter import ContextManager
import threading

class context(controller):
    def prepare(self):
        ContextManager.setRequest(self)
        return True

    def finish(self):
        ContextManager.setRequest(None)