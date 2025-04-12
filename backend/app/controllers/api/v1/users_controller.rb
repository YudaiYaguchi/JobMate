class Api::V1::UsersController < ApplicationController
  def index
    @users = User.all
    render json: @users
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
    @user = User.find_by_email(user_params[:email])
    if @user && @user.authenticate(user_params[:password])
      token = create_token(@user.id)
      render json: {token: token}
    else
      render status: :unauthorized
    end
  end

  def current
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

  private

  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end
end