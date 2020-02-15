class TtaNeedsController < ApplicationController
  include JsonapiMethods

  def index
    @tta_needs = TtaNeed.where(grantee_id: params[:grantee_id])
    respond_to do |format|
      format.html
      format.api_json { render_models @tta_needs }
    end
  end

  def show
    @tta_need = TtaNeed.find params[:id]
    respond_to do |format|
      format.html
      format.api_json { render_model @tta_need }
    end
  end

  def create
    grantee = Grantee.find params[:grantee_id]
    need = grantee.tta_needs.build create_params
    if need.save
      render_model need, render_options: {status: :created}
    else
      render_errors need.errors, status: :unprocessable_entity
    end
  end

  private

  def create_params
    data = params.require(:data)
    attributes = data.require(:attributes).permit :narrative, :indicator, :start_date, topics: [], specialist_types_needed: []
    attributes[:topic_list] = attributes.delete :topics
    context = data.dig(:relationships, :context_link, :data)
    unless context.nil?
      attributes[:context_link_type] = context[:type].underscore.classify
      attributes[:context_link_id] = context[:id]
    end
    attributes
  end
end
