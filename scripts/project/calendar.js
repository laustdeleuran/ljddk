/**
* Calendar
*
* @section project
*/
/*jslint plusplus: true, vars: true, browser: true, white:true*/
/*global require: true, Modernizr: true*/

define(['framework/core', 'jquery', 'clndr'], function (core, $) {

	function Calendar ($container) {
		var instance = this;

		instance.$container = $container;
		instance.$template = $container.find('.calendar__template');
		instance.$content = $container.find('.calendar__content');
		instance.jsonp = $container.data('jsonp');

		$.ajax({
			url: instance.jsonp,
			dataType: 'jsonp',
			error: function (xhr, status) {
				$container
					.addClass('calendar--error')
					.append('<div class="calendar__error">' + status + '</div>');
			},
			success: function (data) {
				instance.data = data;
				instance.init();
			}
		});

		return instance;
	}
	Calendar.prototype.init = function () {
		var instance = this;

		instance.render(function () {
			instance.$container.addClass('calendar--init');
		});

		return instance;
	};
	Calendar.prototype.render = function (callback) {
		var instance = this;

		instance.$content.clndr({
			template: instance.$template.html(),
			events: instance.parseEvents(),
			doneRendering: callback
		});

		return instance;
	};
	Calendar.prototype.parseEvents = function () {
		var instance = this;

		instance.events = [];

		if (!instance.data || !instance.data.feed || !instance.data.feed.entry || typeof instance.data.feed.entry !== 'object') {
			new core.Error('Unable to parse JSON data from Google Calendar Data API');
			return instance.events;
		}

		$.each(instance.data.feed.entry, function (index, item) {
			instance.events.push({
				date: item.gd$when[0].startTime
			});
		});

		return instance.events;
	};
	

	return Calendar;
});
