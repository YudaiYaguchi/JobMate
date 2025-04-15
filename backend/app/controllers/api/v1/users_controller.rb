class Api::V1::UsersController < ApplicationController
  skip_before_action :authenticate_request, only: [:login, :create]
  def index
  end

  def create
    @user = User.new(user_params)
    if @user.save
      token = create_token(@user.id)
      render json: {token: token}
    else
      render json: {errors: @user.errors}, status: :unprocessable_entity
    end
  end

  def login
    @user = User.find_by(email: user_params[:email])
    if @user && @user.authenticate(user_params[:password])
      token = create_token(@user.id)
      render json: {token: token}
    else
      render status: :unauthorized
    end
  end

  def get_current_user_info
    token = request.headers[:authorization]&.split(" ")&.last
    if token
      @user = find_user_from_token(token)
      if @user
        render json: {
          id: @user.id,
          name: @user.name
        }
      else
        render status: :unauthorized
      end
    else
      render status: :unauthorized
    end
  end

  def reset_password
    @user = User.find_by(email: user_params[:email])
    if @user
      @user.password = user_params[:password]
      @user.password_confirmation = user_params[:password]
      if @user.save
        render json: { message: "パスワードをリセットしました" }
      else
        render json: { errors: @user.errors }, status: :unprocessable_entity
      end
    else
      render json: { error: "ユーザーが見つかりません" }, status: :not_found
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end
end