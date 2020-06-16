VCR.configure do |c|
  c.cassette_library_dir = "spec/cassettes"
  c.hook_into :faraday
  c.configure_rspec_metadata!
  c.default_cassette_options = {
    record: :new_episodes
  }
  c.filter_sensitive_data("<ECLKC_API_TOKEN>") { Rails.application.credentials.eclkc_api_token }
  c.ignore_localhost = true
end
