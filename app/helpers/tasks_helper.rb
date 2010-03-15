module TasksHelper

  def progress_bar(progress = 0)
    content_tag 'div', '&nbsp;', :class => 'progress', :style => "width: #{progress.round}%"
  end

  def tagline
    [
      'Watching progress bars change has never been this much fun',
      'The ultimate game of being better than all your friends at making progress bars change',
      'Countless hours of fun',
      'Just one more click...',
      'No mafias, no vikings, no pirates - just pure, uninterrupted progress bars',
      'Personalized missions - just for you'
    ].rand
  end

end
