class CreatePeople < ActiveRecord::Migration[6.0]
  def change
    create_table :people do |t|
      t.string :name, null: false
      t.string :role, null: false
      t.string :phone_number
      t.string :email

      t.timestamps
    end
  end
end
