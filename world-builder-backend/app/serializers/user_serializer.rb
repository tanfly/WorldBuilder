class UserSerializer
  include FastJsonapi::ObjectSerializer
  attributes :username, :email, :avatar
  has_many :worlds
end
