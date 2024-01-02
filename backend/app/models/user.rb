class User < ApplicationRecord
  has_secure_password
  has_many :posts, dependent: :destroy

  validates :password, presence:true
end
