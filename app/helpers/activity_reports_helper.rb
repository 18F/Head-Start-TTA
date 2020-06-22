module ActivityReportsHelper
  def render_person_contact_info(person)
    result = []
    result << "<strong>Phone:</strong> #{person.phone_number}" if person.phone_number.present?
    result << "<strong>Email:</strong> #{mail_to person.email}" if person.email.present?
    sanitize result.join("<br/>")
  end
end
