# monkey patch response body to ensure that we pretty-format the JSON
# revisit after https://github.com/zipmark/rspec_api_documentation/pull/458
# is merged
module RspecApiDocumentation
  class RackTestClient < ClientBase
    def response_body
      last_response.body.force_encoding(Encoding::UTF_8)
    end
  end
end

RSpec.configure do |config|
  config.before(:each, type: :acceptance) do
    header "Content-Type", "application/vnd.api+json"
    header "Accept", "application/vnd.api+json"
  end
end

RspecApiDocumentation.configure do |config|
  config.format = :json
end
