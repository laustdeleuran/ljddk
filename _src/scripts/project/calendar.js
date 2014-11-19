/**
* Calendar
*
* @section project
*/
/*jslint plusplus: true, vars: true, browser: true, white:true*/
/*global require: true, Modernizr: true*/

define(['core', 'moment', 'jquery', 'clndr'], function (core, moment, $) {

	function Calendar ($container) {
		var instance = this;

		instance.$container = $container;
		instance.$template = $container.find('.calendar__template');
		instance.$content = $container.find('.calendar__content');
		instance.rest = $container.data('rest').replace('##TIMEMIN##', encodeURIComponent(moment().subtract(2, 'months').format()));

		instance.load();

		return instance;
	}
	Calendar.prototype.load = function () {
		var instance = this;

		$.ajax({
			url: instance.rest,
			dataType: 'json',
			error: function (xhr, status) {
				instance.$container.addClass('calendar--error');
				instance.$content.append('<div class="calendar__error">Error: &quot;' + status + '&quot;</div>');
			},
			success: function (data) {
				instance.data = data;
				instance.init();
			}
		});

		return instance;
	};
	Calendar.prototype.init = function () {
		var instance = this;

		instance.render(function () {
			instance.$container.addClass('calendar--init');
		});

		return instance;
	};
	Calendar.prototype.render = function (callback) {
		var instance = this;

		instance.clndr = instance.$content.clndr({
			weekOffset: 1,
			template: instance.$template.html(),
			events: instance.parseEvents(),
			doneRendering: callback
		});

		return instance;
	};
	Calendar.prototype.parseEvents = function () {
		var instance = this;

		instance.events = [];

		if (!instance.data || !instance.data.items) {
			new core.Error('Unable to parse JSON data from Google Calendar Data API');
			return instance.events;
		}

		$.each(instance.data.items, function (index, item) {
			instance.events.push({
				date: item.start.dateTime ? moment(item.start.dateTime).format('YYYY-MM-DD') : undefined,
				startTime: item.start.dateTime,
				endTime: item.end.dateTime,
				title: item.title,
				link: item.link,
				id: item.id
			});
		});

		return instance.events;
	};
	

	return Calendar;
});
