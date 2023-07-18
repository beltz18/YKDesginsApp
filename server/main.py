# Modules
from flask                import *
from flask_cors           import CORS
# Class controllers
from controllers.product  import Product
from controllers.banner   import Banner
from controllers.discount import Discount
from controllers.user     import User

app = Flask(__name__)
CORS(app)

# --- --- --- --- --- Routes --- --- --- --- --- #

@app.route('/')
def index():
  return {'message': 'hello world'}

@app.route('/user/<action>', methods=['POST'])
def userManager(action):
  if action and action in ['create', 'get', 'delete', 'update']:
    data = request.get_json()
    user = User(action, data['email'], data)
    res  = user.do_task()
    return res
  
  else:
    return {
      'message': 'this action could not be performed',
      'status': False
    }
  

@app.route('/product/<action>/<Type>/<Id>', methods=['GET', 'POST'])
def product(action, Type, Id):
  if action and Type and Id:
    if Type == 'product':
      prd = {}
      prod = Product(action, Id, prd)
      a = prod.do_task()
      return a
    
    elif Type == 'banner':
      cat = {}
      ban = Banner(action, Id, cat)
      a = ban.do_task()
      return a
    
    elif Type == 'discount':
      dis = {}
      ban = Discount(action, Id, dis)
      a = ban.do_task()
      return a
    
    else:
      return {
        'message': 'Estas tratando de acceder a un tipo de elemento que no existe',
        'status': False
      }
    
  else:
    return {
      'message': 'Debes envíar tres parametros: la acción, el tipo de elemento y el Id del elemento',
      'status': False
    }