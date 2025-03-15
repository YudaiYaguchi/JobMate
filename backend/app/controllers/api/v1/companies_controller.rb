class Api::V1::CompaniesController < ApplicationController
  def index
    @user = User.find(1)
    @companies = @user.companies
    render json: @companies
  end

  def create
    @user = User.find(1)
    company_data = params.require(:company).permit(:name, :selection_type, :selection_status, :selection_date, :selection_result)
    company_data[:selection_date] = company_data[:selection_date]&.gsub("T", " ")

    company_data.each do |key, value|
      company_data[key] = "-" if value.blank?
    end
    
    @company = @user.companies.new(company_data)

    if @company.save
      render json: @company, status: :ok
    else
      render json: @company.errors, status: :unprocessable_entity
    end
  end

  def update
    @user = User.find(1)
    @company = @user.companies.find(params[:id])
  
    company_data = params.require(:company).permit(:name, :selection_type, :selection_status, :selection_date, :selection_result)
    company_data[:selection_date] = company_data[:selection_date]&.gsub("T", " ")
  
    company_data.each do |key, value|
      company_data[key] = "-" if value.blank?
    end
  
    if @company.update(company_data)
      render json: @company, status: :ok
    else
      render json: @company.errors, status: :unprocessable_entity
    end
  end
  
  def destroy
    @user = User.find(1)
    @company = @user.companies.find(params[:id])

    if @company
      @company.destroy
    else
      render json: { error: "Company not found" }, status: :not_found
    end
  end  
end
