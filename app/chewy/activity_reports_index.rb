class ActivityReportsIndex < Chewy::Index
  define_type ActivityReport do
    field :purpose, analyzer: "english"
    field :narrative, analyzer: "english"
    field :next_steps, analyzer: "english"
    field :materials, value: ->(ar) { ar.materials.map(&:name) }
    field :topics, value: ->(ar) { ar.topics.map(&:name) }
    field :start_date, type: "date", include_in_all: false
    field :grantee_id, type: "keyword", include_in_all: false, value: ->(ar) { ar.grantees.map(&:id) }
  end

  def self.for_grantee(grantee_id)
    filter(term: {grantee_id: grantee_id})
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
