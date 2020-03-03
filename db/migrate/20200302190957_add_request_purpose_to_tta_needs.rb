class AddRequestPurposeToTtaNeeds < ActiveRecord::Migration[6.0]
  def change
    add_column :tta_needs, :purpose, :string, default: ""
  end
end
