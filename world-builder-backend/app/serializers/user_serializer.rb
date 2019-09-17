class UserSerializer
  include FastJsonapi::ObjectSerializer
  attributes :username, :email, :avatar, :worlds
  has_many :worlds
end
