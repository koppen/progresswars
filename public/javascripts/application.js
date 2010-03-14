function setProgress(bar, percentage) {
	$(bar).width('' + percentage + '%');
}

function setTaskProgress(percentage) {
	setProgress('.bar .progress', percentage);
}
