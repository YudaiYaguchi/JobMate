class User < ApplicationRecord
  has_secure_password
  validates :name, presence: true
  validates :email, presence: true, uniqueness: true

  has_many :companies, dependent: :destroy
  has_many :todos, dependent: :destroy
end
