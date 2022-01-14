from app.base.controller import controller
from app.config.config import config
import re

class authorize(controller):
    def prepare(self):
        for url in config.authorize.anonymous:
            if re.match(url, self.application.request.uri):
                return True
        if not self.user:
            self.set_status(401, "没有权限")
            return False
        return True

    def finish(self):
        pass
