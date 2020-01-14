class ActivityReportsIndex < Chewy::Index
  define_type ActivityReport do
    field :narrative, analyzer: "english"
    field :next_steps, analyzer: "english"
    field :materials, value: ->(ar) { ar.materials.map(&:name) }
    field :topics, value: ->(ar) { ar.topics.map(&:name) }
    field :start_date, type: "date", include_in_all: false
    field :grantee_id, type: "keyword", include_in_all: false, value: ->(ar) { ar.grantees.map(&:id) }
  end
end
