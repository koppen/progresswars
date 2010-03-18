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

function updateTaskProgress(percentage) {
	if (percentage >= 100) {
		// Get a new task after animating the progress bar
		callback = function() { document.location = '/tasks/create'; };
	} else {
		callback = null;
	};
	setProgress('.task .bar .progress', percentage, callback);
};

function updateExperienceProgress(percentage) {
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

Task = function() {};
$.extend(Task, {
	getValue: function(attributeName, defaultValue) {
		var value = $.cookie(attributeName);
		if (value) {
			return parseInt(value, 10);
		} else {
			return parseInt(defaultValue, 10);
		};
	},

	setValue: function(attributeName, value) {
		$.cookie(attributeName, value);
	},

	calculateExperienceForLevel: function(level) {
		return Math.pow((level + 1), 2);
	},

	ding: function() {
		Task.level(Task.level() + 1);
		Task.experience(Task.experience() - Task.experienceForNextLevel());
		Task.experienceForNextLevel(Task.calculateExperienceForLevel(Task.level()));
		updateLevel(Task.level());
	},
	
	clicks: function(newValue) {
		if (newValue) {
			return Task.setValue('clicks', newValue);
		} else {
			return Task.getValue('clicks', 0);
		}
	},

	clicksToComplete: function(newValue) {
		if (newValue) {
			return Task.setValue('clicks_to_complete', newValue);
		} else {
			return Task.getValue('clicks_to_complete', 0);
		}
	},
	
	experience: function(newValue) {
		if (newValue) {
			return Task.setValue('experience', newValue);
		} else {
			return Task.getValue('experience', 0);
		}
	},

	experienceForNextLevel: function(newValue) {
		if (newValue) {
			return Task.setValue('experience_for_next_level', newValue);
		} else {
			return Task.getValue('experience_for_next_level', 1);
		}
	},

	level: function(newValue) {
		if (newValue) {
			return Task.setValue('level', newValue);
		} else {
			return Task.getValue('level', 1);
		}
	},
	
	levelProgress: function() {
		return Math.round(100.0 * Task.experience() / Task.experienceForNextLevel());
	},

	progress: function() {
		return Math.round(100.0 * Task.clicks() / Task.clicksToComplete());
	},

	perform: function() {
		Task.clicks(Task.clicks() + 1);
		Task.experience(Task.experience() + Task.level());

		if (Task.experience() >= Task.experienceForNextLevel()) {
			Task.ding();
		};

		updateTaskProgress(Task.progress());
		updateExperienceProgress(Task.levelProgress());

		return false;
	}
});
