class EclkcApi
  BASE_API_ROUTE = "eclkc-apis/locator/api".freeze
  CENTER_API_ROUTE = "#{BASE_API_ROUTE}/center".freeze
  PROGRAM_API_ROUTE = "#{BASE_API_ROUTE}/program".freeze

  attr_reader :client
  def initialize
    @client = Faraday.new(
      url: "https://eclkc.ohs.acf.hhs.gov",
      headers: {"Content-Type" => "application/json"}
    )
  end

  def centers
    []
  end
end
