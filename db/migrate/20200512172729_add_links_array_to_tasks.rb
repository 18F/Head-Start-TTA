class AddLinksArrayToTasks < ActiveRecord::Migration[6.0]
  def change
    add_column :tasks, :links, :text, array: true, default: []
  end
end
