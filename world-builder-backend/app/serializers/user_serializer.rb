class UserSerializer
  include FastJsonapi::ObjectSerializer
  attributes :email, :avatar
  has_many :worlds
end
