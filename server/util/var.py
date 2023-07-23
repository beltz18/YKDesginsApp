from dotenv import load_dotenv
import os

load_dotenv()

MONGO_URI = os.getenv('MONGO_URI')
DB_NAME   = os.getenv('DB_NAME')
USR_COLL  = os.getenv('USR_COLL')