<template>
    <div>
        <van-index-bar :index-list="cityinfo" @select="handleClick">
            <div v-for="(data,index) in cityList" :key="index">
                <van-index-anchor :index="data.type"></van-index-anchor>
                <van-cell  v-for="item in data.list" :key="item.name" :title="item.name" @click="handleBack(item.name ,item.cityId)"/>
            </div>
        </van-index-bar>
    </div>
</template>

<script>
import http from '@/util/http'
import Vue from 'vue'
import { IndexBar, IndexAnchor, Toast, Cell } from 'vant'
import { mapMutations } from 'vuex'

Vue.use(IndexBar)
Vue.use(IndexAnchor).use(Cell)
export default {
  data () {
    return {
      cityList: []
    }
  },
  mounted () {
    http({
      url: '/gateway?k=7902929',
      headers: {
        'X-Host': 'mall.film-ticket.city.list'
      }
    }).then(res => {
      this.cityshow(res.data.data.cities)
    })
  },
  methods: {
    ...mapMutations('CityModule', ['changeCityName', 'changeCityId']),
    cityshow (datalist) {
      const letterArray = []
      for (let code = 65; code < 91; code++) {
        letterArray.push(String.fromCharCode(code))
      }
      letterArray.forEach((letter) => {
        var list = datalist.filter((v) => {
          return v.pinyin.substring(0, 1).toUpperCase() === letter
        })

        if (list.length > 0) {
          this.cityList.push({
            type: letter,
            list: list
          })
        }
      })
    },
    handleClick (index) {
      Toast(index)
    },
    handleBack (name, cityId) {
      this.changeCityName(name)
      this.changeCityId(cityId)

      this.$router.back() // 返回上一次的路由
    }
  },
  computed: {
    cityinfo () {
      return this.cityList.map((v) => {
        return v.type
      })
    }
  }
}
</script>

<style scoped lang="scss">

</style>
