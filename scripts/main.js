/*
 * Site functional wrapper
 */

/*jslint plusplus: true, vars: true, browser: true, white:true*/
/*global require: true, Modernizr: true*/

require.config({
	paths: {
		'jquery': 'components/jquery/jquery',
	}
});

require([
	'framework/core',
	'jquery'
], function(
	core,
	$
) {
	'use strict';

	// Expose core
	window.ljd = core;

	// Document ready
	$(function () {

		// Detect intro load
		var $intro, $bg, $credit, $img, images, image;
		$intro = $('.intro');
		if ($intro.length) {
			images = [
				{
					url: '/images/content/intro-1.jpg',
					credit: 'Photo by <a href="http://www.jordanisip.com" class="fn n url" target="_blank">Jordan Isip</a>'
				},
				{
					url: '/images/content/intro-2.jpg',
					credit: 'Photo by <a href="https://www.facebook.com/kastania.rasmussen" class="fn n url" target="_blank">Kastania Rasmussen</span>'
				},
				{
					url: '/images/content/intro-3.jpg',
					credit: 'Photo by <a href="http://www.jordanisip.com" class="fn n url" target="_blank">Jordan Isip</a>'
				}
			];
			image = Math.floor( Math.random() * images.length );

			$bg = $intro.find('.intro__bg');
			$credit = $intro.find('.intro__credit');

			var src = images[image].url;
			$img = $('<img>').attr('src', src).on('load', function() {
				$bg.css('background-image', 'url(' + src + ')');
				$credit.html(images[image].credit);
				$img.remove();
				$intro.addClass('intro--init');
			});
		}

		// Make external links open in new windows
		$('a').not(function () {
			var href = $(this).attr('href');
			return href.indexOf(window.location.hostname) > -1 || href.indexOf('://') < 0;
		}).attr('target', '_blank');

		// Avoid widows
		(function ($) {
			$.fn.avoidWidows = function () {
				return this.each(function () {
					var $elem = $(this), wordArray = $elem.text().split(" ");
					if (wordArray.length > 1) {
						wordArray[wordArray.length-2] += "&nbsp;" + wordArray[wordArray.length-1];
						wordArray.pop();
						$elem.html(wordArray.join(" "));
					}
				});
			};
		}($));
		$('.post').find('h1, h2, h3').each (function () {
			var $header = $(this), $link = $header.children('a');
			if ($link.length) {
				$link.avoidWidows();
			} else {
				$header.avoidWidows();
			}
		});
	});
});
