class EnhanceTasksModel < ActiveRecord::Migration[6.0]
  def change
    change_table :tasks do |t|
      t.bigint :created_by_id
      t.bigint :assigned_to_id
      t.bigint :completed_by_id
      t.datetime :due_date
      t.datetime :completed_at
    end
  end
end
