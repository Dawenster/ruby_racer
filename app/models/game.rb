require 'securerandom'

class Game < ActiveRecord::Base
  belongs_to :player

  before_create :url_generator

  def game_length
  
  end

  def url_generator
    url = SecureRandom.urlsafe_base64(10)
    self.url = url
  end

end
