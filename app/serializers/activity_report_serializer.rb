class ActivityReportSerializer < BaseSerializer
  has_one :tta_need

  attributes :start_date, :contact_method, :created_at, :updated_at
  attribute(:activity_type) { object.activity_typ }

  def relationship_related_link(attribute)
    case attribute
    when :tta_need
      if object.tta_need_id.present?
        path_helper.tta_need_url(id: object.tta_need_id, host: base_url)
      end
    else
      super
    end
  end
end
