class CreateAddresses < ActiveRecord::Migration[6.0]
  def change
    create_table :addresses do |t|
      t.string :street1, null: false
      t.string :street2, default: ""
      t.numeric :longitude, null: false
      t.numeric :latitude, null: false
      t.string :city, null: false
      t.string :state, null: false
      t.string :postal_code, null: false
      t.string :postal_code_four, default: ""
      t.string :map_zoom_level, default: ""
      t.string :county, default: ""

      t.timestamps
    end
  end
end
