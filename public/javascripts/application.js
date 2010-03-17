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

function updateLevel(level) {
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

Task = function() { /*main object*/ };
$.extend(Task, {
	getValue: function(attributeName, defaultValue) {
		var value = $.cookie(attributeName);
		if (value) {
			return value;
		} else {
			return defaultValue;
		};
	},

	getIntValue: function(attributeName, defaultValue) {
		return parseInt(Task.getValue(attributeName, defaultValue), 10);
	},

	setValue: function(attributeName, value) {
		$.cookie(attributeName, value);
	},

	calculateExperienceForLevel: function(level) {
		return Math.pow((level + 1), 2);
	},

	ding: function() {
		// @task.level += 1
		Task.level(Task.level() + 1);

		// @task.experience -= @task.experience_for_next_level
		Task.experience(Task.experience() - Task.experience_for_next_level());
		
		// @task.experience_for_next_level = @task.calculate_experience_for_next_level
		Task.experience_for_next_level(Task.calculateExperienceForLevel(Task.level()));
		
		updateLevel(Task.level());
	},
	
	clicks: function(newValue) {
		if (newValue) {
			return Task.setValue('clicks', newValue);
		} else {
			return Task.getIntValue('clicks', 0);
		}
	},
	
	clicks_to_complete: function(newValue) {
		if (newValue) {
			return Task.setValue('clicks_to_complete', newValue);
		} else {
			return Task.getIntValue('clicks_to_complete', 0);
		}
	},
	
	experience: function(newValue) {
		if (newValue) {
			return Task.setValue('experience', newValue);
		} else {
			return Task.getIntValue('experience', 0);
		}
	},
	
	experience_for_next_level: function(newValue) {
		if (newValue) {
			return Task.setValue('experience_for_next_level', newValue);
		} else {
			return Task.getIntValue('experience_for_next_level', 1);
		}
	},
	
	level: function(newValue) {
		if (newValue) {
			return Task.setValue('level', newValue);
		} else {
			return Task.getIntValue('level', 1);
		}
	},
	
	levelProgress: function() {
		return Math.round(100.0 * Task.experience() / Task.experience_for_next_level())
	},

	progress: function() {
		return Math.round(100.0 * Task.clicks() / Task.clicks_to_complete())
		
	}

});

function performTask() {
	var clicks = Task.clicks();
	Task.clicks(++clicks);

	var experience = Task.experience();
	Task.experience(experience + Task.level());

	var progress = Task.progress();
	setTaskProgress(progress);

	if (Task.experience() >= Task.experience_for_next_level()) {
		Task.ding()
	};
	setExperienceProgress(Task.levelProgress())

	return false;
}