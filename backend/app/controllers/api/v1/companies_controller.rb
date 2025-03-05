class Api::V1::CompaniesController < ApplicationController
  def index
    @user = User.find(params[:user_id])
    @companies = @user.companies
    render json: @companies
  end

  def create
    @user = User.find(params[:user_id])
    @company = @user.companies.new(company_params)

    if @company.save
      render json: @company, status: :created
    else
      render json: @company.errors, status: :unprocessable_entity
    end
  end

  private

  def company_params
    params.require(:company).permit(:name, :location)
  end
end
