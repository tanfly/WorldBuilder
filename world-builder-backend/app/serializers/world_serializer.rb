class WorldSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :image, :public, :user, :regions
  belongs_to :user
  has_many :regions
end
