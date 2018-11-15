$(function() {
	/**
	 * Scroll event
	 */
	function scrollHandler() {
		var revealLimit = $(window).height() * 0.7 + $(window).scrollTop();

		// Reveal elements on scroll
		$('.scroll-reveal').not('.is-revealed').each(function() {
			var element = $(this);

			var top = element.offset().top;

			if (revealLimit >= top) {
				element.trigger('reveal');
				element.addClass('is-revealed');
			}
		});

		// Parallax elements
		var maxScrollTop = $(document).height() - $(window).height();
		var scroll = $(window).scrollTop() / maxScrollTop;
		scroll = -1 + scroll * 2; // we want a value between -1 and 1

		$('.section-features .shape').each(function() {
			var shape = $(this);
			var shapeGap = 0;

			if (!shape.attr('data-gap')) {
				shapeGap = Math.random() * 400;
				shape.attr('data-gap', shapeGap);
			} else {
				shapeGap = Number(shape.attr('data-gap'));
			}

			shape.css({transform: 'translate3d(0, ' + ( shapeGap * scroll ) + 'px, 0)'});
		});
	}
	$(window).on('scroll', scrollHandler);


	/**
	 * Link scroll
	 */
	$('.link-scroll').on('click', function(e) {
		e.preventDefault();

		TweenMax.to(
			$('html, body'),
			1,
			{
				scrollTop: $('#love').offset().top - ( ( $(window).height() - $('#love').height() ) / 2 ),
				ease: Power3.easeInOut
			}
		);
	});


	/**
	 * Hero section
	 */
	function initHero() {
		// Selectors
		var hero = $('.hero');

		// Init lottie
		var lottieAnim = lottie.loadAnimation({
			container: hero.find('.lottie-container').get(0),
			renderer: 'svg',
			loop: false,
			autoplay: false,
			path: 'anim/hero-intro.json'
		});

		// Before animation
		hero.addClass('is-revealed');

		// Animation
		var tl = new TimelineMax();

		tl.call(function() {
			lottieAnim.play();
		});

		tl.staggerFrom(
			hero.find('.title .line'),
			0.5,
			{
				alpha: 0,
				y: 50,
				ease: Back.easeOut
			},
			0.1,
			0.3
		);

		tl.staggerFrom(
			hero.find('.link-scroll').find('.dot, .text'),
			0.3,
			{
				alpha: 0,
				y: 20,
				ease: Back.easeOut
			},
			0.1,
			0.6
		);
	}
	initHero();


	/**
	 * Quote
	 */
	function initQuote() {
		// Selectors
		var container = $(this);

		// Animation
		var tl = new TimelineMax();

		tl.staggerFrom(
			container.find('blockquote').find('.line, .mark'),
			0.5,
			{
				alpha: 0,
				y: 50,
				ease: Back.easeOut
			},
			0.1,
			0
		);

		tl.from(
			container.find('.illustration'),
			0.5,
			{
				alpha: 0,
				scale: 0.5,
				ease: Back.easeOut
			},
			0.3
		);
	}
	$('.section-quote .inner').on('reveal', initQuote);


	/**
	 * Section features
	 */
	function initFeature() {
		// Selectors
		var feature = $(this);
		var lottieIntroContainer = feature.find('.lottie-container.intro');
		var lottieLoopContainer = feature.find('.lottie-container.loop');

		// Init lottie
		var lottieIntroAnim = lottie.loadAnimation({
			container: lottieIntroContainer.get(0),
			renderer: 'svg',
			loop: false,
			autoplay: false,
			path: 'anim/' + lottieIntroContainer.attr('data-anim') + '.json'
		});

		if (lottieLoopContainer.length === 1) {
			lottieLoopContainer.hide();

			var lottieLoopAnim = lottie.loadAnimation({
				container: lottieLoopContainer.get(0),
				renderer: 'svg',
				loop: true,
				autoplay: false,
				path: 'anim/' + lottieLoopContainer.attr('data-anim') + '.json'
			});

			lottieIntroAnim.addEventListener('complete', function() {
				lottieIntroContainer.hide();
				lottieLoopContainer.show();

				lottieLoopAnim.play();
			});
		}

		// Animation
		var tl = new TimelineMax();

		tl.call(function() {
			lottieIntroAnim.play();
		});

		tl.staggerFrom(
			feature.find('.content > *'),
			0.5,
			{
				alpha: 0,
				y: 50,
				ease: Power3.easeOut
			},
			0.1,
			0
		);

	}
	$('.feature').on('reveal', initFeature);


	/**
	 * Form handler
	 */
	function formHandler(e) {
		// Selectors
		var form = $(this);
		var section = form.closest('.section-cta');
		var lottieIntroContainer = section.find('.lottie-container.intro');
		var lottieLoopContainer = section.find('.lottie-container.loop');

		// Init lottie
		var lottieIntroAnim = lottie.loadAnimation({
			container: lottieIntroContainer.get(0),
			renderer: 'svg',
			loop: false,
			autoplay: false,
			path: 'anim/cta-intro.json'
		});

		lottieLoopContainer.hide();
		var lottieLoopAnim = lottie.loadAnimation({
			container: lottieLoopContainer.get(0),
			renderer: 'svg',
			loop: true,
			autoplay: false,
			path: 'anim/cta-loop.json'
		});

		lottieIntroAnim.addEventListener('complete', function() {
			lottieIntroContainer.hide();
			lottieLoopContainer.show();

			lottieLoopAnim.play();
		});

		// Animation
		var tl = new TimelineMax();

		tl.staggerTo(
			section.find('.content'),
			0.3,
			{
				alpha: 0,
				y: 50,
				ease: Power1.easeIn
			}
		);

		tl.call(function() {
			lottieIntroAnim.play();
		}, null, null, 0.3);

		tl.staggerFromTo(
			section.find('.thank-you .line'),
			0.5,
			{
				alpha: 0,
				y: 50,
			},
			{
				alpha: 1,
				y: 0,
				ease: Power3.easeOut
			},
			0.1,
			0.7
		);

		e.preventDefault();
	}
	$('.section-cta form').on('submit', formHandler);
});

// Force scroll reveal animations on load
$(window).on('load', function() {
	$(window).trigger('scroll');
});