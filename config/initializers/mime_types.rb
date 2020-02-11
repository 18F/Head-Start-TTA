# Be sure to restart your server when you modify this file.

# Add new mime types for use in respond_to blocks:
# Mime::Type.register "text/richtext", :rtf

module JSONAPI
  MIMETYPE = "application/vnd.api+json"

  def self.underscore_keys(value)
    case value
    when Hash
      rtv = {}
      value.each do |k, v|
        rtv[k.underscore] = underscore_keys(v)
      end
      rtv
    when Array
      value.map { |v| underscore_keys(v) }
    else
      value
    end
  end
end
Mime::Type.register(JSONAPI::MIMETYPE, :api_json)

ActionDispatch::Http::Parameters::DEFAULT_PARSERS[:api_json] = ->(body) { JSONAPI.underscore_keys(JSON.parse(body)) }
ActionDispatch::Request.parameter_parsers = ActionDispatch::Request::DEFAULT_PARSERS
