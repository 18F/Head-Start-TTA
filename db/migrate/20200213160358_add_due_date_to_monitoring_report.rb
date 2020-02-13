class AddDueDateToMonitoringReport < ActiveRecord::Migration[6.0]
  def change
    add_column :monitoring_reports, :due_date, :date
    add_column :monitoring_reports, :timeframe, :string
    add_column :monitoring_reports, :citation_details, :text
  end
end
