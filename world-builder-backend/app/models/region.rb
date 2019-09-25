class Region < ApplicationRecord
  belongs_to :world
  has_one :terrain, dependent: :destroy
end
