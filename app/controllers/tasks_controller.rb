require 'ostruct'

class TasksController < ApplicationController
  before_filter :load_task_from_cookie
  after_filter :save_task_to_cookie

  def current
  end

  def create
    create_new_task
    redirect_to :action => :current
  end

  def perform
    @task.clicks += 1
    @task.experience += @task.level

    @progress = (100.0 * @task.clicks / @task.clicks_to_complete).round

    create_new_task if @task.clicks >= @task.clicks_to_complete
    ding if @task.experience >= @task.experience_for_next_level

    respond_to do |format|
      format.js 
      format.html { redirect_to :action => :current }
    end

    
  end

private

  def load_task_from_cookie
    @task = OpenStruct.new
    @task.name = cookies[:task] || build_task
    @task.clicks = (cookies[:clicks] || 0).to_i
    @task.level = (cookies[:level] || 1).to_i
    @task.experience = (cookies[:experience] || 0).to_i

    # Calculated values
    
    # We require level + 1 clicks to complete a task
    @task.clicks_to_complete = @task.level + 1
    @task.experience_for_next_level = (@task.level ** 2.5).ceil
  end

  def save_task_to_cookie
    cookies[:task] = @task.name
    cookies[:clicks] = @task.clicks
    cookies[:level] = @task.level
    cookies[:experience] = @task.experience
  end

  def ding
    @task.level += 1
  end

  def create_new_task
    @task.name = build_task
    @task.clicks = 0
  end

  def build_task
    verbs = ['ambush', 'collect', 'fish for', 'grow', 'harvest', 'hijack', 'plunder', 'raid', 'repel', 'sell', 'hijack', 'steal', 'chase away', 'rob', 'rough up']
    nouns = ['a drug runner', 'chinese merchant ships', 'dealers', 'eggplant', 'silk traders', 'soy beans', 'the Yakuza', 'guns', 'a semi', 'a tanker truck', 'thugs', 'your family', 'protection money', 'the warehouse']

    phrase = []
    phrase << verbs.rand
    phrase << nouns.rand
    phrase.join(' ').titlecase
  end

end
