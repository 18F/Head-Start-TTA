class LinkTtaNeedsToTopics < ActiveRecord::Migration[6.0]
  def change
    create_join_table :tta_needs, :topics
  end
end
