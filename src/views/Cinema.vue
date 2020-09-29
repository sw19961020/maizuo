<template>
    <div>
        <van-nav-bar title="影院"  @click-left="onClickLeft" class="navbar" @click-right="onClickRight">
            <template #left>
                {{ name }}<van-icon name="arrow-down" color="black" />
            </template>
            <template #right>
                <van-icon name="search" size="24" color="black"/>
            </template>
        </van-nav-bar>
        <div  class="betterscroll" :style="{ height : height }">
            <van-list>
                <van-cell v-for="data in cinemaInfoList" :key="data.cinemaId">
                    <h5>{{ data.name }}</h5>
                    <p>{{ data.address }}</p>
                </van-cell>
            </van-list>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import BetterScroll from 'better-scroll'
import { NavBar, Icon, List, Cell } from 'vant'
import { mapActions, mapMutations, mapState } from 'vuex'

Vue.use(NavBar).use(Icon).use(List).use(Cell)
export default {
  data () {
    return {
      height: 0
    }
  },
  computed: {
    ...mapState('CinemaModule', ['cinemaInfoList']),
    ...mapState('CityModule', ['name', 'cityId'])
  },
  mounted () {
    this.height = document.documentElement.clientHeight - 100 + 'px'
    if (this.cinemaInfoList.length === 0) {
      // this.$store.dispatch('getCinemaInfo', this.cityId ).then(()=>{   //此处为为拆分store下的index文件时的写法
      //     this.$nextTick( ()=>{
      //         new BetterScroll('.betterscroll',{
      //             scrollbar : {
      //                 fade: true
      //             }
      //         })
      //     })
      // })
      this.getCinemaInfo(this.cityId).then(() => {
        this.$nextTick(() => {
          new BetterScroll('.betterscroll', {
            scrollbar: {
              fade: true
            }
          })
        })
      })
    } else {
      console.log('缓存')
      this.$nextTick(() => {
        new BetterScroll('.betterscroll', {
          scrollbar: {
            fade: true
          }
        })
      })
    }
  },
  methods: {
    ...mapActions('CinemaModule', ['getCinemaInfo']),
    ...mapMutations('CinemaModule', ['clearList']),
    onClickLeft () {
      // this.$store.commit('clearList')
      this.clearList()
      this.$router.push('/city')
    },
    onClickRight () {
      this.$router.push('./cinema/search')
    }
  }
}
</script>

<style scoped lang="scss">
    .navbar{
        height: 50px;
        line-height: 50px;
    }
    .betterscroll{
        position: relative;
        overflow: hidden;
        ul{
            li{
                margin-top: 5px;
                h5{
                    font-size: 14px;
                }
                p{
                    font-size: 12px;
                    color: gray;
                }
            }
        }
    }
</style>
