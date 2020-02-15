class CreateTtaNeeds < ActiveRecord::Migration[6.0]
  def change
    create_table :tta_needs do |t|
      t.references :grantee, null: false, foreign_key: true
      t.text :narrative
      t.string :indicator, null: false
      t.references :context_link, polymorphic: true
      t.text :specialist_types_needed, array: true, default: []

      t.timestamps
    end
  end
end
