module Monitoring
  class Base < JsonApiClient::Resource
    self.json_key_format = :dasherized_key

    self.site = if Rails.env.production?
      "https://#{Rails.application.credentials.basic_auth_user}:#{Rails.application.credentials.basic_auth_pass}@ohsmon.app.cloud.gov/api"
    else
      "http://localhost:5000/api"
    end
  end
end
