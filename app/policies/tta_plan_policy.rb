class TtaPlanPolicy < Struct.new(:user, :tta_plan)
  def create?
    user.ecs?
  end
end
