class LinkActivityPlansToGranteeRoles < ActiveRecord::Migration[6.0]
  def change
    create_join_table :activity_plans, :grantee_roles
  end
end
