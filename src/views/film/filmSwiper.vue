<template>
    <div class="filmswiper">
       <div class="swiper-container">
            <div class="swiper-wrapper">
                <slot name="slide"></slot>
            </div>
            <!-- Add Arrows -->
            <!-- <div class="swiper-button-next"></div>
            <div class="swiper-button-prev"></div> -->
            <!-- Add Pagination -->
            <div class="swiper-pagination"></div>
        </div>
    </div>
</template>

<script>
import Swiper from 'swiper/bundle'
import 'swiper/swiper-bundle.min.css'
export default {
  mounted () {
    new Swiper('.swiper-container', {
      cssMode: true,
      pagination: {
        el: '.swiper-pagination'
      }
    })
  }
}
</script>

<style scoped lang="scss">
    .filmswiper{
        height: 200px;
        .swiper-container {
            width: 100%;
            height: 100%;
        }
    }

</style>
