module TasksHelper

  def progress_bar(progress = 0)
    content_tag 'div', '&nbsp;', :class => 'progress', :style => "width: #{progress.round}%"
  end

end
