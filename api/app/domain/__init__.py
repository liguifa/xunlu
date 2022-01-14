from .business import business
from .table import table
from .quality import quality, IndicatorTypes
from .field import field
from .preview import preview
from .template import template
from .partition import partition
from .user import user
from .role import role
from .colQuality import colQuality
from .userAccess import userAccess
from .tableTemplate import tableTemplate
from .lineage import lineage
from .queryTimes import queryTimes
from .operationLogs import operationLogs
from .tableExtend import tableExtend

class domain:
    business = business
    table = table
    quality = quality
    field = field
    preview = preview
    template = template
    partition = partition
    user = user
    role = role
    colQuality = colQuality
    userAccess = userAccess
    tableTemplate = tableTemplate
    lineage = lineage
    queryTimes = queryTimes
    operationLogs = operationLogs
    tableExtend = tableExtend
