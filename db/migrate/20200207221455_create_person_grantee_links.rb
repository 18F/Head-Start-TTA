class CreatePersonGranteeLinks < ActiveRecord::Migration[6.0]
  def change
    create_table :person_grantee_links do |t|
      t.references :person, null: false, foreign_key: true
      t.references :grantee, null: false, foreign_key: true
      t.boolean :grantee_employee, default: true

      t.timestamps
    end
  end
end
