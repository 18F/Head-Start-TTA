class AddInitiatedByToTtaNeed < ActiveRecord::Migration[6.0]
  def change
    add_column :tta_needs, :initiated_by, :string
  end
end
