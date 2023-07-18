import controllers.connection as conn

class User:
  def __init__(self, action, id, data):
    self.action = action
    self.emailU = id
    self.data   = data

  def do_task(self):
    error = {
      'message': 'this action could not be performed',
      'status': False
    }

    a = {
      'get':    self.get_user(self.data),
      'create': self.create_user(self.data),
      'delete': self.delete_user(self.emailU),
      'update': self.update_user(self.emailU, self.data)
    }

    return a.get(self.action, error)

  def get_user(self, data):
    user = conn.YKdb['users']
    res  = user.find_one(data)

    if res:
      del res['_id']

      return {
        'message': 'User found',
        'status': True,
        'data': res
      }
    
    else:
      return {
        'message': 'User doesnt exists',
        'status': False
      }

  def create_user(self, data):
    a = data.keys()
    c = 'name' in a and 'email' in a and 'password' in a
    
    if c:
      newUser = conn.YKdb['users']
      thisUsr = newUser.find_one({ 'email': self.emailU })

      if thisUsr:
        return {
          'message': 'Email already in use',
          'status': False
        }

      else:
        try:
          inserted = newUser.insert_one(data).inserted_id
          print(inserted)

          return {
            'message': 'user inserted',
            'status': True,
            'data': str(inserted)
          }
        
        except Exception as err:
          print(err)
        
    else:
      return {
        'message': 'User must have a name, an email and a password',
        'status': False
      }

  def update_user(self, email, data):
    updUSer = conn.YKdb['users']

    if updUSer.find_one_and_update(
      {'email' : email},
      {'$set': data}
    ):
      return {
        'message': 'User updated succesfully',
        'status': True
      }
    
    else:
      return {
        'message': 'User not found',
        'status': False
      }

  def delete_user(self, email):
    delUser = conn.YKdb['users']
    thisUsr = delUser.find_one({ 'email': email })
    del thisUsr['_id']

    if thisUsr['email']:
      delUser.delete_one({ 'email': email })

      return {
        'message': 'User deleted from database',
        'status': True
      }
    
    else:
      return {
        'message': 'This user doesnt exist',
        'status': False
      }
    

  def __str__(self):
    return f'{self.action}, {self.emailU}, {self.data}'