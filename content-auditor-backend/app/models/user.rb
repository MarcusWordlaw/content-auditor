class User < ApplicationRecord
    has_secure_password
    validates_presence_of :email 
    validates_uniqueness_of :email
    belongs_to :organization
    has_many :documents

    def User.digest(string)
        cost = ActiveModel::SecurePassword.min_cost ? BCrypt::Engine::MIN_COST :
                                                      BCrypt::Engine.cost
        BCrypt::Password.create(string, cost: cost)
    end
end
