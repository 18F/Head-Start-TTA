class Topic
  def self.all
    ActsAsTaggableOn::Tag.joins(:taggings).where(taggings: {context: "topics"}).distinct
  end

  def self.find(id)
    ActsAsTaggableOn::Tag.find id
  end

  def self.for_grantee(grantee)
    all.where(taggings: {taggable_type: "ActivityReport", taggable_id: grantee.activity_reports.select(:id)})
  end
end
