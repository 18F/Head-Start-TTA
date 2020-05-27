class TtaRequestPolicy < Struct.new(:user, :tta_request)
  def create?
    user&.ps?
  end
end
