function animateProgressBars() {
	var current_position = $('.progress').css('background-position').split(' ');
	var offset_x = parseInt(current_position[0], 10);
	var offset_y = parseInt(current_position[1], 10);

	var new_position = '' + ((offset_x - 1) % 22) + 'px ' + offset_y + 'px';
	$('.progress').css('background-position', new_position);
};

function setProgress(bar, percentage, callback) {
	$(bar).animate({width: '' + percentage + '%'}, 1000, callback);
};

function setTaskProgress(percentage) {
	if (percentage >= 100) {
		// Get a new task after animating the progress bar
		callback = function() { document.location = '/tasks/create'; };
	} else {
		callback = null;
	};
	setProgress('.task .bar .progress', percentage, callback);
};

function setExperienceProgress(percentage) {
	setProgress('.experience .bar .progress', percentage);
};

function setLevel(level) {
	var current_level = $(".level .value").text();
	if (current_level != level) {
		$(".level .value").text(level).hide('puff', {percent:500}, 1000).fadeIn();
	}
};

function trackGoals() {
	$('.button').click(function() { if (pageTracker) { pageTracker._trackPageview('/g/button_clicked'); }});
	$('.link_to_mentalized').click(function() { if (pageTracker) { pageTracker._trackPageview('/g/link_to_mentalized'); }});
	$('.link_to_substancelab').click(function() { if (pageTracker) { pageTracker._trackPageview('/g/link_to_substancelab'); }});
	$('.link_to_twitter').click(function() { if (pageTracker) { pageTracker._trackPageview('/g/link_to_twitter'); }});
};

