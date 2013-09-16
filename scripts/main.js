/*
 * Vertic JS - Site functional wrapper
 * http://labs.vertic.com
 *
 * Copyright 2012, Vertic A/S
 *
 */

/*jslint plusplus: true, vars: true, browser: true, white:true*/
/*global require: true, Modernizr: true*/

require.config({
	paths: {
		'jquery': 'components/jquery/jquery',
	}
});

require(['framework/core', 'jquery'], function(core, $) {
	'use strict';

	// Expose core as vertic first for debugging reasons
	window.vertic = core;

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
				}//,
//				{
//					url: '/images/content/intro-2.jpg',
//					credit: 'Photo by <span class="fn n url">Kastania Rasmussen</span>'
//				},
//				{
//					url: '/images/content/intro-3.jpg',
//					credit: 'Photo by <a href="http://www.jordanisip.com" class="fn n url" target="_blank">Jordan Isip</a>'
//				},
//				{
//					url: '/images/content/intro-4.jpg',
//					credit: 'Photo by <a href="http://www.jordanisip.com" class="fn n url" target="_blank">Jordan Isip</a>'
//				}
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
		$('a:external').not(function () {
			return $(this).attr('href').indexOf(window.location.hostname);
		}).attr('target', '_blank');

	});
});
