class CreateMonitoringReports < ActiveRecord::Migration[6.0]
  def change
    create_table :monitoring_reports do |t|
      t.text :narrative, null: false
      t.text :citation, array: true, default: []
      t.date :report_date, null: false
      t.string :status, null: false
      t.references :grant, null: false, foreign_key: true

      t.timestamps
    end
  end
end
