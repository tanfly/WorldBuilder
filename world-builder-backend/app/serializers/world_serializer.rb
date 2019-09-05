class WorldSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :image, :public, :user
  belongs_to :user
end
