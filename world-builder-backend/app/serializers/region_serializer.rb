class RegionSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :image, :world
  belongs_to :world
end
