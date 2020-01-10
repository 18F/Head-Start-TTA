class CreateGrantees < ActiveRecord::Migration[6.0]
  def change
    create_table :grantees do |t|
      t.string :name, null: false

      t.timestamps
    end
  end
end
