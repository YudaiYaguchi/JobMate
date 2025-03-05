class CreateCompanies < ActiveRecord::Migration[7.0]
  def change
    create_table :companies do |t|
      t.string :name
      t.string :selection_type
      t.string :selection_status
      t.string :selection_date
      t.string :selection_result
      t.string :industry
      t.string :website_url

      t.timestamps
    end
  end
end
