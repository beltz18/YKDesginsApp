from util.data import *
import controllers.connection as conn
  
# ------------------------------------------------------------------------ #
class Discount:
  """
    The class "Discount" has methods to perform CRUD operations
    on a list of Discounts.
  """
  def __init__(self, action, Id, dis):
    self.action = action
    self.Id     = Id
    self.data   = dis

  def do_task(self):
    if self.action == 'get':
      return data['discounts']
    
    elif self.action == 'add' and self.data:
      return 'add discount'
    
    elif self.action == 'update' and self.Id and self.data:
      return 'update discount'
    
    elif self.action == 'delete' and self.Id and self.data:
      return 'delete discount'
    
    else:
      return 'invalid action'
    
  def __str__(self):
    return f'{self.action}, {self.Id}, {self.data}'