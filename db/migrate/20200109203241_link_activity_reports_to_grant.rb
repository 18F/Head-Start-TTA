class LinkActivityReportsToGrant < ActiveRecord::Migration[6.0]
  def change
    reversible do |dir|
      dir.up do
        remove_column :activity_reports, :grantee_numbers
      end
      dir.down do
        add_column :activity_reports, :grantee_numbers, :text, array: true, default: []
      end
    end
    create_join_table :grants, :activity_reports
  end
end
