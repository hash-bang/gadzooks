if ($.gadzooks) {
	console.log('Gadzooks already loaded');
} else {
	var gadzooksURL = 'http://gadzooks.ap01.aws.af.cm';

	$('head').append('<script src="' + gadzooksURL + '/js/core.js"></script>');
	$(document).one('gadzooks.ready', function() {
		$.gadzooks.method = 'inject';
	});
}
