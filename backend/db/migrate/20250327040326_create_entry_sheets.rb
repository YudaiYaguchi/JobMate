class CreateEntrySheets < ActiveRecord::Migration[7.0]
  def change
    create_table :entry_sheets do |t|
      t.text :question
      t.text :answer
      t.integer :max_length
      t.references :company, null: false, foreign_key: true

      t.timestamps
    end
  end
end
