from flask            import *
from controllers.user import User

userRouter = Blueprint('user', __name__)

@userRouter.route('/user/login', methods=['POST'])
def get_user():
  data = request.get_json()
  user = User(data['email'], data)
  res  = user.login()
  return res

@userRouter.route('/user/register', methods=['POST'])
def create_user():
  data = request.get_json()
  user = User(data['email'], data)
  res  = user.create_user()
  return res