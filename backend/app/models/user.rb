class User < ApplicationRecord
  has_secure_password
  has_many :posts, dependent: :destroy

  validates :password, presence:true
  validates :email, presence:true, uniqueness:true
  validates :name, presence:true
end
