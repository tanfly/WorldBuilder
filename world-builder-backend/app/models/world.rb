class World < ApplicationRecord
  belongs_to :user
  has_many :regions
end
