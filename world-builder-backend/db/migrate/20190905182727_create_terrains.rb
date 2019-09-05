class CreateTerrains < ActiveRecord::Migration[5.2]
  def change
    create_table :terrains do |t|
      t.text :description
      t.string :image
      t.references :region, foreign_key: true

      t.timestamps
    end
  end
end
