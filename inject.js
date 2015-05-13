if ($.gadzooks) {
	console.log('Gadzooks already loaded');
} else {
	var gadzooksURL = 'http://gadzooks.hashbang.net';

	$('head').append('<script src="' + gadzooksURL + '/js/core.js"></script>');
	$(document).one('gadzooks.ready', function() {
		$.gadzooks.method = 'inject';
	});
}
