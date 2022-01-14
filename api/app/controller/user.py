from app.base.controller import controller
from app.service import serviceFactory
from app.viewmodel.convert import convert
from app.dao import DbSessionScope
from app.config import config
from app.base.filter import filter

class user(controller):
    @DbSessionScope
    def getUserInfo(self):
        user = serviceFactory.userService.getUserByUsername(self.user)
        self.result(True, convert.toUserInfoViewModel(user))

    @DbSessionScope
    def ssoLogin(self):
        if self.ticket:
            # logger.info("login system success, ticket:{self.ticket}".format(**locals()))
            # todo get user by token
            user = serviceFactory.userService.getUserByToken(self.ticket, self.get_cookie("ZYBIPSCAS"))
            if not user or user.status == 0:
                self.set_status(401, "没有权限")
                return
            self.set_cookie("metadata-accesstoken", self.encrypt(self.ticket))
            self.set_cookie(config.cookie.id, self.encrypt(user.username))
        serviceFactory.operationService.commit(user.username, "登录系统".format(**locals()), serviceFactory.operationService.operationType.View)
        self.redirect("/")

    # @filter("checkAdmin")
    @DbSessionScope
    def getUsers(self):
        users, total = serviceFactory.userService.getUsers(self.pageIndex, self.pageSize, self.searchKey)
        self.result(True, convert.toUsersViewModel(users, total))

    @DbSessionScope
    def getLDAPUserByUsername(self):
        isExists, user = serviceFactory.userService.checkUser(self.username)
        self.result(True, convert.toCheckUserViewModel(isExists, user))

    @filter("checkAdmin")
    @DbSessionScope
    def saveUser(self):
        serviceFactory.userService.saveUser(self.username, self.roleId)
        self.result(True, {})

    @DbSessionScope
    def getUserAuthorize(self):
        user = serviceFactory.userService.getUserByUserId(self.userId)
        self.result(True, convert.toUserAuthorizeViewModel(user))

    @filter("checkAdmin")
    @DbSessionScope
    def editAuthorize(self):
        serviceFactory.userService.editAuthorize(self.userId, self.roleId, self.actives)
        self.result(True, {})

    @filter("checkAdmin")
    @DbSessionScope
    def disableUser(self):
        serviceFactory.userService.disableUser(self.userId)
        self.result(True, {})

    @filter("checkAdmin")
    @DbSessionScope
    def activeUser(self):
        serviceFactory.userService.activeUser(self.userId)
        self.result(True, {})