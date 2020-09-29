<template>
    <div class="all">
        <div class="one">
            <film-swiper>
                <template slot="slide">
                    <div class="swiper-slide" v-for="(data,index) in filmswiperlist" :key="index">
                        <div :style=" {backgroundImage:'url('+data+')'} "
                            style="height:100%;width:100%;backgroundRepeat:no-repeat;backgroundSize:cover;"
                        ></div>
                    </div>
                </template>
            </film-swiper>
        </div>
        <div class="two">
            <ol>
                <router-link to="/film/nowplaying" tag="li" active-class="nowchoose">正在热映</router-link>
                <router-link to="/film/comingsoon" tag="li" active-class="nowchoose">即将上映</router-link>
            </ol>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
import Vue from 'vue'
import filmSwiper from './film/filmSwiper'
Vue.component('filmSwiper', filmSwiper)
export default {
  data () {
    return {
      filmswiperlist: ['https://pic.maizuo.com/usr/movie/57cb9b5889ea70e6ec5da639e1452583.jpg?x-oss-process=image/quality,Q_70', 'https://pic.maizuo.com/usr/movie/6655766a79fd9ac6b41715cf9a1f3aad.jpg?x-oss-process=image/quality,Q_70', 'https://pic.maizuo.com/usr/movie/fad9f1e9a5c38f3883d7f9b5e561e5fe.jpg?x-oss-process=image/quality,Q_70']
    }
  }
}
</script>

<style scoped lang="scss">
    .all{
        .one{
            ul{
                height: 150px;
                background: #f60;
            }
        }
        .two{
            position: sticky;
            top: 0;
            background: white;
            z-index: 10;
            ol{
                display: flex;
                justify-content: space-around;
                li{
                    text-align: center;
                    height: 40px;
                    line-height: 40px;
                    width: 30%;
                    &.nowchoose{
                        color: crimson;
                        border-bottom:4px solid crimson;
                    }
                }
            }
        }
    }
</style>
