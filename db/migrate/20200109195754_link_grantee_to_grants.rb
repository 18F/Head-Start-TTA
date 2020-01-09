class LinkGranteeToGrants < ActiveRecord::Migration[6.0]
  def change
    change_table :grants do |t|
      t.references :grantee, foreign_key: true
    end
  end
end
