class AddStartDateToTtaNeed < ActiveRecord::Migration[6.0]
  def change
    add_column :tta_needs, :start_date, :date
  end
end
