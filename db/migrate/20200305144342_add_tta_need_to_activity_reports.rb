class AddTtaNeedToActivityReports < ActiveRecord::Migration[6.0]
  def change
    change_table :activity_reports do |t|
      t.references :tta_need, foreign_key: true
    end
  end
end
