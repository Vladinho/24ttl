/*
 * author: Artyom Kayun
 * e-mail: kayun.artem@gmail.com
 */

$(function () {

	'use strict';

	var $mainMenu = $('#mainMenu'),
		$mainMenuOpen = $('.js-menu-open'),
		$mainMenuClose = $('.js-menu-close'),
		$mainMenuAnchor = $('.js-menu-anchor'),
		$mapOpen = $('.js-map-open'),
		$mapText = $('.js-map-text'),
		$mapBg = $('.js-map-bg'),
		$mapPlan = $('.js-map-plan'),
		$blockKeises = $('#keises'),
		$keiseContainer = $('.js-keise-open'),
		$keisePag = $('.js-keise-pag'),
		$keiseBtn = $('.js-keise-button'),
		$keiseSliderPrev = $('.js-keise-prev'),
		$toolsSliderPrev = $('.js-tools-prev'),
		$keiseSliderNext = $('.js-keise-next'),
		$toolsSliderNext = $('.js-tools-next'),
		$keiseBtnClose = $('.js-keise-close'),
		$sliderOpen = $('.js-slider-open'),
		$sliderClose = $('.js-slider-close'),
		$html = $('html'),
		$window = $(window),
		mainMenuOpenClass = 'menu_state_open',
		mapTextHideClass = 'map-wrap_state_hide',
		mapBgHideClass = 'map__bg_state_hide',
		keisePagHideClass = 'keises__pagination_state_hide',
		sliderOpenShowClass = 'keise-open_state_show',
		sliderOpenZClass = 'keises__open_z_11',
		keiseShowClass = 'keises-show',
		keiseWrapHideClass = 'keise-wrap_state_hide',
		keiseTitleHideClass = 'keise__title_state_hide',
		headerSlider, keisesSlider, keisesSliderOpen, toolsSlider,
		map, marker,
		flag = false,
		slidesObj = {
			width320: 3,
			width1300: 6,
			width1600: 6,
		};

	toolsSliderResize();
	$window.resize(function () {
		toolsSliderResize();
	});

	// раскрытие меню
	// disclosure menu

	$mainMenuOpen.on('click', function (event) {
		event.stopPropagation();
		$mainMenu.addClass(mainMenuOpenClass);

		$mainMenuClose.on('click', function () {
			$mainMenu.removeClass(mainMenuOpenClass);
		});

		$mainMenu.on('click', function (event) {
			event.stopPropagation();
		});

		$html.on('click', function () {
			$mainMenu.removeClass(mainMenuOpenClass);
		});
	});

	// слайдер в блоке header
	// slider in the block header

	headerSlider = new Swiper ('.header__slider', {
		mode: 'horizontal',
		speed: 500,
		simulateTouch: false,
		pagination: '.header__slider-pagination',
		paginationHide: false,
		paginationClickable: true,
		createPagination: true
	});

	// слайдер в блоке keises
	// slider in the block keises

	keisesSlider = new Swiper ('.keises__slider', {
		mode: 'horizontal',
		speed: 500,
		simulateTouch: false,
		pagination: '.keises__pagination',
		paginationHide: false,
		paginationClickable: true,
		createPagination: true
	});

	keisesSliderOpen = new Swiper ('.keises__open', {
		mode: 'horizontal',
		speed: 500,
		simulateTouch: false,
	});

	$keiseSliderPrev.on('click', function () {
		keisesSliderOpen.swipePrev();
	});

	$keiseSliderNext.on('click', function () {
		keisesSliderOpen.swipeNext();
	});

	$('.keise-open__slider').each(function () {
		var id = $(this).attr('id'),
			pag = $(this).parent().find('.keise-open__pagination').get(0),
			sliders = {};

		sliders[id] = new Swiper ('#' + id, {
			speed: 500,
			mode: 'vertical',
			simulateTouch: false,
			pagination: pag,
			paginationHide: false,
			paginationClickable: true,
			createPagination: true
		});

	});

	function mobileKeise() {
		if ($window.width() <= 320) {
			heightKeises();
		}
	}

	function heightKeises() {
		var keiseHeight = $sliderOpen.height();
		$blockKeises.css('height', keiseHeight);
	}

	$keiseContainer.each(function () {
		$(this).on('click', function () {
			var $this = $(this),
				classOpen = 'keises-open',
				classTopLeft = 'keises__slide-item_pos_tl',
				classTopRight = 'keises__slide-item_pos_tr',
				classBottomLeft = 'keises__slide-item_pos_bl',
				classBottomRight = 'keises__slide-item_pos_br',
				$keiseTopLeft = $('.' + classTopLeft),
				$keiseTopRight = $('.' + classTopRight),
				$keiseBottomLeft = $('.' + classBottomLeft),
				$keiseBottomRight = $('.' + classBottomRight),
				slideIndex;

			slideIndex = $this.attr('data-index');
			keisesSliderOpen.swipeTo(slideIndex, 0);

			$this.addClass(classOpen);
			$keisePag.addClass(keisePagHideClass);

			if ($window.width() <= 320) {
				$this.hide();
				$this.siblings().hide();
				mobileKeise();
				$sliderOpen.addClass(sliderOpenZClass);
				$sliderOpen.find('.keise-open').addClass(sliderOpenShowClass);

			} else {
				setTimeout(function () {
					$sliderOpen.addClass(sliderOpenZClass);
					$sliderOpen.find('.keise-open').addClass(sliderOpenShowClass);
				}, 1000);
			}

			setTimeout(function () {
				$keisePag.hide();
				$keiseBtn.addClass(keiseShowClass);
			}, 500);



			setTimeout(function () {
				$this.hide();
			}, 1500);

			setTimeout(function () {
				$this.show();
				$this.removeClass(classOpen);

				$keiseTopLeft.removeClass('keises-close_pos_l keises-close_pos_t keises-close_pos_tl');
				$keiseTopRight.removeClass('keises-close_pos_r keises-close_pos_tr keises-close_pos_t');
				$keiseBottomLeft.removeClass('keises-close_pos_b keises-close_pos_bl keises-close_pos_l');
				$keiseBottomRight.removeClass('keises-close_pos_br keises-close_pos_b keises-close_pos_r');

				$keiseTopLeft.addClass('keises-close_pos_tl');
				$keiseTopRight.addClass('keises-close_pos_tr');
				$keiseBottomLeft.addClass('keises-close_pos_bl');
				$keiseBottomRight.addClass('keises-close_pos_br');

				$this.find('.keise-wrap').removeClass(keiseWrapHideClass);
				$this.find('.keise__title').removeClass(keiseTitleHideClass);
			}, 1500);

			$this.find('.keise-wrap').addClass(keiseWrapHideClass);
			$this.find('.keise__title').addClass(keiseTitleHideClass);

			if ($this.hasClass(classTopLeft)) {
				$this.siblings('.' + classTopRight).addClass('keises-close_pos_r');
				$this.siblings('.' + classBottomLeft).addClass('keises-close_pos_b');
				$this.siblings('.' + classBottomRight).addClass('keises-close_pos_br');
			}

			if ($this.hasClass(classTopRight)) {
				$this.siblings('.' + classTopLeft).addClass('keises-close_pos_l');
				$this.siblings('.' + classBottomLeft).addClass('keises-close_pos_bl');
				$this.siblings('.' + classBottomRight).addClass('keises-close_pos_b');
			}

			if ($this.hasClass(classBottomLeft)) {
				$this.siblings('.' + classTopRight).addClass('keises-close_pos_tr');
				$this.siblings('.' + classTopLeft).addClass('keises-close_pos_t');
				$this.siblings('.' + classBottomRight).addClass('keises-close_pos_r');
			}

			if ($this.hasClass(classBottomRight)) {
				$this.siblings('.' + classTopRight).addClass('keises-close_pos_t');
				$this.siblings('.' + classBottomLeft).addClass('keises-close_pos_l');
				$this.siblings('.' + classTopLeft).addClass('keises-close_pos_tl');
			}

			$keiseBtnClose.each(function () {
				$(this).on('click', function () {
					var index = $(this).parent().parent().parent().parent().index(),
						keiseIndex = $sliderClose.find('[data-index=' + index + ']').parent().index();

					if ($window.width() <= 320) {
						$keiseContainer.show();
						$blockKeises.css('height', 550);
					}

					keisesSlider.swipeTo(keiseIndex, 0);
					$sliderOpen.find('.keise-open').removeClass(sliderOpenShowClass);
					setTimeout(function () {
						$sliderOpen.removeClass(sliderOpenZClass);
					}, 500);

					$keisePag.show();
					$keiseBtn.removeClass(keiseShowClass);

					setTimeout(function () {
						$keisePag.removeClass(keisePagHideClass);

						$keiseTopLeft.removeClass('keises-close_pos_tl');
						$keiseTopRight.removeClass('keises-close_pos_tr');
						$keiseBottomLeft.removeClass('keises-close_pos_bl');
						$keiseBottomRight.removeClass('keises-close_pos_br');

					}, 500);
				});
			});
		});
	});

	// слайдер в блоке tools
	// slider in the block tools

	function toolsSliderResize() {
		var slides;

		if ($window.width() <= 320) {
			slides = slidesObj.width320;
		} else if ($window.width() > 320 && $window.width() <= 1300) {
			slides = slidesObj.width1300;
		} else if ($window.width() > 1300) {
			slides = slidesObj.width1600;
		}

		if (!flag) {
			toolsSlider = new Swiper ('.tools__slider', {
				mode: 'horizontal',
				speed: 200,
				loop: true,
				spaceBetween: 10,
				slidesPerView: slides,
				simulateTouch: false
			});
			flag = !flag;

		} else {
			if (toolsSlider.params.slidesPerView !== slides) {
				toolsSlider.params.slidesPerView = slides;
				toolsSlider.reInit();
			}
		}

	}

	$toolsSliderPrev.on('click touchstart', function () {
		toolsSlider.swipePrev();
	});

	$toolsSliderNext.on('click touchstart', function () {
		toolsSlider.swipeNext();
	});


	// плавный скролл
	// smooth scrolling

	$mainMenuAnchor.on('click', function (event) {
		var elemId = $(this).attr('href'),
			elemPosition = $(elemId).offset().top;

		event.preventDefault();
		$mainMenu.removeClass(mainMenuOpenClass);
		$('html,body').animate({scrollTop: elemPosition}, 300);
	});

	// карта
	// map

	ymaps.ready(function () {
		map = new ymaps.Map('mapPlan', {
			center: [55.7715, 37.6120],
			zoom: 14,
			controls: [
				'geolocationControl',
				'routeEditor',
				'zoomControl',
				'typeSelector'
			]
		});
		marker = new ymaps.Placemark([55.7723, 37.5970]);
	});

	$mapOpen.on('click', function () {
		$mapText.addClass(mapTextHideClass);
		$mapBg.addClass(mapBgHideClass);
		$mapPlan.css('z-index', 2);

		setTimeout(function () {
			map.setCenter([55.7723, 37.5970], 17, {
				duration: 1000
			});
		}, 500);

		setTimeout(function () {
			map.geoObjects.add(marker);
		}, 1500);
	});

});
