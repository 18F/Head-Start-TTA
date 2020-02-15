class TopicsController < ApplicationController
  include JsonapiMethods

  def index
    render_models Topic.all, model_options: {serializer: TopicSerializer}
  end

  def show
    render_model Topic.find(params[:id]), model_options: {serializer: TopicSerializer}
  end
end
