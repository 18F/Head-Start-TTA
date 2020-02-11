module JsonapiMethods
  extend ActiveSupport::Concern

  def page
    page = params[:page]&.[](:number)&.to_i || 1
    [page, 1].max
  end

  def per_page
    size = params[:page]&.[](:size)&.to_i || 25
    [size, 100].min
  end

  def filter_params
    @filter_params ||= params.fetch(:filter, {})
  end

  def render_model(model, model_options: {}, render_options: {})
    model_options[:is_collection] = false
    render_response model, model_options, render_options
  end

  def render_models(models, model_options: {}, render_options: {})
    model_options[:is_collection] = true
    models = models.page(page).per(per_page)
    model_options[:meta] ||= {}
    model_options[:meta]["current-page"] = models.current_page
    model_options[:meta]["total-pages"] = models.total_pages
    model_options[:meta]["total-count"] = models.total_count
    render_response models, model_options, render_options
  end

  def render_errors(errors, options = {})
    send_response JSONAPI::Serializer.serialize_errors(errors), options
  end

  private

  def render_response(object, serialize_options, render_options)
    serialize_options[:context] = serialize_options.fetch(:context, {}).merge jsonapi_context
    serialize_options[:include] = [serialize_options[:include], params[:include]].compact.join ","
    serialize_options[:fields] = serialize_options.fetch(:fields, {}).merge params.fetch(:fields, {}).permit!
    serialize_options[:base_url] = "#{request.protocol}#{request.host_with_port}"
    send_response JSONAPI::Serializer.serialize(object, serialize_options), render_options
  end

  def send_response(json, options = {})
    response.headers["Content-Type"] = "application/vnd.api+json"
    render options.merge(json: json)
  end

  def jsonapi_context
    {
      url_helpers: Rails.application.routes.url_helpers,
    }
  end
end
