from pymongo  import MongoClient
from util.var import *

client = MongoClient(MONGO_URI)
YKdb   = client[DB_NAME]