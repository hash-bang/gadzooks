/**
* Gadzooks
* A miscellany of adornments, accoutrements and other such trappings to Fallen London
*
* Herewith a package injection system which provides HTML, CSS and script support via a single loader
*
* This system is in no way associated with Failbetter games and provides absolutely no support for its use
* Here be dragons, and so forth.
*
* @author Matt Carter <m@ttcarter.com>
* @url https://github.com/hash-bang/gadzooks
*/
$(function() {
	// Main Gadzooks object - via $.gadzooks
	$.gadzooks = {
		/**
		* The base URL to load all resources from
		* This must sync with inject.js
		* @var string
		*/
		url: 'http://localhost',

		/**
		* Hash of loaded objects
		* @var object
		* @see load()
		*/
		loaded: {},

		/**
		* Gadzooks is ready and loaded
		* @var bool
		* @see init()
		*/
		ready: false,

		/**
		* How Gadzooks was loaded
		* ENUM of: 'unknown', 'inject'
		* @var string
		*/
		method: 'unknown',

		/**
		* Load one or multiple zook files
		* @param string,array file Either the single file or array of files to load
		* @returns object This chainable object
		* @see loaded
		*/
		load: function(file) {
			if (!$.gadzooks.ready) { // Not yet ready - defer until we are
				$(document).one('gadzooks.ready', function() {
					$.gadzooks.load(file);
				});
				return this;
			} else if (_.isArray(file)) { // If its an array, just keep calling ourselves with each item
				_.forEach(file, function(f) {
					$.gadzooks.load(f);
				});
				return this;
			}

			console.log('$.gadzooks.load(', file, ')');
		},

		/**
		* Number of external resources we are waiting on
		* @var number
		*/
		initLoading: 0,

		/**
		* Try to boot
		* Initialize all third party content and keep paging the browser until its loaded
		* Set $.gadzooks.ready to true when completed and fire 'gadooks.ready'
		* @returns object This chainable object
		* @see ready
		*/
		init: function() {
			// Inject all third party libraries
			$.gadzooks.initLoading = 1;
			$.getScript('http://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.min.js', function() { $.gadzooks.initLoading-- });

			// Main init worker object
			var initCheck = function() {
				console.log('$.gadzooks.init/check: Checking');
				if (!$.gadzooks.initLoading) {
					console.log('$.gadzooks.init/check: ready');
					$.gadzooks.ready = true;
					$(document).trigger('gadzooks.ready');
				} else {
					console.log('$.gadzooks.init/check: fail, retry');
					setTimeout(initCheck, 1000);
				}
			};
			initCheck();
			return this;
		},
	};
	// }}}

	$.gadzooks
		.init()
		.load([
			// Load individual zook files {{{
				'zooks/test.html'
			// }}}
		]);
});
