class RemoveObsoleteActivityReportFields < ActiveRecord::Migration[6.0]
  def change
    remove_column :activity_reports, :activity_id, :string
    remove_column :activity_reports, :report_typ, :string
    remove_column :activity_reports, :previous_activity_report_id, :bigint
    remove_column :activity_reports, :state, :string
    remove_column :activity_reports, :status, :string
    remove_column :activity_reports, :purpose, :string
    remove_column :activity_reports, :primary_reason, :string
    remove_column :activity_reports, :narrative, :text, default: ""
    remove_column :activity_reports, :next_steps, :text, default: ""
  end
end
