module Monitoring
  class Base < JsonApiClient::Resource
    self.json_key_format = :dasherized_key

    if Rails.env.production?
      self.site = "https://#{Rails.application.credentials.basic_auth_user}:#{Rails.application.credentials.basic_auth_pass}@ohsmon.app.cloud.gov/api"
    else
      self.site = "http://localhost:5000/api"
    end
  end
end
