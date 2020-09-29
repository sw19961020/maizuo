<template>
    <v-touch v-on:swiperight="onSwipeRight">
        <div v-if="filminfo" class="all">
            <detail-header v-top :title=" filminfo.name "></detail-header>
            <div :style="{ backgroundImage:'url('+ filminfo.poster +')' }" style="height:260px;background-position: center;background-size:cover;"></div>
            <div class="allinfo">
                <h2>{{ filminfo.name }} <span>{{ filminfo.filmType.name }}</span></h2>
                <p class="p1">{{ filminfo.category }}</p>
                <p class="p2">{{ filminfo.premiereAt | datefilter}} 上映</p>
                <p class="p3">{{ filminfo.nation }} | {{ filminfo.runtime }}分钟</p>
                <p class="p4" :class="!isshow? 'show' : ''">
                    {{ filminfo.synopsis }}
                </p>
                <i :class="!isshow? 'iconfont icon-moreunfold' : 'iconfont icon-less'" @click="isshow = !isshow"></i>
            </div>
            <div class="actors">
                <h2>演职人员</h2>
                <detail-swiper className="starswiper" showNum="4">
                    <template slot="slide">
                        <div v-for="(data,index) in filminfo.actors" :key="index" class="swiper-slide">
                            <div :style="{backgroundImage:'url('+ data.avatarAddress+')'}" class="imgshow1"></div>
                            <h4>{{ data.name }}</h4>
                            <p>{{ data.role }}</p>
                        </div>
                    </template>
                </detail-swiper>
            </div>
            <div class="photos">
                <h2>剧照</h2>
                <detail-swiper className="photoswiper" showNum="2">
                    <template slot="slide">
                        <div v-for="(data,index) in filminfo.photos" :key="index" class="swiper-slide">
                            <div :style="{backgroundImage:'url('+ data +')'}"  @click="handlecheck(index)" class="imgshow2"></div>
                        </div>
                    </template>
                </detail-swiper>
            </div>
        </div>
    </v-touch>
</template>

<script>
import Vue from 'vue'
import moment from 'moment'
import http from '@/util/http'
import VueTouch from 'vue-touch'
import detailSwiper from '@/views/detail/detailSwiper'
import detailHeader from '@/views/detail/detailHeader'
import { ImagePreview } from 'vant'
import { mapMutations } from 'vuex'
// Vue.component('detailSwiper', detailSwiper)
// Vue.component('detailHeader', detailHeader)
Vue.use(VueTouch, { name: 'v-touch' })

Vue.directive('top', {
  inserted (el) {
    el.style.display = 'none'
    window.onscroll = function () {
      if ((document.documentElement.scrollTop || document.body.scrollTop) >= 40) {
        el.style.display = 'block'
      } else {
        el.style.display = 'none'
      }
    }
  },
  unbind (el) {
    window.onscroll = null
  }
})
Vue.filter('datefilter', (date) => {
  return moment(date * 1000).format('YYYY-MM-DD')
})
export default {
  data () {
    return {
      filminfo: null,
      isshow: false
    }
  },
  components: {
    detailHeader,
    detailSwiper
  },
  mounted () {
    this.hide()
    http({
      url: `/gateway?filmId=${this.$route.params.id}&k=3646459`,
      headers: {
        'X-Host': 'mall.film-ticket.film.info'
      }
    }).then(res => {
      this.filminfo = res.data.data.film
    })
  },
  destroyed () {
    this.show()
  },
  methods: {
    ...mapMutations('TabbarModule', ['hide', 'show']),
    handlecheck (index) {
      ImagePreview({
        images: [...this.filminfo.photos],
        startPosition: index,
        loop: false,
        closeable: true,
        closeIconPosition: 'top-left'
      })
    },
    onSwipeRight () {
      this.$router.back()
    }
  }
}
</script>

<style scoped lang="scss">
    .all{
        .allinfo{
            margin-top: 20px;
            position: relative;
            h2{
                margin-top: 10px;
                font-size: 18px;
            }
            p{
                margin-top: 6px;
                margin-top: 5px;
            }
            .p1{
                margin-top: 6px;
                font-size: 16px;
            }
            .p2{
                margin-top: 6px;
                font-size: 14px;
            }
            .p3{
                font-size: 14px;
            }
            .p4{
                font-size: 12px;
            }
            .show{
                height: 40px;
                overflow: hidden;
            }
            i{
                z-index: 100;
                width: 20px;
                left: 50%;
                text-align: center;
                margin-left: -10px;
                display: block;
                position: absolute;
                bottom: -20px;
            }
        }
        .actors{
            margin-top: 30px;
            background: white;
            h2{
                margin-bottom: 10px;
                font-size: 18px;
            }
            .swiper-slide{
                .imgshow1{
                    height: 90px;
                    background-size: cover;
                }
                h4{
                    font-size: 14px;
                    text-align: center;
                }
                p{
                    font-size: 12px;
                    text-align: center;
                }
            }
        }
        .photos{
            margin-bottom: 30px;
            background: white;
            h2{
                margin-top: 10px;
                font-size: 18px;
            }
            .swiper-slide{
                .imgshow2{
                    height: 100px;
                    background-size: cover;
                    background-repeat: no-repeat;
                }
            }
        }
    }
</style>
