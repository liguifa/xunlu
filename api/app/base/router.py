from ..config import config

class router():
    def __init__(self, url):
        urls = url.split("?")[0].split("/")
        self.controller = config.router.controller
        self.action = config.router.action
        if len(urls) == 2:
            self.controller = urls[1]
        elif len(urls) == 3:
            self.controller = urls[1]
            self.action = urls[2]
