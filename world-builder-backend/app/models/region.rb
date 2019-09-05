class Region < ApplicationRecord
  belongs_to :world
  has_one :terrain
end
