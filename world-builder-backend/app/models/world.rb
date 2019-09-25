class World < ApplicationRecord
  belongs_to :user, dependent: :destroy
  has_many :regions
end
