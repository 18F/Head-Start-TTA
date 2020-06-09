# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_06_09_142823) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_admin_comments", force: :cascade do |t|
    t.string "namespace"
    t.text "body"
    t.string "resource_type"
    t.bigint "resource_id"
    t.string "author_type"
    t.bigint "author_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["author_type", "author_id"], name: "index_active_admin_comments_on_author_type_and_author_id"
    t.index ["namespace"], name: "index_active_admin_comments_on_namespace"
    t.index ["resource_type", "resource_id"], name: "index_active_admin_comments_on_resource_type_and_resource_id"
  end

  create_table "activity_plans", force: :cascade do |t|
    t.bigint "tta_need_id", null: false
    t.datetime "start_at", null: false
    t.datetime "end_at"
    t.string "format", null: false
    t.text "location"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["tta_need_id"], name: "index_activity_plans_on_tta_need_id"
  end

  create_table "activity_plans_grantee_roles", id: false, force: :cascade do |t|
    t.bigint "activity_plan_id", null: false
    t.bigint "grantee_role_id", null: false
  end

  create_table "activity_reports", force: :cascade do |t|
    t.string "activity_id", null: false
    t.string "report_typ", null: false
    t.bigint "previous_activity_report_id"
    t.string "state"
    t.string "status"
    t.string "activity_typ"
    t.string "purpose"
    t.date "start_date"
    t.date "end_date"
    t.decimal "duration"
    t.string "primary_reason"
    t.text "narrative", default: ""
    t.text "next_steps", default: ""
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "tta_need_id"
    t.string "contact_method"
    t.bigint "activity_plan_id"
    t.index ["activity_plan_id"], name: "index_activity_reports_on_activity_plan_id"
    t.index ["tta_need_id"], name: "index_activity_reports_on_tta_need_id"
  end

  create_table "activity_reports_grantee_roles", id: false, force: :cascade do |t|
    t.bigint "activity_report_id", null: false
    t.bigint "grantee_role_id", null: false
  end

  create_table "activity_reports_grants", id: false, force: :cascade do |t|
    t.bigint "grant_id", null: false
    t.bigint "activity_report_id", null: false
  end

  create_table "activity_reports_people", id: false, force: :cascade do |t|
    t.bigint "person_id", null: false
    t.bigint "activity_report_id", null: false
  end

  create_table "addresses", force: :cascade do |t|
    t.string "street1", null: false
    t.string "street2", default: ""
    t.decimal "longitude", null: false
    t.decimal "latitude", null: false
    t.string "city", null: false
    t.string "state", null: false
    t.string "postal_code", null: false
    t.string "postal_code_four", default: ""
    t.string "map_zoom_level", default: ""
    t.string "county", default: ""
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "grantee_roles", force: :cascade do |t|
    t.string "title", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "grantees", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "grants", force: :cascade do |t|
    t.string "number", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "grantee_id"
    t.string "region"
    t.index ["grantee_id"], name: "index_grants_on_grantee_id"
  end

  create_table "monitoring_reports", force: :cascade do |t|
    t.text "narrative", null: false
    t.text "citation", default: [], array: true
    t.date "report_date", null: false
    t.string "status", null: false
    t.bigint "grant_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.date "due_date"
    t.string "timeframe"
    t.text "citation_details"
    t.index ["grant_id"], name: "index_monitoring_reports_on_grant_id"
  end

  create_table "people", force: :cascade do |t|
    t.string "name", null: false
    t.string "role", null: false
    t.string "phone_number"
    t.string "email"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "person_grantee_links", force: :cascade do |t|
    t.bigint "person_id", null: false
    t.bigint "grantee_id", null: false
    t.boolean "grantee_employee", default: true
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["grantee_id"], name: "index_person_grantee_links_on_grantee_id"
    t.index ["person_id"], name: "index_person_grantee_links_on_person_id"
  end

  create_table "taggings", id: :serial, force: :cascade do |t|
    t.integer "tag_id"
    t.string "taggable_type"
    t.integer "taggable_id"
    t.string "tagger_type"
    t.integer "tagger_id"
    t.string "context", limit: 128
    t.datetime "created_at"
    t.index ["context"], name: "index_taggings_on_context"
    t.index ["tag_id", "taggable_id", "taggable_type", "context", "tagger_id", "tagger_type"], name: "taggings_idx", unique: true
    t.index ["tag_id"], name: "index_taggings_on_tag_id"
    t.index ["taggable_id", "taggable_type", "context"], name: "taggings_taggable_context_idx"
    t.index ["taggable_id", "taggable_type", "tagger_id", "context"], name: "taggings_idy"
    t.index ["taggable_id"], name: "index_taggings_on_taggable_id"
    t.index ["taggable_type"], name: "index_taggings_on_taggable_type"
    t.index ["tagger_id", "tagger_type"], name: "index_taggings_on_tagger_id_and_tagger_type"
    t.index ["tagger_id"], name: "index_taggings_on_tagger_id"
  end

  create_table "tags", id: :serial, force: :cascade do |t|
    t.string "name"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer "taggings_count", default: 0
    t.index ["name"], name: "index_tags_on_name", unique: true
  end

  create_table "tasks", force: :cascade do |t|
    t.string "status", default: "todo", null: false
    t.string "title", null: false
    t.text "notes", default: ""
    t.string "parent_type"
    t.bigint "parent_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "created_by_id"
    t.bigint "assigned_to_id"
    t.bigint "completed_by_id"
    t.datetime "due_date"
    t.datetime "completed_at"
    t.text "links", default: [], array: true
    t.index ["parent_type", "parent_id"], name: "index_tasks_on_parent_type_and_parent_id"
  end

  create_table "topics", force: :cascade do |t|
    t.string "name", null: false
    t.string "scope", null: false
    t.bigint "parent_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "topics_tta_needs", id: false, force: :cascade do |t|
    t.bigint "tta_need_id", null: false
    t.bigint "topic_id", null: false
  end

  create_table "tta_needs", force: :cascade do |t|
    t.bigint "grantee_id", null: false
    t.text "narrative"
    t.string "indicator", null: false
    t.string "context_link_type"
    t.bigint "context_link_id"
    t.text "specialist_types_needed", default: [], array: true
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.date "start_date"
    t.string "purpose", default: ""
    t.string "urgency", default: "Normal"
    t.bigint "requester_id"
    t.string "initiated_by"
    t.index ["context_link_type", "context_link_id"], name: "index_tta_needs_on_context_link_type_and_context_link_id"
    t.index ["grantee_id"], name: "index_tta_needs_on_grantee_id"
  end

  add_foreign_key "activity_plans", "tta_needs"
  add_foreign_key "activity_reports", "tta_needs"
  add_foreign_key "grants", "grantees"
  add_foreign_key "monitoring_reports", "grants"
  add_foreign_key "person_grantee_links", "grantees"
  add_foreign_key "person_grantee_links", "people"
  add_foreign_key "taggings", "tags"
  add_foreign_key "tta_needs", "grantees"
end
