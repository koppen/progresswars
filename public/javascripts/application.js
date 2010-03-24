UI = function() {};
$.extend(UI, {
	animateProgressBars: function () {
		var current_position = $('.progress').css('background-position').split(' ');
		var offset_x = parseInt(current_position[0], 10);
		var offset_y = parseInt(current_position[1], 10);

		var new_position = '' + ((offset_x - 1) % 22) + 'px ' + offset_y + 'px';
		$('.progress').css('background-position', new_position);
	},

	button: function() {
		return $('.button');
	},

	disableButton: function() {
		UI.button().addClass('disabled').css('opacity', 0.3).animate({opacity: 1}, 1000, function() { UI.enableButton(); });
	},

	enableButton: function() {
		UI.button().removeClass('disabled');
	},

	setProgress: function (bar, percentage, callback) {
		if (percentage < 0) {
			percentage = 0;
		};
		if (percentage > 100) {
			percentage = 100;
		};
		$(bar).animate({width: '' + percentage + '%'}, 1000, callback);
	},

	updateTaskProgress: function (percentage) {
		if (percentage >= 100) {
			// Get a new task after animating the progress bar
			callback = function() { document.location = '/tasks/create'; };
		} else {
			callback = function() { UI.enableButton(); };
		};
		UI.setProgress('.task .bar .progress', percentage, callback);
	},

	updateExperienceProgress: function (percentage) {
		UI.setProgress('.experience .bar .progress', percentage);
	},

	updateLevel: function (level) {
		var current_level = $(".level .value").text();
		if (current_level != level) {
			$(".level .value").text(level).hide('puff', {percent:500}, 1000).fadeIn();
		}
	}
});

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
		UI.updateLevel(Task.level());
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
		if (UI.button().hasClass('disabled')) {
			return false;
		}
		UI.disableButton();

		Task.clicks(Task.clicks() + 1);
		Task.experience(Task.experience() + Task.level());

		if (Task.experience() >= Task.experienceForNextLevel()) {
			Task.ding();
		};

		UI.updateTaskProgress(Task.progress());
		UI.updateExperienceProgress(Task.levelProgress());

		return false;
	}
});

function trackGoals() {
	$('.button').click(function() { if (pageTracker) { pageTracker._trackPageview('/g/button_clicked'); }});
	$('.link_to_mentalized').click(function() { if (pageTracker) { pageTracker._trackPageview('/g/link_to_mentalized'); }});
	$('.link_to_substancelab').click(function() { if (pageTracker) { pageTracker._trackPageview('/g/link_to_substancelab'); }});
	$('.link_to_twitter').click(function() { if (pageTracker) { pageTracker._trackPageview('/g/link_to_twitter'); }});
};
