class LinkEclkcModelsTogether < ActiveRecord::Migration[6.0]
  def change
    change_table :addresses do |t|
      t.references :addressable, polymorphic: true
    end
    change_table :centers do |t|
      t.references :program
    end
  end
end
