class Organization < ApplicationRecord
    has_many :users
    has_many :documents, through: :users
end
