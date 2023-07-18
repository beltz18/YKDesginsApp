from util.data import *
import controllers.connection as conn

# ------------------------------------------------------------------------ #
class Product:
  """
    The class "Product" has methods to perform CRUD operations
    on a list of products.
  """
  def __init__(self, action, Id, prd):
    self.action = action
    self.Id     = int(Id)
    self.data   = prd
  
  def do_task(self):
    if self.action == 'get':
      if self.Id > 0 : return data['products'][self.Id-1]
      else: return data['products']
    
    elif self.action == 'add' and self.data:
      data['products'].append(self.data)
      return 'product added succesfully'
    
    elif self.action == 'update' and self.Id and self.data:
      return 'update product'
    
    elif self.action == 'delete' and self.Id and self.data:
      return 'delete product'
    
    else:
      return 'invalid action'
    
  def __str__(self):
    return f'{self.action}, {self.Id}, {self.data}'