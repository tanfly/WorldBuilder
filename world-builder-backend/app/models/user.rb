class User < ApplicationRecord
    has_secure_password
    has_many :worlds

    validates_presence_of :email, :username, :password
    validates_uniqueness_of :email, :username, :password
end
