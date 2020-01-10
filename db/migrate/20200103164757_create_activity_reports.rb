class CreateActivityReports < ActiveRecord::Migration[6.0]
  def change
    create_table :activity_reports do |t|
      t.string :activity_id, null: false
      t.string :report_typ, null: false
      t.bigint :previous_activity_report_id
      t.string :region
      t.text :grantee_numbers, array: true, default: []
      t.string :state
      t.string :status
      t.string :activity_typ
      t.string :purpose
      t.date :start_date
      t.date :end_date
      t.decimal :duration
      t.text :specialists, array: true, default: []
      t.string :primary_reason

      t.text :narrative, default: ""
      t.text :next_steps, default: ""

      t.timestamps
    end
  end
end
