#coding: utf8
import sys
from Crypto.Cipher import AES
from binascii import b2a_hex, a2b_hex
from tornado import escape
from app.config import config
import os, io

class controller():
    _401 = "<!DOCTYPE html><html lang='en'><meta name='viewport' content='width=device-width, initial-scale=1.0'><meta http-equiv='X-UA-Compatible' content='ie=edge'><head><title>401</title><style>html,body,body>div{width:100%;height:100%;margin:0;padding:0;overflow:hidden;text-align:center;color:#527bcc;font:'华文彩云'}h1{margin-top:100px;font-size:160px}.onlinefs-message-one{display:block;font:40px '华文彩云'}.onlinefs-message-two{margin-top:24px;margin-bottom:24px;display:block;font:18px '华文彩云'}a{display:inline-block;height:40px;width:130px;background:#527bcc;font-size:22px;font-family:'华文彩云';text-decoration:none;color:#fff;line-height:40px}</style></head><body><div><h1>401</h1><div class='onlinefs-message-one'>你没有权限访问这个站点，请先申请权限后再登录！</div><div class='onlinefs-message-two'>快回首页试试吧！</div><a href='/'>去首页</a></div></body></html>"

    def __init__(self, application):
        self.application = application
        self.application.set_header("Access-Control-Allow-Origin", config.cors)
        self.application.set_header("Access-Control-Allow-Credentials", "true")

    def json_encode(self, value):
        return escape.json_encode(value)
    
    def json_decode(self, value):
        return escape.json_decode(value)
    
    def json(self, value):
        json = self.json_encode(value)
        self.application.set_header("Content-Type", "application/json")
        self.application.write(json)

    def success(self, data = None):
        self.json({
            "isSuccess": True,
            "data": data
        })

    def fail(self, message):
        self.json({
            "isSuccess": False,
            "message": message
        })

    def result(self, result, data = None, message = None):
        if result:
            self.success(data)
        else:
            self.fail(message)

    def file(self, path, filename):
        self.application.set_header('Content-Type', 'application/octet-stream')
        self.application.set_header('Content-Disposition', 'attachment; filename=%s' % filename)
        with open(path, 'rb') as f:
            while True:
                data = f.read(4096)
                if not data:
                    break
                self.application.write(data)

    def stream(self, filename, data):
        self.application.set_header('Content-Type', 'application/octet-stream')
        self.application.set_header('Content-Disposition', 'attachment; filename=%s' % filename)
        self.application.write(data)

    def csv(self, filename, fields, rows):
        content = ",".join(fields) + "\n"
        for row in rows:
            tempRow = []
            for field in fields:
                tempRow.append(str(row[field]))
            content += ",".join(tempRow) + "\n"
        self.stream(filename, content.encode("utf-8"))

    def set_cookie(self, name, value):
        self.application.set_cookie(name, value)

    def get_cookie(self, name):
        return self.application.get_cookie(name)

    def __getattr__(self, name):
        value = self.application.get_argument(name)
        try:
            return self.json_decode(value)
        except:
            return value
        
    def set_status(self, code, message):
        self.application.set_status(code, message)
        if code >= 400:
            # self.application.set_header("Content-Type", "application/json")
            # self.json({
            #     "status_code": code,
            #     "message": message
            # })
            self.application.set_header("Content-Type", "text/html; charset=utf-8")
            self.application.write(controller._401)

    @property
    def user(self):
        try:
            return self.decrypt(self.get_cookie(config.cookie.id))
        except Exception as e:
            return None

    @property
    def files(self):
        return self.application.request.files.get('file', None)

    def redirect(self, url):
        self.application.redirect(url)

    #加密函数，如果text不是16的倍数【加密文本text必须为16的倍数！】，那就补足为16的倍数
    def encrypt(self, text):
        cryptor = AES.new(config.encrypt, AES.MODE_CBC, config.encrypt)
        #这里密钥key 长度必须为16（AES-128）、24（AES-192）、或32（AES-256）Bytes 长度.目前AES-128足够用
        length = 16
        count = len(text)
        add = length - (count % length)
        text = text + ('\0' * add)
        ciphertext = cryptor.encrypt(text)
        #因为AES加密时候得到的字符串不一定是ascii字符集的，输出到终端或者保存时候可能存在问题
        #所以这里统一把加密后的字符串转化为16进制字符串
        return b2a_hex(ciphertext)

    def decrypt(self, text):
        cryptor = AES.new(config.encrypt, AES.MODE_CBC, config.encrypt)
        plain_text = cryptor.decrypt(a2b_hex(text))
        return plain_text.decode().rstrip('\0')