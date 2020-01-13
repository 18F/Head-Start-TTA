module ActivityReportsHelper
  def pretend_we_have_proper_next_steps_fields(next_steps)
    if next_steps.blank?
      content_tag :p, "No next steps given"
    else
      html = Kramdown::Document.new(next_steps).to_html
      html.gsub!(/(Grantee Next Steps?):?/i) { "<h3>#{$1.titleize}</h3>" }
      html.gsub!(/(Specialist Next Steps?):?/i) { "<h3>#{$1.titleize}</h3>" }
      html.gsub!(/(Next Steps? Grantee):?/i) { "<h3>#{$1.titleize}</h3>" }
      html.gsub!(/(Next Steps? TTA):?/i) {
        "<h3>#{$1.titleize}</h3>".gsub("Tta", "TTA")
      }
      html.html_safe
    end
  end

  def pretend_we_have_proper_narrative_fields(narrative)
    html = Kramdown::Document.new(narrative).to_html
    html.gsub!(/(Anticipated Outcomes?):?/i) { "<h3>#{$1.titleize}</h3>" }
    html.gsub!(/Event Objective:?/i, "<h3>Event Objective</h3>")
    html.gsub!(/TTA Provided:?/i, "<h3>TTA Provided</h3>")
    html.gsub!(/(Progress towards? outcomes?):?/i) { "<h3>#{$1.titleize}</h3>" }
    html.html_safe
  end
end
