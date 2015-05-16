/**
* Gadzooks!
* A miscellany of adornments, accoutrements and other such trappings to Fallen London
*
* Herewith a package injection system which provides HTML, CSS and script support via a single loader
*
* Gadzooks! is in no way associated with Failbetter games and provides absolutely no support for its use
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
		url: window.gadzooksDebug ? 'http://localhost' : 'http://gadzooks.hashbang.net',

		/**
		* Whether we are running in debug mode (determined in bootstrap by window.gadzooksDebug existing)
		* @var boolean
		*/
		debug: !!window.gadzooksDebug,

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
		* @param string|array file Either the single file or array of files to load
		* @returns object This chainable object
		* @see loaded
		*/
		load: function(file) {
			// Sanity checks {{{
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
			// }}}
			var id = file.split('/').reverse()[0].replace(/\.html/, ''); // Extract basename from file
			console.log('$.gadzooks.load(', file, ')');

			$.ajax({
				type: 'GET',
				dataType: 'text',
				cache: false,
				url: $.gadzooks.url + '/' + file,
				error: function(err) {
					console.log('Error while loading zook', err);
				},
				success: function(content) {
					var item = null; // Gets replaced with the Gadzooks package object on load
					var dom = $("<div>" + content + "</div>"); // jQuery gets angry unless there is only one parent
					$.debug = dom;
					// Extract the package JSON blob from the DOM {{{
					var domPackage = dom.find('script[type="application/zook"]');
					if (domPackage)
						domPackage.each(function(offset, raw) {
							item = JSON.parse($(raw).html());
						}).remove();
					if (!item) throw new Error("No <script type=\"gadzooks/package\">{ ... }</script> element found in" + file);
					// }}}
					dom.attr('id', 'zook-' + id);
					item.id = id;
					item.dom = dom;
					$.gadzooks.loaded[id] = item;
					$.gadzooks.setState(id);
				},
			});
		},

		/**
		* Set whether a zook is enabled or not
		* @param id string The ID of the zook in $.gadzooks.loaded
		* @param null|boolean state Either the implicit state to set to or null for defaults (or user setting if it overrides)
		* @param null|bool save Whether to save the setting after setting
		*/
		setState: function(id, state, save) {
			var actualState;
			var userSetting = localStorage.getItem('gadzooks.' + id + '.enabled');

			if (!$.gadzooks.loaded[id])
				throw new Error('Unknown zook: ' + id);

			// Sanity checks - Where do we get state from {{{
			if ($.gadzooks.loaded[id].forced) { // Always force this to be enabled
				actualState = true;
			} else if (_.isBoolean(state)) { // Being given an implicit state
				actualState = state;
			} else if (_.isString(userSetting)) { // User provides state (annoyingly as a string)
				actualState = userSetting == 'true' ? true : false;
			} else if (_.has($.gadzooks.loaded[id], 'default')) { // Zook provides default state
				actualState = $.gadzooks.loaded[id].default;
			}
			// }}}

			// Actually do something?
			if (actualState && !$.gadzooks.loaded[id].state) {
				$.gadzooks._zookLoad(id);
			} else if (!actualState && $.gadzooks.loaded[id].state) {
				$.gadzooks._zookUnLoad(id);
			}

			if (save) localStorage.setItem('gadzooks.' + id + '.enabled', actualState);
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
					if ($.gadzooks.debug) console.log('LOADING GADZOOKS! IN DEBUG MODE');
					$(document).trigger('gadzooks.ready');
				} else {
					console.log('$.gadzooks.init/check: fail, retry');
					setTimeout(initCheck, 1000);
				}
			};
			initCheck();
			return this;
		},

		// Helper functions {{{
		/**
		* Helper function to enable a zook
		* @param string id The zook to be enabled
		* @returns object This chainable object
		* @see setState
		*/
		enable: function(id) {
			$.gadzooks.setState(id, true, true);
			return this;
		},

		/**
		* Helper function to disable a zook
		* @param string id The zook to be enabled
		* @returns object This chainable object
		* @see setState
		*/
		disable: function(id) {
			$.gadzooks.setState(id, false, true);
			return this;
		},
		// }}}

		// Zook workers {{{
		/**
		* Actually load a zook
		* @access private
		* @param string id The ID of the zook to load
		* @returns object This chainable object
		* @see setState()
		*/
		_zookLoad: function(id) {
			console.log('$.gadzooks._zookLoad(' + id + ')');
			$('body').append($.gadzooks.loaded[id].dom);
			$.gadzooks.loaded[id].state = true;
			return this;
		},

		/**
		* Actually unload a zook
		* @access private
		* @param string id The ID of the zook to load
		* @returns object This chainable object
		* @see setState()
		*/
		_zookUnLoad: function(id) {
			console.log('$.gadzooks._zookUnLoad(' + id + ')');
			$('body').find('#zook-' + id).remove();
			$.gadzooks.loaded[id].state = false;
			return this;
		},
		// }}}
	};
	// }}}

	$.gadzooks
		.init()
		.load([
			// Load individual zook files {{{
			"zooks/back-bigger.html",
			"zooks/back-center.html",
			"zooks/big-clicks.html",
			"zooks/core-detect-tab-change.html",
			"zooks/disable-select.html",
			"zooks/display-card-frequency.html",
			"zooks/display-challenge-details.html",
			"zooks/echos-larger.html",
			"zooks/fagin.html",
			"zooks/help-disable.html",
			"zooks/help-remove-tab.html",
			"zooks/loader.html",
			"zooks/mobile-fixed-header.html",
			"zooks/mobile.html",
			"zooks/options-f12.html",
			"zooks/options-tab.html",
			"zooks/options.html",
			"zooks/remove-footers.html",
			"zooks/remove-graphic.html",
			"zooks/remove-headers.html",
			"zooks/remove-latest-news.html",
			"zooks/remove-prompts.html",
			"zooks/remove-rhb.html",
			"zooks/remove-share-feed.html",
			"zooks/remove-welcome.html",
			"zooks/rotated-tabs.html",
			"zooks/stats-cozy.html",
			"zooks/stats-move-right.html",
			"zooks/stats-no-icons.html",
			"zooks/test.html",
			"zooks/ui-checkboxes.html"
			// }}}
		]);
});
