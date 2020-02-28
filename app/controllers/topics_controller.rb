class TopicsController < ApplicationController
  include JsonapiMethods

  def index
    topics = if params[:tta_need_id].present?
      Topic.joins(:tta_needs).where(tta_needs: {id: params[:tta_need_id]})
    else
      Topic.all
    end
    topics = topics.where(scope: filter_params[:scope]) if filter_params[:scope].present?
    topics = topics.leaf_topics if filter_params[:group] == "false"
    render_models topics
  end

  def show
    render_model Topic.find(params[:id])
  end

  def default_per_page
    100
  end
end
