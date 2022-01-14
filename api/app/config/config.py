# -- coding: utf-8 --
import os
import logging

class global_config():
    pass

config = global_config()

# Web应用端口
config.port = 25041

# 中间件
class middleware_config():
    pass
config.middleware = middleware_config()
# 中间件列表
config.middleware.list = [
    "authorize",
    "context"
]
# 中间件目录
config.middleware.path = "{path}/../middleware".format(path=os.path.dirname(os.path.realpath(__file__)))

# 插件
class plugin_config():
    pass
config.plugin = plugin_config()
# 插件列表
config.plugin.list = [
    # "synchronizeBNS"
]
# 插件目录
config.plugin.path = "{path}/../plugins".format(path=os.path.dirname(os.path.realpath(__file__)))

# 控制器
class controller_config():
    pass
config.controller = controller_config()
# 控制器目录
config.controller.path = "{path}/../controller".format(path=os.path.dirname(os.path.realpath(__file__)))

# 路由
class router_config():
    pass
config.router = router_config()
# 路由模式
config.router.model = 1
# 默认控制器
config.router.controller = "home"
# 默认action
config.router.action = "index"

# database
class database_config():
    pass
config.database = database_config()
# 数据库类型
config.database.type = "mysql"
# 数据库链接
config.database.url = "mysql://root:199305080@127.0.0.1:3306/data_meta"

# cookie
class cookie_config():
    pass
config.cookie = cookie_config()
# auth cookie id
config.cookie.id = "metadata-session-id"

# 权限
class authorize_config():
    pass
config.authorize = authorize_config()
# 匿名URL
config.authorize.anonymous = ["/user/ssoLogin"]
# 登录url
config.authorize.secret = "3c710046444b706d8d165b9e859bb0a4"

# 加密key
config.encrypt = "keyskeyskeyskeys"

# cors
config.cors = "http://localhost:3000"

# 时间
config.dateformat = "%Y/%m/%d %H:%M:%S"

#log
class log_config():
    pass
config.log = log_config()
#log文件
config.log.file = '../logs/meta-web.log'
#log level
config.log.level = logging.DEBUG

#过滤器
class filter_config():
    pass
config.filter = filter_config()
#过滤器列表
config.filter.list = [
    "checkTablePermission",
    "checkAdmin"
]
config.filter.path = "{path}/../filter".format(path=os.path.dirname(os.path.realpath(__file__)))
