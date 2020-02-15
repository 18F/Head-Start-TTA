class BaseSerializer
  include JSONAPI::Serializer

  def path_helper
    context[:url_helpers]
  end

  def self_link
    super.tr("-", "_")
  end

  def relationship_self_link(attribute_name)
    # default to not including the self link
    nil
  end

  def relationship_related_link(attribute_name)
    super.tr("-", "_")
  end
end
