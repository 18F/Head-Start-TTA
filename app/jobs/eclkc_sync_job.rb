class EclkcSyncJob < ApplicationJob
  queue_as :default

  def perform
  end

  private

  def api
    @api ||= EclkcApi.new
  end
end
