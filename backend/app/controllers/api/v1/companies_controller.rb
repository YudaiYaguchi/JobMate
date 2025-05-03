require "date"

class Api::V1::CompaniesController < ApplicationController
  
  def index
    @companies = current_user.companies
    render json: @companies
  end

  def show
    @company = current_user.companies.find_by(id: params[:id])

    if @company
      render json: @company, status: :ok
    else
      render json: { error: "Company not found" }, status: :not_found
    end
  end

  def create
    company_data = params.require(:company).permit(:name, :selection_type, :selection_status, :selection_date, :selection_result)
    company_data[:selection_date] = formatted_date(company_data[:selection_date]) # YYYY/MM/DD hh:mm　形式に変換
    puts company_data[:selection_date]
    @company = current_user.companies.new(company_data)

    if @company.save
      render json: @company, status: :ok
    else
      render json: @company.errors, status: :unprocessable_entity
    end
  end

  def update
    @company = current_user.companies.find(params[:id])
  
    company_data = params.require(:company).permit(:name, :selection_type, :selection_status, :selection_date, :selection_result)
    company_data[:selection_date] = formatted_date(company_data[:selection_date]) # YYYY/MM/DD hh:mm　形式に変換
  
    if @company.update(company_data)
      render json: @company, status: :ok
    else
      render json: @company.errors, status: :unprocessable_entity
    end
  end
  
  def destroy
    @company = current_user.companies.find(params[:id])

    if @company
      @company.destroy
    else
      render json: { error: "Company not found" }, status: :not_found
    end
  end
end
