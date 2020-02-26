class CreateTopics < ActiveRecord::Migration[6.0]
  def change
    create_table :topics do |t|
      t.string :name, null: false
      t.string :scope, null: false
      t.bigint :parent_id

      t.timestamps
    end
  end
end
