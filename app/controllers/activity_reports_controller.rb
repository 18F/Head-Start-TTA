class ActivityReportsController < ApplicationController
  before_action :set_activity_report, only: [:show, :edit, :update, :destroy]

  def index
    @activity_reports = ActivityReport.all
  end

  def show
  end

  def new
  end

  def edit
  end

  def create
    file = params[:file]
    book = Creek::Book.new file.path, check_file_extension: false
    sheet = book.sheets.last

    success_counter = 0
    sheet.simple_rows.drop(4).each do |row|
      next if row["A"] == "Total"
      activity_report = ActivityReport.new row_to_attrs(params[:file_type], row)
      if activity_report.save
        success_counter += 1
      else
        Rails.logger.error "Error importing activity report: #{activity_report.errors.full_messages.join(". ")}"
      end
    end

    redirect_to activity_reports_path, notice: "Imported #{success_counter} activity reports"
  end

  def update
    respond_to do |format|
      if @activity_report.update(activity_report_params)
        format.html { redirect_to @activity_report, notice: "Activity report was successfully updated." }
        format.json { render :show, status: :ok, location: @activity_report }
      else
        format.html { render :edit }
        format.json { render json: @activity_report.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @activity_report.destroy
    respond_to do |format|
      format.html { redirect_to activity_reports_url, notice: "Activity report was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private

  def set_activity_report
    @activity_report = ActivityReport.find(params[:id])
  end

  def row_to_attrs(file_type, row)
    file_type == "gs" ? gs_row_to_attrs(row) : ec_row_to_attrs(row)
  end

  def ec_row_to_attrs(row)
    common_row_to_attrs(row).merge({
      report_typ: "EC",
      primary_reason: reason_for_service(ohs: row["T"], regional: row["U"], grantee: row["V"]),
      narrative: concat_narrative(row),
      next_steps: concat_next_steps(row),
    })
  end

  def gs_row_to_attrs(row)
    common_row_to_attrs(row).merge({
      report_typ: "GS",
      primary_reason: reason_for_service(monitoring: row["T"], regional: row["U"], quality: row["W"]),
      narrative: row["DG"],
      next_steps: row["DH"],
    })
  end

  def common_row_to_attrs(row)
    {
      activity_id: row["A"],
      previous_activity_report_id: previous_report(row["B"]),
      region: row["E"],
      grants: process_grants(row["F"].split(/,\s*/), row["G"].split(/,\s*/)),
      state: row["H"],
      status: row["I"],
      activity_typ: row["L"],
      purpose: row["J"],
      start_date: row["M"],
      end_date: row["N"],
      duration: row["O"],
      specialists: row["R"].split(/,\s*/),
    }
  end

  def process_grants(grant_numbers, grantee_names)
    grants = grant_numbers.map { |n| Grant.find_or_create_by(number: n) }
    if grants.length == grantee_names.length
      grants.zip(grantee_names) do |grant, name|
        grantee = Grantee.find_or_create_by(name: name)
        grantee.grants << grant unless grantee.grants.include?(grant)
      end
    end
    grants
  end

  def previous_report(previous_activity_id)
    return nil if previous_activity_id.blank?
    ActivityReport.select(:id).find_by(activity_id: previous_activity_id)&.id
  end

  def reason_for_service(ohs: nil, regional: nil, grantee: nil, monitoring: nil, quality: nil)
    return "Monitoring" if monitoring.present?
    return "OHS Priority" if ohs.present?
    return "Regional Office Priority" if regional.present?
    return "Grantee Request" if grantee.present?
    return "Promoting/Sustaining Program Quality" if quality.present?
    "Other"
  end

  def concat_narrative(row)
    [row["CM"], row["CY"], row["DH"], row["DQ"], row["DV"], row["EA"]].compact.join("\n")
  end

  def concat_next_steps(row)
    [row["CN"], row["CZ"], row["DI"], row["DR"], row["DW"], row["EB"]].compact.join("\n")
  end

  def activity_report_params
    params.require(:activity_report).permit %i[activity_id region state status activity_typ purpose start_date end_date duration]
  end
end
