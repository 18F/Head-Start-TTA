class MoveRegionToGrants < ActiveRecord::Migration[6.0]
  def change
    add_column :grants, :region, :string
    reversible do |dir|
      dir.up do
        execute <<-EOQ
          UPDATE grants SET region = activity_reports.region FROM activity_reports
          INNER JOIN activity_reports_grants ON activity_reports.id = activity_reports_grants.activity_report_id
          WHERE activity_reports_grants.grant_id = grants.id AND position(',' in activity_reports.region) = 0
        EOQ
      end
      dir.down do
        execute <<-EOQ
          UPDATE activity_reports SET region = grants.region FROM grants
          INNER JOIN activity_reports_grants ON grants.id = activity_reports_grants.grant_id
          WHERE activity_reports_grants.activity_report_id = activity_reports.id
        EOQ
      end
    end
    remove_column :activity_reports, :region, :string
  end
end
