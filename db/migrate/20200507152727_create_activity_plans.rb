class CreateActivityPlans < ActiveRecord::Migration[6.0]
  def change
    create_table :activity_plans do |t|
      t.references :tta_need, null: false, foreign_key: true
      t.datetime :start_at, null: false
      t.datetime :end_at
      t.string :format, null: false
      t.text :location

      t.timestamps
    end
  end
end
