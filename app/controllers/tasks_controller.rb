class TasksController < ApplicationController
  include JsonapiMethods

  def index
    tasks = Task.where(parent_id: params[:tta_need_id], parent_type: "TtaNeed")
    render_models tasks
  end

  def subtasks
    tasks = Task.where(parent_id: params[:id], parent_type: "Task")
    render_models tasks
  end

  def show
    task = Task.find params[:id]
    render_model task
  end

  def create
    task = if params[:tta_need_id].present?
      parent = TtaNeed.find(params[:tta_need_id])
      parent.tasks.build create_params
    else
      parent = Task.find(params[:id])
      parent.subtasks.build create_params
    end
    if task.save
      render_model task, render_options: {status: :created}
    else
      render_errors task.errors, status: :unprocessable_entity
    end
  end

  def update
    task = Task.find params[:id]
    if task.update update_params
      render_model task
    else
      render_errors task.errors, status: :unprocessable_entity
    end
  end

  private

  def create_params
    data = params.require(:data)
    attributes = data.require(:attributes).permit :status, :title, :notes, links: []
    attributes[:created_by_id] = data.dig(:relationships, :created_by, :data, :id) || current_user_id
    attributes[:assigned_to_id] = data.dig(:relationships, :assigned_to, :data, :id)
    attributes[:completed_by_id] = data.dig(:relationships, :completed_by, :data, :id)
    attributes
  end

  def update_params
    data = params.require(:data)
    attributes = data.require(:attributes).permit :status, :title, :notes, :completed_at, links: []
    assigned_to_id = data.dig(:relationships, :assigned_to, :data, :id)
    attributes[:assigned_to_id] = assigned_to_id if assigned_to_id.present?
    if attributes[:status] == "complete"
      attributes[:completed_by_id] = data.dig(:relationships, :completed_by, :data, :id) || current_user_id
      attributes[:completed_at] ||= Time.now.utc
    end
    attributes
  end
end
