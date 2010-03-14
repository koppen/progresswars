require 'ostruct'

class TasksController < ApplicationController
  before_filter :load_task_from_cookie
  after_filter :save_task_to_cookie

  def current
  end

  def create
    start_new_task
    redirect_to :action => :current
  end

  def perform
    @task.clicks += 1
    @task.experience += @task.level

    @task_progress = @task.task_progress

    # start_new_task if @task.clicks >= @task.clicks_to_complete
    ding if @task.experience >= @task.experience_for_next_level

    respond_to do |format|
      format.js 
      format.html { redirect_to :action => :current }
    end
  end

private

  def load_task_from_cookie
    @task = Task.new(cookies)
    logger.debug { "Loaded task: #{@task.inspect}" }
  end

  def save_task_to_cookie
    logger.debug { "Saving task: #{@task.inspect}" }

    cookies[:name] = @task.name
    cookies[:clicks] = @task.clicks
    cookies[:clicks_to_complete] = @task.clicks_to_complete
    cookies[:level] = @task.level
    cookies[:experience] = @task.experience
    cookies[:experience_for_next_level] = @task.experience_for_next_level
  end

  def ding
    @task.level += 1
    @task.experience -= @task.experience_for_next_level
    @task.experience_for_next_level = @task.calculate_experience_for_next_level
  end

  def start_new_task
    @task.name = @task.random_name
    @task.clicks = 0
    @task.clicks_to_complete = @task.level + 1
  end

end
