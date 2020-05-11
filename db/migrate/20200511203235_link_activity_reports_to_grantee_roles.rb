class LinkActivityReportsToGranteeRoles < ActiveRecord::Migration[6.0]
  def change
    create_join_table :activity_reports, :grantee_roles
  end
end
