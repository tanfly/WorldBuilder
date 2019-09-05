class CreateWorlds < ActiveRecord::Migration[5.2]
  def change
    create_table :worlds do |t|
      t.boolean :public, :default => False
      t.string :name,
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
