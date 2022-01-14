from app.dao import DbSessionManager, DbSessionScope
from app.domain import domain
import urllib.request as urllib2
import ssl
import ldap
import xml.etree.ElementTree as ET
from app.config import config
import json

class user:
    @DbSessionScope
    def getUserByToken(self, token, sessionId):
        username = self.getUsernameByTokenForIPS2(sessionId) if config.authorize.ipsVersion == '2.0' else self.getUsernameByToken(token)
        user = DbSessionManager.get().query(domain.user).filter(domain.user.username == username).first() if username else None
        if not user and not username:
            self.saveUser(username, 11)
            user = DbSessionManager.get().query(domain.user).filter(domain.user.username == username).first()
        return user

    def getUsernameByToken(self, token):
        try:
            secret = config.authorize.secret
            request = urllib2.Request("https://ips.zuoyebang.cc/cas/home/validate?sid=metadata&ticket={token}&secret={secret}".format(**locals()))
            result = urllib2.urlopen(request, context=ssl._create_unverified_context()).read()
            return json.loads(result)["data"]["username"]
        except Exception as e:
            return None

    def getUsernameByTokenForIPS2(self, token):
        try:
            secret = config.authorize.secret
            accessToken = json.loads(urllib2.urlopen(urllib2.Request("https://ips.zuoyebang.cc/ips/oauth/accessToken?appId=metadata&appSecret={secret}".format(**locals())), context=ssl._create_unverified_context()).read())['data']['accessToken']
            return accessToken = json.loads(urllib2.urlopen(urllib2.Request("https://ips.zuoyebang.cc/ips/home/session?version=2.0&sdk=odp&appId=metadata&accessToken={accessToken}&sessionId={token}".format(**locals())), context=ssl._create_unverified_context()).read())['data']['username']
        except Exception as e:
            return None

    @DbSessionScope
    def getUsers(self, pageIndex, pageSize, searchKey):
        query = DbSessionManager.get().query(domain.user)
        if not searchKey == "":
            query = query.filter(domain.user.username.like("%"+str(searchKey)+"%"))
        users = query.order_by(domain.user.id).offset((pageIndex - 1) * pageSize).limit(pageSize).all()
        total = query.count()
        return users, total

    def checkUser(self, username):
        conn = ldap.initialize(config.ldap.server)
        # conn.set_option(ldap.OPT_REFERRALS, 0)
        conn.protocol_version = ldap.VERSION3
        conn.simple_bind(config.ldap.username, config.ldap.password)
        ldap_id = conn.search(config.ldap.baseDN, ldap.SCOPE_SUBTREE, "(uid="+username+")")
        result_type, result_data = conn.result(ldap_id, 1)
        if len(result_data) > 0:
            return True, result_data[0][1]
            
        return False,None

    @DbSessionScope
    def saveUser(self, username, roleId):
        user = domain.user(username, roleId)
        DbSessionManager.get().add(user)
    
    @DbSessionScope
    def getUserByUsername(self, username):
        return DbSessionManager.get().query(domain.user).filter(domain.user.username == username).first()

    @DbSessionScope
    def getUserByUserId(self, userId):
        return DbSessionManager.get().query(domain.user).filter(domain.user.id == userId).first()

    @DbSessionScope
    def editAuthorize(self, userId, roleId, tableIds):
        user = DbSessionManager.get().query(domain.user).filter(domain.user.id == userId).first()
        user.roleId = roleId
        userAccess = DbSessionManager.get().query(domain.userAccess).filter(domain.userAccess.userid == userId).all()
        DbSessionManager.get().delete(userAccess)
        newUserAccess = [domain.userAccess(userId, tableId, domain.userAccess.ResourceTypes.Table, domain.userAccess.AccessTypes.OnlyView) for tableId in tableIds]
        DbSessionManager.get().add(newUserAccess)

    @DbSessionScope
    def disableUser(self, userId):
        user = self.getUserByUserId(userId)
        user.status = 0

    @DbSessionScope
    def activeUser(self, userId):
        user = self.getUserByUserId(userId)
        user.status = 1