require 'jwt'

class ApplicationController < ActionController::API
  def authenticate
    authorization_header = request.headers[:authorization]
    if !authorization_header
      render status: :unauthorized
    else
      token = authorization_header.split(" ")[1]
      @user = find_user_from_token(token)
      render status: :unauthorized unless @user
    end
  end

  def create_token(user_id)
    payload = {user_id: user_id}
    secret_key = Rails.application.secret_key_base
    token = JWT.encode(payload, secret_key)

    return token
  end

  def find_user_from_token(token)
    begin
      secret_key = Rails.application.secret_key_base
      decoded_token = JWT.decode(token, secret_key)
      user_id = decoded_token[0]["user_id"]
      user = User.find(user_id)
      return user
    rescue JWT::DecodeError, ActiveRecord::RecordNotFound => e
      Rails.logger.error "Error finding user from token: #{e.message}"
      return nil
    end
  end
end
