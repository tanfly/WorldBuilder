class UserSerializer
  include FastJsonapi::ObjectSerializer
  attributes :email, :password_digest, :avatar
end
