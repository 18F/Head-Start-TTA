module Monitoring
  class Base < JsonApiClient::Resource
    self.json_key_format = :dasherized_key

    self.site = Rails.configuration.x.ohsmon.base_url ||
      "https://#{Rails.application.credentials.basic_auth_user}:#{Rails.application.credentials.basic_auth_pass}@ohsmon.app.cloud.gov/api"
  end
end
