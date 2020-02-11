class TtaNeedsController < ApplicationController
  include JsonapiMethods

  def show
    render_model TtaNeed.find(params[:id])
  end
end
