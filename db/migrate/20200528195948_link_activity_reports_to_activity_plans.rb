class LinkActivityReportsToActivityPlans < ActiveRecord::Migration[6.0]
  def change
    change_table :activity_reports do |t|
      t.references :activity_plan
    end
  end
end
