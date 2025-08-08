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
