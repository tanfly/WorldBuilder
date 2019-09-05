class CreateRegions < ActiveRecord::Migration[5.2]
  def change
    create_table :regions do |t|
      t.string :name
      t.references :world, foreign_key: true

      t.timestamps
    end
  end
end
