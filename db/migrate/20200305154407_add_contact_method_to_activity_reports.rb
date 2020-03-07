class AddContactMethodToActivityReports < ActiveRecord::Migration[6.0]
  def change
    add_column :activity_reports, :contact_method, :string
  end
end
