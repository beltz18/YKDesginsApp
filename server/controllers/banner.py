from util.data import *
import controllers.connection as conn
  
# ------------------------------------------------------------------------ #
class Banner:
  """
    The class "Banner" has methods to perform CRUD operations
    on a list of Banners.
  """
  def __init__(self, action, Id, ban):
    self.action = action
    self.Id     = Id
    self.data   = ban
  
  def do_task(self):
    if self.action == 'get':
      return data['banners']
    
    elif self.action == 'add' and self.data:
      return 'add banner'
    
    elif self.action == 'update' and self.Id and self.data:
      return 'update banner'
    
    elif self.action == 'delete' and self.Id and self.data:
      return 'delete banner'
    
    else:
      return 'invalid action'
    
  def __str__(self):
    return f'{self.action}, {self.Id}, {self.data}'