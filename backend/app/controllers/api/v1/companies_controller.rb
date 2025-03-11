class Api::V1::CompaniesController < ApplicationController
  def index
    @user = User.find(1)
    @companies = @user.companies
    render json: @companies
  end

  def create
    @user = User.find(1)
    @company = @user.companies.new(company_params)
    
    unless @company.save
      render json: @company.errors, status: :unprocessable_entity
    end
  end

  private

  def company_params
    params.require(:company).permit(:name, :selection_type, :selection_status, :selection_date, :selection_result)
  end
end
