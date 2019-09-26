class RegionSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :image, :world, :terrain
  belongs_to :world
end
