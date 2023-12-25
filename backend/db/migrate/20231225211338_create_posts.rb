class CreatePosts < ActiveRecord::Migration[7.1]
  def change
    create_table :posts do |t|
      t.string :name
      t.string :category
      t.string :status
      t.string :description
      t.string :environment

      t.timestamps
    end
  end
end
