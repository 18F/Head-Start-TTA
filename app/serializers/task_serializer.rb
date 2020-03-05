class TaskSerializer < BaseSerializer
  has_one :parent
  has_one :created_by
  has_one :assigned_to
  has_one :completed_by

  attributes :status, :title, :notes, :due_date, :created_at, :updated_at
  attribute(:subtasks_complete) { true }

  def relationship_related_link(attribute_name)
    case attribute_name
    when :parent
      path_helper.tta_need_url(id: object.parent_id, host: base_url)
    when :created_by
      path_helper.person_url(id: object.created_by_id, host: base_url)
    when :assigned_to
      if object.assigned_to_id.present?
        path_helper.person_url(id: object.assigned_to_id, host: base_url)
      end
    when :completed_by
      if object.completed_by_id.present?
        path_helper.person_url(id: object.completed_by_id, host: base_url)
      end
    else
      super
    end
  end
end
