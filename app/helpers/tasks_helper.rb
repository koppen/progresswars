module TasksHelper

  def progress_bar(progress = 0)
    content_tag 'div', '&nbsp;', :class => 'progress', :style => "width: #{progress.round}%"
  end

  def tagline
    [
      'Watching progress bars change has never been this much fun',
      'The ultimate game of being better than all your friends at watching progress bars change',
      'Countless hours of "fun"'
    ].rand
  end

end
