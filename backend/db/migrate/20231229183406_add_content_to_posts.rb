class AddContentToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :content, :string
  end
end
