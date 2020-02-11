class TasksController < ApplicationController
  include JsonapiMethods

  def index
    tasks = Task.where(parent_id: params[:tta_need_id], parent_type: "TtaNeed")
    render_models tasks
  end

  def show
    task = Task.find params[:id]
    render_model task
  end
end
