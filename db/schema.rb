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

ActiveRecord::Schema.define(version: 2020_01_08_193224) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "activity_reports", force: :cascade do |t|
    t.string "activity_id", null: false
    t.string "report_typ", null: false
    t.bigint "previous_activity_report_id"
    t.string "region"
    t.text "grantee_numbers", default: [], array: true
    t.string "state"
    t.string "status"
    t.string "activity_typ"
    t.string "purpose"
    t.date "start_date"
    t.date "end_date"
    t.decimal "duration"
    t.text "specialists", default: [], array: true
    t.string "primary_reason"
    t.text "narrative", default: ""
    t.text "next_steps", default: ""
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "grants", force: :cascade do |t|
    t.string "number", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

end
