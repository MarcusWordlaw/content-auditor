class CreateDocuments < ActiveRecord::Migration[5.2]
  def change
    create_table :documents do |t|
      t.string :content
      t.string :hashedmessage
      t.integer :user_id

      t.timestamps
    end
  end
end
