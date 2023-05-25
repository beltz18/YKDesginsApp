from flask               import *
from controllers.manage  import *

app = Flask(__name__)

@app.route('/')
def index():
  return 'hello world'

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
    else:
      return 'Estas tratando de acceder a un tipo de elemento que no existe'
  else:
    return 'Debes envíar tres parametros: la acción, el tipo de elemento y el Id del elemento'