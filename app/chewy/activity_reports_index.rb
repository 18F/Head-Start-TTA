class ActivityReportsIndex < Chewy::Index
  define_type ActivityReport do
    field :purpose, analyzer: "english"
    field :narrative, analyzer: "english"
    field :next_steps, analyzer: "english"
    field :materials, value: ->(ar) { ar.materials.map(&:name) }
    field :topics, type: "text", value: ->(ar) { ar.topics.map(&:name) } do
      field :raw, type: "keyword"
    end
    field :start_date, type: "date", include_in_all: false
    field :grantee_id, type: "keyword", include_in_all: false, value: ->(ar) { ar.grantees.map(&:id) }
  end

  def self.for_grantee(grantee_id)
    filter(term: {grantee_id: grantee_id})
  end

  def self.filter_topic(topic)
    filter(term: {"topics.raw": topic})
  end

  def self.filter_start_date(date_math)
    unless /\A\d+[yMwd]\z/.match?(date_math)
      fail ArgumentError, "Invalid date range provided, should match /\\d+[yMwd]/"
    end
    filter do
      range :start_date do
        gte "now-#{date_math}/d"
      end
    end
  end

  def self.search(q)
    query do
      multi_match do
        query q
        fields [
          "purpose^20",
          "topics^10",
          "narrative",
          "next_steps",
          "materials",
        ]
      end
    end
  end
end
