var gadzooksURL = 'http://localhost';

$('head').append('<script src="' + gadzooksURL + '/js/core.js"></script>');
$(document).one('gadzooks.ready', function() {
	$.gadzooks.method = 'inject';
});

// $('head').append('<link rel="stylesheet" href="' + bbURL + '/css/responsive.css" type="text/css" />');
