WW = window.innerWidth || document.clientWidth || document.getElementsByTagName('body')[0].clientWidth
WH = window.innerHeight || document.clientHeight || document.getElementsByTagName('body')[0].clientHeight
BODY = document.getElementsByTagName('body')[0]


document.addEventListener('DOMContentLoaded', function() {
	// Photo gallery
	let photoGallery = document.querySelector('.photo_gallery_info .swiper')

	if (photoGallery) {
		new Swiper('.photo_gallery_info .swiper', {
			loop: true,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			spaceBetween: 0,
			slidesPerView: 1,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			lazy: true
		})
	}


	// Tabs
	var locationHash = window.location.hash

	$('body').on('click', '.tabs .btn', function(e) {
		e.preventDefault()

		if (!$(this).hasClass('active')) {
			let parent = $(this).closest('.tabs_container'),
				activeTab = $(this).data('content'),
				activeTabContent = $(activeTab),
				level = $(this).data('level')

			parent.find('.tabs:first .btn').removeClass('active')
			parent.find('.tab_content.' + level).removeClass('active')

			$(this).addClass('active')
			activeTabContent.addClass('active')
		}
	})

	if (locationHash && $('.tabs_container').length) {
		let activeTab = $(`.tabs button[data-content="${locationHash}"]`),
			activeTabContent = $(locationHash),
			parent = activeTab.closest('.tabs_container'),
			level = activeTab.data('level')

		parent.find('.tabs:first .btn').removeClass('active')
		parent.find('.tab_content.' + level).removeClass('active')

		activeTab.addClass('active')
		activeTabContent.addClass('active')

		$('html, body').stop().animate({ scrollTop: $activeTabContent.offset().top }, 1000)
	}


	// Fancybox
	Fancybox.defaults.autoFocus = false
	Fancybox.defaults.trapFocus = false
	Fancybox.defaults.dragToClose = false
	Fancybox.defaults.placeFocusBack = false
	Fancybox.defaults.l10n = {
		CLOSE: 'Закрыть',
		NEXT: 'Следующий',
		PREV: 'Предыдущий',
		MODAL: 'Вы можете закрыть это модальное окно нажав клавишу ESC'
	}

	Fancybox.defaults.tpl = {
		closeButton: '<button data-fancybox-close class="f-button is-close-btn" title="{{CLOSE}}"><svg><use xlink:href="images/sprite.svg#ic_close"></use></svg></button>',

		main: `<div class="fancybox__container" role="dialog" aria-modal="true" aria-label="{{MODAL}}" tabindex="-1">
			<div class="fancybox__backdrop"></div>
			<div class="fancybox__carousel"></div>
			<div class="fancybox__footer"></div>
		</div>`,
	}


	// Modals
	$('.modal_btn').click(function(e) {
		e.preventDefault()

		Fancybox.close()

		Fancybox.show([{
			src: document.getElementById(e.target.getAttribute('data-modal')),
			type: 'inline'
		}])
	})


	// Zoom images
	Fancybox.bind('.fancy_img', {
		Image: {
			zoom: false
		},
		Thumbs: {
			autoStart: false
		}
	})


	// Mob. menu
	$('.mob_header .mob_menu_btn').click((e) => {
		e.preventDefault()

		$('.mob_header .mob_menu_btn').toggleClass('active')
		$('body').toggleClass('lock')
		$('header').toggleClass('show')

		$('.mob_header .mob_menu_btn').hasClass('active')
			? $('.overlay').fadeIn(300)
			: $('.overlay').fadeOut(300)
	})


	// Phone input mask
	const phoneInputs = document.querySelectorAll('input[type=tel]')

	if (phoneInputs) {
		phoneInputs.forEach(el => {
			IMask(el, {
				mask: '+{7} (000) 000-00-00',
				lazy: true
			})
		})
	}


	// Custom select - Nice select
	const selects = document.querySelectorAll('select:not(.skip)'),
		selectsInstances = []

	if (selects) {
		selects.forEach(el => {
			selectsInstances.push(NiceSelect.bind(el, {
				placeholder: el.getAttribute('data-placeholder')
			}))

			el.addEventListener('change', () => el.classList.add('selected'))

			if (el.querySelector('option[selected]')) {
				el.classList.add('selected')
			}
		})
	}


	if (is_touch_device()) {
		const subMenus = document.querySelectorAll('header .menu .sub_menu')

		// Submenu on the touch screen
		$('header .menu_item > a.sub_link').addClass('touch_link')

		$('header .menu_item > a.sub_link').click(function (e) {
			const dropdown = $(this).next()

			if (dropdown.css('visibility') === 'hidden') {
				e.preventDefault()

				subMenus.forEach(el => el.classList.remove('show'))
				dropdown.addClass('show')

				BODY.style = 'cursor: pointer;'
			}
		})

		// Close the submenu when clicking outside it
		document.addEventListener('click', e => {
			if ($(e.target).closest('.menu').length === 0) {
				subMenus.forEach(el => el.classList.remove('show'))

				BODY.style = 'cursor: default;'
			}
		})
	}


	// Clear filter
	$('.flats .clear_filter_btn').click(function(e) {
		e.preventDefault()

		$('.flats .filter').trigger('reset')

		selectsInstances.forEach(el => el.update())
	})

	$('.parkings .clear_filter_btn').click(function(e) {
		e.preventDefault()

		$('.parkings .filter').trigger('reset')

		selectsInstances.forEach(el => el.update())
	})


	// Flat views
	$('.flats .head .views .btn').click(function(e) {
		e.preventDefault()

		const parent = $(this).closest('.views'),
			flats = $(this).closest('.flats')

		parent.find('.btn').removeClass('active')
		$(this).addClass('active')

		!flats.find('.grid').hasClass('list')
			? flats.find('.row').addClass('list').removeClass('row')
			: flats.find('.list').addClass('row').removeClass('list')
	})


	// Parking views
	$('.parkings .head .views .btn').click(function(e) {
		e.preventDefault()

		const parent = $(this).closest('.views'),
			parkings = $(this).closest('.parkings')

		parent.find('.btn').removeClass('active')
		$(this).addClass('active')

		!parkings.find('.grid').hasClass('list')
			? parkings.find('.row').addClass('list').removeClass('row')
			: parkings.find('.list').addClass('row').removeClass('list')
	})


	// Menu
	$('.menu_btn, #menu .close_btn').click(function(e) {
		e.preventDefault()

		$('body').toggleClass('lock')
		$('#menu').toggleClass('show')
	})


	// Custom submit
	$('form').submit(function(e) {
		e.preventDefault()

		Fancybox.close()

		Fancybox.show([{
			src: document.getElementById('success_modal'),
			type: 'inline'
		}])
	})


	// Mob. filter
	$('.filter_btn, .filter .close_btn').click(function(e) {
		e.preventDefault()

		$('body').toggleClass('lock')
		$('.filter').toggleClass('show')
	})


	// Prealoder
	$('.preloader .logo').addClass('animate')

	setTimeout(() => $('.preloader').hide(), 2000)


	// Animate images
	const boxes = document.querySelectorAll('.img_animate')

	function scrollTracking(entries) {
		for (const entry of entries) {
			if (entry.intersectionRatio >= 0.2 && !entry.target.classList.contains('animated')) {
				entry.target.classList.add('animated')
			}
		}
	}

	const observer = new IntersectionObserver(scrollTracking, {
		threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
	})

	boxes.forEach(element => observer.observe(element))


	// First section
	$('.first_section .arrow_down').click(function(e) {
		e.preventDefault()

		handleScroll('down')
	})


	// Second section
	$('.second_section .clickable').click(function(e) {
		e.preventDefault()

		$('.animation').addClass($(this).data('step'))
	})


	// Included
	$('.included .arrow_down').click(function(e) {
		e.preventDefault()

		const currentBlock = $(this).closest('.section')

		const nextEl = currentBlock.next()

		if (nextEl.length) {
			nextEl[0].scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			})
		}
	})


	// Genplan
	$('.genplan .image svg path').mouseover(function(e) {
		e.preventDefault()

		$('.genplan #info' + $(this).data('info-id')).addClass('show')
	})


	$('.genplan .image svg path').mouseleave(function(e) {
		e.preventDefault()

		$('.genplan .info').removeClass('show')
	})


	$('.genplan .image svg path').click(function(e) {
		e.preventDefault()

		window.location.href = $(this).data('link')
	})


	const genplanImage = document.querySelector('.genplan .image'),
		genplanMobInfo = document.querySelector('.genplan .mob_info')

	if (genplanImage && genplanMobInfo) {
		genplanImage.addEventListener('scroll', () => {
			genplanImage.scrollLeft > 0
				? genplanMobInfo.classList.add('hide')
				: genplanMobInfo.classList.remove('hide')
		})
	}
})



let wheelHandled = false,
	animationStep = 0,
    touchStartY = 0

function handleScroll(direction) {
	if ($('.animation').length) {
		const atTop = window.scrollY === 0 || document.documentElement.scrollTop === 0

		if (!atTop || wheelHandled) return

		if (direction === 'down' && animationStep <= 5) {
			wheelHandled = true
			animationStep++

			$('.wrap').addClass('animate')
			$('.animation').addClass('step' + animationStep)

			setTimeout(() => {
				if (animationStep > 4) {
					$('.wrap').removeClass('animate')
				}

				wheelHandled = false
			}, 500)
		}

		if (direction === 'up' && animationStep > 0) {
			wheelHandled = true

			$('.wrap').addClass('animate')
			$('.animation').removeClass('step' + animationStep)

			animationStep--

			setTimeout(() => wheelHandled = false, 750)
		}
	}
}



window.addEventListener('resize', function () {
	WH = window.innerHeight || document.clientHeight || BODY.clientHeight

	let windowW = window.outerWidth

	if (typeof WW !== 'undefined' && WW != windowW) {
		// Overwrite window width
		WW = window.innerWidth || document.clientWidth || BODY.clientWidth


		// Mob. version
		if (!fakeResize) {
			fakeResize = true
			fakeResize2 = false

			document.getElementsByTagName('meta')['viewport'].content = 'width=device-width, initial-scale=1, maximum-scale=1'
		}

		if (!fakeResize2) {
			fakeResize2 = true

			if (windowW < 360) document.getElementsByTagName('meta')['viewport'].content = 'width=360, user-scalable=no'
		} else {
			fakeResize = false
			fakeResize2 = true
		}
	}
})


window.addEventListener('scroll', function () {
	// Infrastructure
	const scrollY = window.scrollY,
		speed = 0.25,
		offset = -scrollY * speed

    const element = document.querySelector('.infrastructure .bg')

	if (element) {
		element.style.transform = `translateY(${offset + element.offsetHeight}px)`
	}
})



let lastWheelTime = 0
const WHEEL_THROTTLE_MS = 750


function onWheel(event) {
	if (WW > 1279) {
		const now = Date.now()

		if (now - lastWheelTime < WHEEL_THROTTLE_MS) return

		const direction = event.deltaY > 0 ? 'down' : 'up'

		handleScroll(direction)

		lastWheelTime = now
	}
}


function onTouchStart(event) {
	if (WW > 1279) {
		touchStartY = event.touches[0].clientY
	}
}


function onTouchEnd(event) {
	if (WW > 1279) {
		const touchEndY = event.changedTouches[0].clientY,
			deltaY = touchStartY - touchEndY

		if (Math.abs(deltaY) > 30) {
			const direction = deltaY > 0 ? 'down' : 'up'

			handleScroll(direction)
		}
	}
}



window.addEventListener('wheel', onWheel, { passive: true })
window.addEventListener('touchstart', onTouchStart, { passive: true })
window.addEventListener('touchend', onTouchEnd, { passive: true })