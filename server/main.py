# Modules
from flask                import *
from flask_cors           import CORS
# Class controllers
from controllers.product  import Product
from controllers.banner   import Banner
from controllers.discount import Discount
from controllers.user     import User
# Blueprints
from routes.userRouter    import userRouter
from util.var             import *
# MongoDB Connection
import controllers.connection as conn

app = Flask(__name__)
CORS(app)

# --- --- --- --- --- Routes --- --- --- --- --- #

@app.route('/')
def index():
  data = {
    'name': 'Administrador',
    'email': 'admin@admin.com',
    'password': 'admin',
    'access': 'admin'
  }
  user = User(data['email'], data)
  res  = user.create_user()
  print(res)
  return res

@app.route('/product/register', methods=['POST'])
def register_product():
  data    = request.get_json()
  product = conn.YKdb['product']
  product.insert_one(data)
  return {
    'message': 'Producto insertado correctamente',
    'status': True
  }

@app.route('/product/data')
def get_products():
  product = conn.YKdb['product']
  data    = []
  dataPrd = product.find()

  for d in dataPrd:
    del d['_id']
    data.append(d)

  return {
    'message': 'products fetched',
    'data': data
  }

@app.route('/cart/add', methods=['POST'])
def add_to_cart():
  data = request.get_json()
  cart = conn.YKdb['cart']
  cart.insert_one(data)
  return {
    'message': 'Producto agregado a tu carrito',
    'status': True
  }

@app.route('/cart/get', methods=['POST'])
def get_cart_products():
  email = request.json['email']
  cart  = conn.YKdb['cart']
  data  = []
  cart.find({ 'email': email })

  for c in cart:
    del c['_id']
    data.append(c)
  print(email, data)
  
  return {
    'message': 'cart fetched',
    'data': data
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
  
app.register_blueprint(userRouter)
  
if __name__ == '__main__':
  app.run()