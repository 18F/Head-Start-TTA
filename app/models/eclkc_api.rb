class EclkcApi
  BASE_API_ROUTE = "eclkc-apis/locator/api".freeze
  CENTER_API_ROUTE = "#{BASE_API_ROUTE}/center".freeze
  PROGRAM_API_ROUTE = "#{BASE_API_ROUTE}/program".freeze

  attr_reader :client, :response, :response_json
  def initialize
    @client = Faraday.new(
      url: "https://eclkc.ohs.acf.hhs.gov",
      params: {apikey: Rails.application.credentials.eclkc_api_token},
      headers: {"Content-Type" => "application/json"}
    )
  end

  def centers(query_params)
    @response = client.get(CENTER_API_ROUTE) { |req|
      req.params = req.params.merge query_params
    }
    @response_json = JSON.parse(response.body).with_indifferent_access
  end

  def programs(query_params)
    @response = client.get(PROGRAM_API_ROUTE) { |req|
      req.params = req.params.merge query_params
    }
    @response_json = JSON.parse(response.body).with_indifferent_access
  end

  def error_response?
    response_json.has_key?(:error) || response_json.has_key?(:errors)
  end
end
