class Api::V1::UserController < ApplicationController
  def index
    render json: { message: "Success User" }, status: :ok
    puts "post が成功"
  end
end
