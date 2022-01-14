from tornado import gen
from tornado.ioloop import IOLoop
from app.service import serviceFactory
from app.domain import domain
from app.base.logger import logger
from app.dao import DbSessionScope

def synchronizeBNS(app):
    IOLoop.current().spawn_callback(run_synchronize)

async def run_synchronize():
    while True:
        synchronize()
        await gen.sleep(600)

@DbSessionScope
def synchronize():
    logger.info("synchronize bns开始运行")
    bnses = serviceFactory.bnsService.getAllBNS()
    for bns in bnses:
        status, ips = serviceFactory.agentService.getAllAgentForBNS(bns["name"])
        for ip in ips:
            if ip not in bns["ips"]:
                # bns添加了一个ip
                logger.info("bns修改，添加了一个ip[{ip}]".format(**locals()))
                isExists, agent = serviceFactory.agentService.isExistIP(ip)
                if not isExists:
                    serviceFactory.agentService.addAgent(domain.agent("-", ip))
                serviceFactory.taskService.addBNSAgentToTask(bns["name"], ip)
        for ip in bns["ips"]:
            if ip not in ips:
                # bns删除了一个ip
                logger.info("bns修改，移除了一个ip[{ip}]".format(**locals()))
                serviceFactory.taskService.removeBNSAgentFormTask(bns["name"], ip)
    logger.info("synchronize bn结束运行")
        