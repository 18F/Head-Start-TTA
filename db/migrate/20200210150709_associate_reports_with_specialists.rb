class AssociateReportsWithSpecialists < ActiveRecord::Migration[6.0]
  def change
    create_join_table :people, :activity_reports

    execute <<-EOQ
      INSERT INTO people (name, role, created_at, updated_at) (
        SELECT DISTINCT unnest(activity_reports.specialists), 'ECS', now(), now() FROM activity_reports
      )
    EOQ

    ActivityReport.select(:id, :specialists).find_each do |ar|
      ar.specialists.each do |spec|
        execute <<-EOQ
          INSERT INTO activity_reports_people (activity_report_id, person_id) VALUES (#{ar.id}, (SELECT id FROM people WHERE name = '#{spec}'))
        EOQ
      end
    end

    remove_column :activity_reports, :specialists
  end
end
