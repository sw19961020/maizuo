<template>
    <div class="allnow">
        <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check = "false"
        >
            <van-cell v-for="data in nowplayinglist" :key="data.filmId" @click="todetail(data.filmId)">
                <div class="alldiv">
                    <img :src="data.poster">
                    <div>
                        <h2>{{ data.name }}</h2>
                        <p>主演: {{ data.actors | namefilter }} </p>
                        <p>{{ data.nation }} | {{ data.runtime }}分钟</p>
                    </div>
                </div>
            </van-cell>
        </van-list>
    </div>

</template>

<script>
import Vue from 'vue'
import http from '@/util/http'
import { List, Cell } from 'vant'

Vue.use(List).use(Cell)

Vue.filter('namefilter', (name) => {
  if (name) {
    return name.map((res) => {
      return res.name
    }).join(' ')
  } else {
    return '暂无主演'
  }
})
export default {
  data () {
    return {
      nowplayinglist: [],
      loading: false,
      finished: false,
      num: 1,
      total: 0
    }
  },
  mounted () {
    http({
      url: '/gateway?cityId=310100&pageNum=1&pageSize=10&type=1&k=5839811',
      method: 'get',
      headers: {
        'X-Host': 'mall.film-ticket.film.list'
      }
    }).then(res => {
      this.nowplayinglist = res.data.data.films
      this.total = res.data.data.total
    })
  },
  methods: {
    todetail (id) {
      this.$router.push(`/detail${id}`)
    },
    onLoad () {
      if (this.nowplayinglist.length === this.total) {
        if (this.total !== 0) {
          this.finished = true
          return
        }
      }

      this.num++
      http({
        url: `/gateway?cityId=310100&pageNum=${this.num}&pageSize=10&type=1&k=136082`,
        method: 'get',
        headers: {
          'X-Host': 'mall.film-ticket.film.list'
        }
      }).then(res => {
        this.nowplayinglist = [...this.nowplayinglist, ...res.data.data.films]
        this.loading = false
      })
    }
  }
}
</script>

<style scoped lang="scss">
    .allnow{
            .alldiv{
                overflow: hidden;
                margin: 10px;
                img{
                    float: left;
                    height: 150px;
                    width: 120px;
                }
                div{
                    h2{
                        font-size: 18px;
                    }
                    p{
                        font-size: 15px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                }
        }
    }
</style>
