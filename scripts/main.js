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
const header = document.querySelector('.header')
const hbar = document.querySelector('.header__bar')
const hbarMenuBtn = document.querySelector('.hbar__menubtn')
const hmenuLinkFirst = document.querySelector('.hmenu__link')
const mainMenu = document.querySelector('.menu')
const headerMenu = document.querySelector('.header__menu')
const menuWrapper = document.querySelector('.menu__wrapper')
let isOpenMainMenu = false

function showMinimalHbar() {
  hbar.classList.add('scrolled')
}
function hideMinimalHbar() {
  hbar.classList.remove('scrolled')
}

function hideMinimalHmenu() {
  headerMenu.classList.add('scrolled')
}
function showMinimalHmenu() {
  headerMenu.classList.remove('scrolled')
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
  if (window.scrollY) {
    showMinimalHbar()
    hideMainMenu()
    hideMinimalHmenu()
    hbarMenuBtn.classList.remove('active')
  } else {
    hideMinimalHbar()
    showMinimalHmenu()
  }
})

hmenuLinkFirst.addEventListener('mouseenter', (event) => {
  event.preventDefault()
  if (!hbarMenuBtn.classList.contains('active')) {
    showMainMenu()
    isOpenMainMenu = true
  }
})
hbar.addEventListener('mouseenter', (event) => {
  if (isOpenMainMenu && !hbarMenuBtn.classList.contains('active')) {
    hideMainMenu()
  }
})
mainMenu.addEventListener('mouseleave', (event) => {
  if (isOpenMainMenu && !hbarMenuBtn.classList.contains('active')) {
    hideMainMenu()
  }
})

hbarMenuBtn.addEventListener('click', () => {
  hbarMenuBtn.classList.toggle('active')
  if (hbarMenuBtn.classList.contains('active')) {
    headerMenu.classList.remove('scrolled')
    headerMenu.classList.add('light')
    mainMenu.classList.add('opened')
    hmenuLinkFirst.classList.add('active')
    listWrapper.style.position = 'relative'
  } else {
    headerMenu.classList.add('scrolled')
    headerMenu.classList.remove('light')
    mainMenu.classList.remove('opened')
    hmenuLinkFirst.classList.remove('active')
    setTimeout(() => {
      listWrapper.style.position = 'absolute'
    }, 400)
  }
})

// SUBLIST MENU
const menuLinks = document.querySelectorAll('.menu__link')
const menuLists = document.querySelectorAll('.menu__list')
const listWrapper = document.querySelector('.list-wrapper')
let maxHeightList = 0

function getMaxHeightList() {
  menuLists.forEach((menuList) => {
    const heightList = menuList.offsetHeight
    if (heightList > maxHeightList) maxHeightList = heightList
  })

  return maxHeightList
}
listWrapper.style.height = `${getMaxHeightList()}px`
menuLinks.forEach((menuLink) => {
  menuLink.addEventListener('mouseenter', (event) => {
    menuLinks.forEach((menuLink) => menuLink.classList.remove('active'))
    menuLists.forEach((menuList) => menuList.classList.remove('active'))
    menuLink.classList.add('active')

    const valueDataLink = menuLink.getAttribute('data-value')
    const currentMenuListItem = document.querySelector(
      `.menu__list[data-value="${valueDataLink}"]`
    )
    currentMenuListItem.classList.add('active')
  })
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
  grabCursor: false,
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

// RESULT SLIDER
const resultSliderContainer = document.querySelector('.reslider')

const reslider = new Swiper(resultSliderContainer, {
  slidesPerView: 1,
  centeredSlides: false,
  spaceBetween: 0,
  loop: false,
  grabCursor: false,
  allowTouchMove: false,

  navigation: {
    nextEl: '.reslider__navbutton-next',
    prevEl: '.reslider__navbutton-prev',
  },

  pagination: {
    el: '.reslider__pagination',
    clickable: false,
    type: 'fraction',
    formatFractionCurrent: function (number) {
      return number < 10 ? '0' + number : number
    },
    formatFractionTotal: function (number) {
      return number < 10 ? '0' + number : number
    },
    renderFraction: function (currentClass, totalClass) {
      return (
        '<span class="' +
        currentClass +
        '"></span>' +
        ' — ' +
        '<span class="' +
        totalClass +
        '"></span>'
      )
    },
  },
})

// COMPARISON
function initSliders() {
  const containers = document.querySelectorAll('.comparison__container')

  containers.forEach((container) => {
    const slider = container.querySelector('.comparison__slider')
    const beforeImage = container.querySelector('.comparison__image-before')
    let isDragging = false

    function startDrag(e) {
      isDragging = true
      updateSlider(e)
    }

    function drag(e) {
      if (!isDragging) return
      updateSlider(e)
    }

    function stopDrag() {
      isDragging = false
    }

    function updateSlider(e) {
      e.preventDefault()

      const rect = container.getBoundingClientRect()
      let clientX

      if (e.touches) {
        clientX = e.touches[0].clientX
      } else if (e.changedTouches) {
        clientX = e.changedTouches[0].clientX
      } else {
        clientX = e.clientX
      }

      const x = clientX - rect.left
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))

      slider.style.left = percentage + '%'
      beforeImage.style.clipPath = `polygon(0 0, ${percentage}% 0, ${percentage}% 100%, 0 100%)`
    }

    container.addEventListener('mousedown', startDrag)
    document.addEventListener('mousemove', drag)
    document.addEventListener('mouseup', stopDrag)

    container.addEventListener('touchstart', startDrag, { passive: false })
    document.addEventListener('touchmove', drag, { passive: false })
    document.addEventListener('touchend', stopDrag, { passive: false })

    container.addEventListener('selectstart', (e) => e.preventDefault())
    container.addEventListener('dragstart', (e) => e.preventDefault())
  })
}

document.addEventListener('DOMContentLoaded', initSliders)

//  PROCEDURES ACCORDION
const proceduresItems = document.querySelectorAll('.procedures__item')
const firstProceduresItem = document.querySelector('.procedures__item')

proceduresItems.forEach((proceduresItem) =>
  proceduresItem.addEventListener('mouseenter', (event) => {
    proceduresItems.forEach((proceduresItem) =>
      proceduresItem.classList.remove('active')
    )
    event.target.classList.add('active')
  })
)
