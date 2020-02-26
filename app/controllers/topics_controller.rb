class TopicsController < ApplicationController
  include JsonapiMethods

  def index
    topics = if filter_params[:scope].present?
      Topic.where(scope: filter_params[:scope])
    else
      Topic.all
    end
    render_models topics
  end

  def show
    render_model Topic.find(params[:id])
  end

  def default_per_page
    100
  end
end
