// HEADER SLIDER
const headerSliderBlock = document.querySelector('.hslider')

const items = [
  'Косметология: уходы, инъекции, лифтинг',
  'Коррекция фигуры и силуэта',
  'SPA и европейские массажи',
  'Велнес-программы и флоатация',
  'Beauty-услуги: волосы, ногти, макияж',
  'Тайские и балийские массажи',
]

const sourcesPng = [
  './assets/images/header/slide_1_min.png',
  './assets/images/header/slide_2_min.png',
  './assets/images/header/slide_3_min.png',
  './assets/images/header/slide_3_min.png',
  './assets/images/header/slide_3_min.png',
  './assets/images/header/slide_3_min.png',
]
const sourcesWebp = [
  './assets/images/header/slide_1_min.webp',
  './assets/images/header/slide_2_min.webp',
  './assets/images/header/slide_3_min.webp',
  './assets/images/header/slide_3_min.webp',
  './assets/images/header/slide_3_min.webp',
  './assets/images/header/slide_3_min.webp',
]

const updateScrollbar = (
  swiper,
  params = {
    scrollbarClass: '.hslider__scrollbar',
    maxWidthBar: '260px',
    minWidthBar: '145px',
  }
) => {
  const bars = document.querySelectorAll(`${params.scrollbarClass} .bar`)
  const fills = document.querySelectorAll(`${params.scrollbarClass} .bar .fill`)
  const current = swiper.realIndex

  bars.forEach((bar, i) => {
    bar.classList.remove('active')
    bar.style.width = i === current ? params.maxWidthBar : params.minWidthBar
  })

  if (bars[current]) {
    bars[current].classList.add('active')
  }

  fills.forEach((fill, i) => {
    fill.style.transition = 'none'
    fill.style.width = i < current ? '100%' : '0%'
  })

  const activeFill = fills[current]
  if (activeFill) {
    activeFill.style.width = '0%'
    activeFill.offsetHeight
    activeFill.style.transition = `width ${swiper.params.autoplay.delay}ms linear`
    activeFill.style.width = '100%'
  }
}

let headerSlider = new Swiper(headerSliderBlock, {
  slidesPerView: 1,
  centeredSlides: false,
  grabCursor: false,
  loop: true,
  speed: 700,

  autoplay: {
    delay: 7000,
    disableOnInteraction: false,
  },

  pagination: {
    el: '.hslider__pagination',
    clickable: true,
    renderBullet: function (index, className) {
      return `
        <div class="${className}">
          <span>${index + 1}</span>
          <p>${items[index]}</p>
          <picture>
            <source
              srcset="${sourcesWebp[index]}" type="image/webp" />
              <img
                src="${sourcesPng[index]}"
                alt="Мини иллюстрация"
                width="300"
                height="171"
                loading="lazy"
              />
          </picture>
        </div>
      `
    },
  },

  on: {
    init: function () {
      const scrollbar = document.querySelector('.hslider__scrollbar')

      scrollbar.innerHTML = items
        .map(() => `<span class="bar"><span class="fill"></span></span>`)
        .join('')

      updateScrollbar(this)
    },

    slideChange: function () {
      updateScrollbar(this)
    },
  },
})

// MENU & BAR
const hbar = document.querySelector('.header__bar')
const hbarMenuBtn = document.querySelector('.hbar__menubtn')
const hmenuLinkFirst = document.querySelector('.hmenu__link')
const mainMenu = document.querySelector('.menu')
const headerMenu = document.querySelector('.header__menu')

function showMinimalHbar() {
  hbar.classList.add('scrolled')
}
function hideMinimalHbar() {
  hbar.classList.remove('scrolled')
}

function showMainMenu() {
  hmenuLinkFirst.classList.add('active')
  hbar.classList.add('light')
  headerMenu.classList.add('light')
  mainMenu.classList.add('opened')
}
function hideMainMenu() {
  hmenuLinkFirst.classList.remove('active')
  hbar.classList.remove('light')
  headerMenu.classList.remove('light')
  mainMenu.classList.remove('opened')
  mainMenu.classList.remove('scrolled')
}

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    showMinimalHbar()
    hideMainMenu()
    headerMenu.classList.remove('scrolled')
    hbarMenuBtn.classList.remove('active')
  } else {
    hideMinimalHbar()
  }
})
hmenuLinkFirst.addEventListener('click', (event) => {
  event.preventDefault()
  if (
    hmenuLinkFirst.classList.contains('active') &&
    hbarMenuBtn.classList.contains('active')
  ) {
    hideMainMenu()
    hbarMenuBtn.classList.remove('active')
    headerMenu.classList.remove('scrolled', 'light')
  } else if (hmenuLinkFirst.classList.contains('active')) {
    hideMainMenu()
  } else {
    showMainMenu()
  }
})
hbarMenuBtn.addEventListener('click', () => {
  hbarMenuBtn.classList.toggle('active')
  if (hbarMenuBtn.classList.contains('active')) {
    headerMenu.classList.add('scrolled', 'light')
    mainMenu.classList.add('scrolled')
    hmenuLinkFirst.classList.add('active')
    mainMenu.classList.add('opened')
  } else {
    headerMenu.classList.remove('scrolled', 'light')
    mainMenu.classList.remove('scrolled')
    hmenuLinkFirst.classList.remove('active')
    mainMenu.classList.remove('opened')
  }
})

// SERVICES SLIDER
let swiperInstance = null

function initSwiperIfMobile() {
  const container = document.querySelector('.services__slider')

  if (!container) return

  const wrapper = container.querySelector('.services__grid')
  const slideList = wrapper.querySelectorAll('.services__item')

  const isMobile = window.innerWidth <= 768

  if (isMobile && !swiperInstance) {
    container.classList.add('swiper')

    wrapper.classList.add('swiper-wrapper')
    wrapper.style.display = 'flex'

    slideList.forEach((slide) => slide.classList.add('swiper-slide'))

    swiperInstance = new Swiper(container, {
      slidesPerView: 1.2,
      spaceBetween: 4,
      centeredSlides: false,
      grabCursor: true,
      loop: true,
    })
  }

  if (!isMobile && swiperInstance) {
    swiperInstance.destroy(true, true)
    swiperInstance = null

    container.classList.remove('swiper')
    wrapper.classList.remove('swiper-wrapper')
    slideList.forEach((slide) => slide.classList.remove('swiper-slide'))
  }
}

window.addEventListener('load', initSwiperIfMobile)
window.addEventListener('resize', () => {
  clearTimeout(window.__swiperTimer)
  window.__swiperTimer = setTimeout(initSwiperIfMobile, 200) // debounce
})

// MASSAGE PLAYER
const massageGrid = document.querySelector('.massage__grid')

massageGrid.addEventListener('click', (event) => {
  const { target } = event
  if (target.hasAttribute('data-video')) {
    const dataVIdeo = target.getAttribute('data-video')
    const frame = massageGrid.querySelector(`iframe[data-video='${dataVIdeo}']`)
    frame.src += '?autoplay=true'
    frame.style.display = 'block'
  }
})

// TRADITION SLIDER
const traditionSliderContainer = document.querySelector('.trslider')

const traditionSlider = new Swiper(traditionSliderContainer, {
  slidesPerView: 'auto',
  spaceBetween: 4,
  centeredSlides: false,
  grabCursor: true,
  loop: false,

  navigation: {
    nextEl: '.trslider__navbutton-next',
    prevEl: '.trslider__navbutton-prev',
  },
})

// STOCK SLIDER
const stockSliderContainer = document.querySelector('.stslider')

const stslider = new Swiper(stockSliderContainer, {
  slidesPerView: 'auto',
  centeredSlides: true,
  spaceBetween: 4,
  loop: true,
  initialSlide: 0,
  grabCursor: true,
  speed: 700,
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },

  navigation: {
    nextEl: '.stslider__navbutton-next',
    prevEl: '.stslider__navbutton-prev',
  },

  on: {
    init: function () {
      const scrollbar = document.querySelector('.stslider__scrollbar')

      scrollbar.innerHTML = items
        .map(() => `<span class="bar"><span class="fill"></span></span>`)
        .join('')

      updateScrollbar(this, {
        scrollbarClass: '.stslider__scrollbar',
        maxWidthBar: '260px',
        minWidthBar: '145px',
      })
    },

    slideChange: function () {
      updateScrollbar(this, {
        scrollbarClass: '.stslider__scrollbar',
        maxWidthBar: '140px',
        minWidthBar: '38px',
      })
    },
  },
})
