class Company < ApplicationRecord
  belongs_to :user
  has_many :entry_sheets, dependent: :destroy
  validates :website_url, format: { with: /\A(http|https):\/\/[\S]+\z/, message: "must be a valid URL" }, allow_nil: true
end
