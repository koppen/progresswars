function setProgress(bar, percentage) {
	$(bar).width('' + percentage + '%');
}

function setTaskProgress(percentage) {
	setProgress('.task .bar .progress', percentage);
	
	if (percentage >= 100) {
		// Get a new task
		document.location = '/tasks/create';
	}
}

function setExperienceProgress(percentage) {
	setProgress('.experience .bar .progress', percentage);
}

function setLevel(level) {
	$('.level .value').text(level);
}