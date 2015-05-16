/**
* Loads Gadzooks in debug mode
* Unlike the regular inject.js script this sets the window.gadzooksDebug flag which forces all resources to load from localhost
* @url https://github.com/hash-bang/gadzooks
*/
if ($.gadzooks) {
	console.log('Gadzooks already loaded');
} else {
	window.gadzooksDebug = true;
	var gadzooksURL = 'http://localhost';

	$('head').append('<script src="' + gadzooksURL + '/js/core.js"></script>');
	$(document).one('gadzooks.ready', function() {
		$.gadzooks.method = 'inject';
		$.gadzooks.debug = true;
	});
}
