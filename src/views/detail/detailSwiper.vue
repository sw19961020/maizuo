<template>
    <div class="swiper-container" :class="className">
        <div class="swiper-wrapper">
            <slot name="slide"></slot>
        </div>
    </div>
</template>

<script>
import Swiper from 'swiper/bundle'
import 'swiper/swiper-bundle.min.css'
export default {
  props: {
    className: {
      type: String,
      default: 'starswiper'
    },
    showNum: {
      type: String,
      default: '3'
    }
  },
  mounted () {
    new Swiper('.' + this.className, {
      slidesPerView: this.showNum,
      spaceBetween: 20,
      freeMode: true
    })
  }

}
</script>
