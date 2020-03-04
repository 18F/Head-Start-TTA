class AddRequesterToTtaNeed < ActiveRecord::Migration[6.0]
  def change
    add_column :tta_needs, :requester_id, :bigint
  end
end
