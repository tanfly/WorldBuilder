class User < ApplicationRecord
    has_secure_password
    has_many :worlds

    validates_presence_of :email
    validate_uniqueness_of :email
end
