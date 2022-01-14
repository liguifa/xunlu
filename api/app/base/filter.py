from ..config import config
import threading

localThread = threading.local()

def filter(name, argv=None):
    filters = {}
    for f in config.filter.list:
        filters[f] = getattr(__import__(f, f), f)
    def _filter(func):
        def __filter(*args, **kwargs):
            if filters[name](argv):
                return func(*args, **kwargs)
            else:
                ContextManager.getRequest().set_status(401, "你没有访问权限")
        return __filter
    return _filter

class ContextManager:
    @staticmethod
    def setRequest(request):
        localThread.request = request

    @staticmethod
    def getRequest():
        return localThread.request