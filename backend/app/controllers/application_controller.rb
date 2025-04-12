require 'jwt'

class ApplicationController < ActionController::API
  before_action :authenticate_request

  def authenticate_request
    token = request.headers['Authorization']&.split(' ')&.last
    @current_user = find_user_from_token(token)
    render json: { error: 'Not Authorized' }, status: 401 unless @current_user
  end

  def current_user
    @current_user
  end

  def create_token(user_id)
    payload = { user_id: user_id }
    secret_key = Rails.application.secret_key_base
    JWT.encode(payload, secret_key)
  end

  private

  def find_user_from_token(token)
    return nil unless token
    
    begin
      secret_key = Rails.application.secret_key_base
      decoded_token = JWT.decode(token, secret_key)
      user_id = decoded_token[0]["user_id"]
      User.find_by(id: user_id)
    rescue JWT::DecodeError, ActiveRecord::RecordNotFound => e
      Rails.logger.error "Error finding user from token: #{e.message}"
      nil
    end
  end
end
