from .business import business
from .table import table
from .quality import quality
from .template import template
from .field import field
from .partition import partition
from .user import user
from .operation import operation

class serviceFactory:
    businessService = business()
    tableService = table()
    qualityService = quality()
    templateService = template()
    fieldService = field()
    partitionService = partition()
    userService = user()
    operationService = operation()