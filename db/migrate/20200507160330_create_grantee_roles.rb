class CreateGranteeRoles < ActiveRecord::Migration[6.0]
  def change
    create_table :grantee_roles do |t|
      t.string :title, null: false

      t.timestamps
    end
  end
end
