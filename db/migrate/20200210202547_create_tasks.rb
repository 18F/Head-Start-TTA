class CreateTasks < ActiveRecord::Migration[6.0]
  def change
    create_table :tasks do |t|
      t.string :status, null: false, default: "todo"
      t.string :title, null: false
      t.text :notes, default: ""
      t.references :parent, polymorphic: true

      t.timestamps
    end
  end
end
