class Question < ApplicationRecord
  belongs_to :company

  validates :question, presence: true
end
