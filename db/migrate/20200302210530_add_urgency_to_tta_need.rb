class AddUrgencyToTtaNeed < ActiveRecord::Migration[6.0]
  def change
    add_column :tta_needs, :urgency, :string, default: "Normal"
  end
end
