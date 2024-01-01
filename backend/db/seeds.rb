# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end


require 'date'

user1 = User.create(name:"Chuah Zi Yang", email:"czyang2002@gmail.com", created_at: DateTime.now)
user2 = User.create(name:"Sally", email:"testetst@gmail.com", created_at: DateTime.now)


Post.create(name:"Calories", category:"Politics", status:"offline", description:"This is a test post", created_at: DateTime.now, environment:"Active", user:user1)
Post.create(name:"Ice Cream", category:"Events", status:"online", description:"This is a test post", created_at: DateTime.now, environment:"Active",user:user1)
Post.create(name:"Pizza", category:"Technology", status:"offline", description:"This is a test post", created_at: DateTime.now, environment:"Active",user:user1)
Post.create(name:"Niqqis", category:"Music", status:"online", description:"This is a test post", created_at: DateTime.now, environment:"Closed",user:user2)
Post.create(name:"Al Amman", category:"Politics", status:"offline", description:"This is a test post", created_at: DateTime.now, environment:"Active",user:user2)
