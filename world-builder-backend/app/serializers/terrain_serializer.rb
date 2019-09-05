class TerrainSerializer
  include FastJsonapi::ObjectSerializer
  attributes :description, :image, :region
  belongs_to :region
end
