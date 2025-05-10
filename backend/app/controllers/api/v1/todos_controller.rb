class Api::V1::TodosController < ApplicationController
  before_action :set_todo, only: [:show, :update, :destroy]

  def index
    @todos = current_user.todos.order(updated_at: :desc)
    render json: @todos
  end

  # GET /api/v1/todos/:id
  def show 
    if @todo
       render json: @todo, status: :ok
    else
      render json: { error: "Todo not found" }, status: :not_found
    end
  end

  # POST /api/v1/todos/create
  def create
    todo_data = params.require(:todo).permit(:title, :date, :is_done, :priority)
    todo_data[:date] = formatted_date(todo_data[:date])
    @todo = current_user.todos.new(todo_data)
  
    if @todo.save
      render json: @todo, status: :ok
    else
      render json: @todo.errors, status: :unprocessable_entity
    end
  end
  
  # PUT /api/v1/todos/:id
  def update    
    todo_data = params.require(:todo).permit(:user_id, :title, :date, :is_done, :priority)
    todo_data[:date] = formatted_date(todo_data[:date])

    if @todo.update(todo_data)
      render json: @todo
    else
      render json: { errors: @todo.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /api/v1/todos/:id
  def destroy
    if @todo
      @todo.destroy
    else
      render json: { error: "Todo not found" }, status: :not_found
    end 
  end

  private


  def set_todo
    @todo = current_user.todos.find_by(id: params[:id])
  unless @todo
      render json: { error: 'Todo not found' }, status: :not_found
    end
  end
end
