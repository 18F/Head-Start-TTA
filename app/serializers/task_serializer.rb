class TaskSerializer < BaseSerializer
  has_one :parent

  attributes :status, :title, :notes, :created_at, :updated_at

  def relationship_related_link(attribute_name)
    case attribute_name
    when :parent
      path_helper.tta_need_url(id: object.parent_id, host: base_url)
    else
      super
    end
  end
end
