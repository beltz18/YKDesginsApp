from util.data import *

class Product:
  def __init__(self, action, Id, prd):
    self.action = action
    self.Id     = Id
    self.data   = prd
  
  def do_task(self):
    if self.action == 'get':
      return data['products']
    
    elif self.action == 'add' and self.data:
      return 'add product'
    
    elif self.action == 'update' and self.Id and self.data:
      return 'update product'
    
    elif self.action == 'delete' and self.Id and self.data:
      return 'delete product'
    
    else:
      return 'invalid action'
    
  def __str__(self):
    return f'{self.action}, {self.Id}, {self.data}'
  
class Banner:
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