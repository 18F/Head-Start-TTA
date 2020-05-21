class ActivityReportsController < ApplicationController
  include JsonapiMethods

  before_action :set_activity_report, only: [:show, :edit, :update, :destroy]

  def index
    @activity_reports = if params[:tta_need_id].present?
      ActivityReport.where(tta_need_id: params[:tta_need_id]).order(:start_date)
    else
      ActivityReport.all
    end
    respond_to do |format|
      format.html
      format.api_json { render_models @activity_reports }
    end
  end

  def show
    respond_to do |format|
      format.html
      format.api_json { render_model @activity_report }
    end
  end

  def new
  end

  def edit
  end

  def create
    if params[:tta_need_id].blank?
      create_via_upload
    else
      tta_need = TtaNeed.find params[:tta_need_id]
      report = tta_need.activity_reports.build json_api_params
      if report.save
        report.grants << tta_need.grants
        render_model report, render_options: {status: :created}
      else
        render_errors report.errors, status: :unprocessable_entity
      end
    end
  end

  def create_via_upload
    file = params[:file]
    @specialist_type = params[:file_type].upcase
    book = Creek::Book.new file.path, check_file_extension: false
    sheet = book.sheets.last

    success_counter = 0
    @headers = sheet.simple_rows.take(4)
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

  def json_api_params
    params.require(:data).require(:attributes).permit(
      :start_date,
      :end_date,
      :duration,
      :contact_method,
      grantee_role_ids: []
    ).tap do |attrs|
      attrs[:report_typ] = "GS"
      attrs[:activity_typ] = "Single Grantee"
    end
  end

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
      topic_list: ec_topics_tags(row),
      material_list: ec_materials_tags(row)
    })
  end

  def gs_row_to_attrs(row)
    common_row_to_attrs(row).merge({
      report_typ: "GS",
      primary_reason: reason_for_service(monitoring: row["T"], regional: row["U"], quality: row["W"]),
      narrative: row["DG"],
      next_steps: row["DH"],
      topic_list: gs_topics_tags(row),
      material_list: gs_materials_tags(row)
    })
  end

  def common_row_to_attrs(row)
    {
      activity_id: row["A"],
      previous_activity_report_id: previous_report(row["B"]),
      grants: process_grants(row["F"].split(/,\s*/), row["G"].split(/,\s*/), row["E"]),
      state: row["H"],
      status: row["I"],
      activity_typ: row["L"],
      purpose: row["J"],
      start_date: row["M"],
      end_date: row["N"],
      duration: row["O"],
      people: process_specialists(row["R"].split(/,\s*/)),
      contact_method: row["S"]
    }
  end

  def process_specialists(specialists)
    specialists.map do |name|
      Person.find_or_create_by(name: name) do |person|
        person.role = @specialist_type
        person.email = FFaker::Internet.safe_email
        person.phone_number = FFaker::PhoneNumber.short_phone_number
      end
    end
  end

  def process_grants(grant_numbers, grantee_names, region)
    grants = grant_numbers.map { |n|
      grant = Grant.find_or_create_by(number: n.strip)
      if grant.region.blank? && !region.match?(/,/)
        grant.region = region
        grant.save
      end
      grant
    }
    if grants.length == grantee_names.length
      grants.zip(grantee_names) do |grant, name|
        grantee = Grantee.find_or_create_by(name: name.strip)
        grantee.grants << grant unless grantee.grants.include?(grant)
      end
    end
    grants
  end

  def previous_report(previous_activity_id)
    return nil if previous_activity_id.blank?
    ActivityReport.select(:id).find_by(activity_id: previous_activity_id.strip)&.id
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

  def ec_topics_tags(row)
    tags = []
    last_column = "BJ"
    each_column_header("BJ", "CK") do |column|
      if !row[column].nil? && row[column] != "0"
        tags << "School Readiness"
        tags.concat ec_sr_topics(column, last_column)
        tags << @headers[3][column]
      end
      last_column = column
    end
    each_column_header("CO", "CX") do |column|
      if !row[column].nil? && row[column] != "0"
        tags << "Parent and Family Engagement"
        tags << present_of_two_options(1, column, last_column)
        tags << @headers[3][column]
      end
      last_column = column
    end
    each_column_header("DA", "DF") do |column|
      if !row[column].nil? && row[column] != "0"
        tags << "Professional Development"
        tags << present_of_two_options(1, column, last_column)
        tags << @headers[3][column]
      end
      last_column = column
    end
    each_column_header("DJ", "DO") do |column|
      if !row[column].nil? && row[column] != "0"
        tags << "Collaborations/Partnerships"
        tags << present_of_two_options(1, column, last_column)
        tags << @headers[3][column]
      end
      last_column = column
    end
    each_column_header("DS", "DT") do |column|
      if !row[column].nil? && row[column] != "0"
        tags << "Disaster Recovery"
        tags << "Other"
        tags << @headers[3][column]
      end
      last_column = column
    end
    each_column_header("DX", "DY") do |column|
      if !row[column].nil? && row[column] != "0"
        tags << "Other OHS Initiative"
        tags << "Other"
        tags << @headers[3][column]
      end
      last_column = column
    end
    tags
  end

  def ec_sr_topics(column, last_column)
    if column < "BR"
      [present_of_two_options(1, column, last_column)]
    elsif column < "CB"
      ["Caregiving and Teaching", present_of_two_options(2, column, last_column)]
    elsif column < "CH"
      ["CLASS Pre-K", present_of_two_options(2, column, last_column)]
    else
      [present_of_two_options(1, column, last_column)]
    end
  end

  def present_of_two_options(index, first, second)
    if @headers[index][first].present?
      @headers[index][first]
    else
      @headers[index][second]
    end
  end

  def ec_materials_tags(row)
    tags = []
    each_column_header("X", "BH") do |column|
      if !row[column].nil? && row[column] != "0"
        tags << ec_materials_parent(column)
        tags << @headers[3][column]
      end
    end
    tags
  end

  def ec_materials_parent(column)
    return "DTL" if column < "AL"
    return "ECHW" if column < "AS"
    return "PFCE" if column < "AZ"
    return "PMFO" if column < "BG"
    "Other"
  end

  def each_column_header(current, stop)
    loop do
      yield current
      break if current == stop
      current = current.next
    end
  end

  def gs_topics_tags(row)
    tags = []
    last_column = "BL"
    each_column_header("BL", "DE") do |column|
      if !row[column].nil? && row[column] != "0"
        tags << present_of_two_options(1, column, last_column)
        tags << @headers[3][column]
      end
    end
    tags
  end

  def gs_materials_tags(row)
    tags = []
    each_column_header("Z", "BH") do |column|
      if !row[column].nil? && row[column] != "0"
        tags << gs_materials_parent(column)
        tags << @headers[3][column]
      end
    end
    tags
  end

  def gs_materials_parent(column)
    return "DTL" if column < "AN"
    return "ECHW" if column < "AU"
    return "PFCE" if column < "BB"
    return "PMFO" if column < "BI"
    "Other"
  end

  def activity_report_params
    params.require(:activity_report).permit %i[activity_id region state status activity_typ purpose start_date end_date duration]
  end
end
