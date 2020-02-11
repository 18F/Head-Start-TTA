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

  def create
    tta_need = TtaNeed.find(params[:tta_need_id])
    task = tta_need.tasks.build create_params
    if task.save
      render_model task, render_options: {status: :created}
    else
      render_errors task.errors, status: :unprocessable_entity
    end
  end

  private

  def create_params
    data = params.require(:data)
    data.require(:attributes).permit :status, :title, :notes
  end
end
