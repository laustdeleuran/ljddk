/**
* Calendar
*
* @section project
*/
/*jslint plusplus: true, vars: true, browser: true, white:true*/
/*global require: true, Modernizr: true*/

define(['jquery'], function ($) {

	function Calendar ($container) {
		var instance = this;

		instance.$container = $container;
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
		console.log(this);
	};
	

	return Calendar;
});
