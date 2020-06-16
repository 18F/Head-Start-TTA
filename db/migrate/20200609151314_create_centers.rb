class CreateCenters < ActiveRecord::Migration[6.0]
  def change
    create_table :centers do |t|
      t.string :cid, null: false
      t.string :grant_number, null: false
      t.string :delegate_number, default: ""
      t.integer :type, null: false
      t.string :name, null: false
      t.string :phone, default: ""

      t.timestamps
    end
  end
end
