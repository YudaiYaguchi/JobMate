class Api::V1::QuestionsController < ApplicationController

  def index
    @questions = Question.joins(:company).where(companies: { user_id: current_user.id })
    render json: @questions
  end

  def show
    @question = Question.joins(:company).where(companies: { user_id: current_user.id }).find_by(id: params[:id])

    if @question
      render json: @question, status: :ok
    else
      render json: { error: "Question not found" }, status: :not_found
    end
  end

  def create
    @company = current_user.companies.find_by(id: question_params[:company_id])
    puts @company
    unless @company
      return render json: { error: "Company not found" }, status: :not_found
    end
    
    @question = Question.new(question_params)

    if @question.save
      render json: @question, status: :ok
    else
      render json: @question.errors, status: :unprocessable_entity
    end
  end

  def update
    @question = Question.joins(:company).where(companies: { user_id: current_user.id }).find_by(id: params[:id])
    
    unless @question
      return render json: { error: "Question not found" }, status: :not_found
    end
    
    if @question.update(question_params)
      render json: @question, status: :ok
    else
      render json: @question.errors, status: :unprocessable_entity
    end
  end
  
  def destroy
    @question = Question.joins(:company).where(companies: { user_id: current_user.id }).find_by(id: params[:id])

    if @question
      @question.destroy
      head :no_content
    else
      render json: { error: "Question not found" }, status: :not_found
    end
  end

  private

  def question_params
    params.permit(:question, :answer, :company_id)
  end
end
