ActiveAdmin.register MonitoringReport do
  permit_params :narrative, :report_date, :status, :grant_id, citation: []

  controller do
    def create
      parse_citation
      super
    end

    def update
      parse_citation
      super
    end

    private def parse_citation
      params["monitoring_report"]["citation"] = begin
                                                  JSON.parse(params["monitoring_report"]["citation"])
                                                rescue
                                                  []
                                                end
    end
  end

  form do |f|
    f.inputs "Details" do
      f.input :grant, collection: Grant.order(:number).map { |g| [g.number, g.id] }
      f.input :narrative
      f.input :citation
      f.input :report_date
      f.input :status, collection: ["Noncompliance", "Deficient"]
    end
    f.actions
  end
end
