class CreatePrograms < ActiveRecord::Migration[6.0]
  def change
    create_table :programs do |t|
      t.string :pid, null: false
      t.string :grant_number, null: false
      t.string :delegate_number, default: ""
      t.integer :type, null: false
      t.string :region, null: false
      t.string :name, null: false
      t.string :grantee_name, null: false
      t.string :phone, default: ""
      t.string :registration_phone, default: ""
      t.string :fax, default: ""
      t.string :email, default: ""
      t.string :website, default: ""
      t.string :identifier, null: false

      t.timestamps
    end
  end
end
