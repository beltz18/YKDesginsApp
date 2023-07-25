import controllers.connection as conn
from util.var import *
from uuid     import uuid4
import bcrypt

class User:
  def __init__(self, id, data = {}):
    self.emailU = id
    self.data   = data

  def get_user(self):
    user = conn.YKdb[USR_COLL]
    res  = user.find_one({ 'email': self.emailU })

    if res:
      del res['_id']

      return {
        'message': 'Usuario encontrado',
        'status': True,
        'data': res
      }
    
    else:
      return {
        'message': 'Este usuario no existe',
        'status': False
      }
    
  def login(self):
    user   = self.get_user()

    if (user['status'] == False):
      return user

    passw  = self.data['password'].encode('utf-8')
    hashed = user['data']['password']
    check  = bcrypt.checkpw(passw, hashed)
    del user['data']['password']

    if check:
      print(user)
      return {
        'message': 'Usuario autenticado',
        'status': check,
        'access': user['data']['access'],
        'data': user['data'],
        'token': uuid4()
      }
    
    else:
      return {
        'message': 'Contraseña incorrecta.',
        'status': False
      }

  def create_user(self):
    a = self.data.keys()
    c = 'name' in a and 'email' in a and 'password' in a

    if c:
      usrExists = self.get_user()

      if(usrExists['status'] == True):
        return {
          'message': 'Este correo ya está en uso',
          'status': False
        }
      
      else:
        newUser = conn.YKdb[USR_COLL]

        hashed = bcrypt.hashpw(self.data['password'].encode('utf-8'), bcrypt.gensalt())
        self.data['password'] = hashed

        if newUser.insert_one(self.data):
          return {
            'message': 'Usuario insertado',
            'status': True
          }
        
        else:
          return {
            'message': 'Error al registrar usuario',
            'status': False
          }
        
    else:
      return {
        'message': 'El registro debe contener un Nombre, un Correo y una Clave validos',
        'status': False
      }

  def update_user(self):
    updUSer = conn.YKdb[USR_COLL]

    if updUSer.find_one_and_update(
      {'email' : self.emailU},
      {'$set': self.data}
    ):
      return {
        'message': 'Usuario actualizado!',
        'status': True
      }
    
    else:
      return {
        'message': 'Usuario no encontrado',
        'status': False
      }

  def delete_user(self):
    delUser = conn.YKdb[USR_COLL]
    thisUsr = delUser.find_one({ 'email': self.emailU })
    del thisUsr['_id']

    if thisUsr['email']:
      delUser.delete_one({ 'email': self.emailU })

      return {
        'message': 'Usuario eliminado',
        'status': True
      }
    
    else:
      return {
        'message': 'El usuario no existe',
        'status': False
      }
    

  def __str__(self):
    return f'{self.emailU}, {self.data}'