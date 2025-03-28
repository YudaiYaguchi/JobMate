class Api::V1::EntrySheetsController < ApplicationController
  before_action :set_user

  def index
    @entry_sheets = EntrySheet.joins(:company).where(companies: { user_id: @user.id })
    render json: @entry_sheets
  end

  def show
    @entry_sheet = EntrySheet.joins(:company).where(companies: { user_id: @user.id }).find_by(id: params[:id])

    if @entry_sheet
      render json: @entry_sheet, status: :ok
    else
      render json: { error: "Entry sheet not found" }, status: :not_found
    end
  end

  def create
    @company = @user.companies.find_by(id: entry_sheet_params[:company_id])
    
    unless @company
      return render json: { error: "Company not found" }, status: :not_found
    end
    
    @entry_sheet = EntrySheet.new(entry_sheet_params)

    if @entry_sheet.save
      render json: @entry_sheet, status: :ok
    else
      render json: @entry_sheet.errors, status: :unprocessable_entity
    end
  end

  def update
    @entry_sheet = EntrySheet.joins(:company).where(companies: { user_id: @user.id }).find_by(id: params[:id])
    
    unless @entry_sheet
      return render json: { error: "Entry sheet not found" }, status: :not_found
    end
    
    if @entry_sheet.update(entry_sheet_params)
      render json: @entry_sheet, status: :ok
    else
      render json: @entry_sheet.errors, status: :unprocessable_entity
    end
  end
  
  def destroy
    @entry_sheet = EntrySheet.joins(:company).where(companies: { user_id: @user.id }).find_by(id: params[:id])

    if @entry_sheet
      @entry_sheet.destroy
      head :no_content
    else
      render json: { error: "Entry sheet not found" }, status: :not_found
    end
  end

  private

  def set_user
    @user = User.find(1) 
  end

  def entry_sheet_params
    params.require(:entry_sheet).permit(:question, :answer, :max_length, :company_id)
  end
end
