<template>
    <div>
        <van-search
            v-model="value"
            show-action
            placeholder="请输入搜索关键词"
            @cancel="backCinema"
        />
        <van-list>
            <van-cell v-for="data in cinemaList" :key="data.cinemaId">
                <h5>{{ data.name }}</h5>
                <p>{{ data.address }}</p>
            </van-cell>
        </van-list>
    </div>
</template>

<script>
import Vue from 'vue'
import { Search, List, Cell } from 'vant'
import { mapActions, mapState } from 'vuex'

Vue.use(Search).use(List).use(Cell)
export default {
  data () {
    return {
      value: ''
    }
  },
  methods: {
    ...mapActions('CinemaModule', ['getCinemaInfo']),
    backCinema () {
      this.$router.replace('/cinema')
    }
  },
  computed: {
    ...mapState('CinemaModule', ['cinemaInfoList']),
    ...mapState('CityModule', ['cityId']),
    cinemaList () {
      if (this.value === '') {
        return []
      }
      return this.cinemaInfoList.filter(item => item.name.toUpperCase().includes(this.value.toUpperCase()) || item.address.toUpperCase().includes(this.value.toUpperCase()))
    }
  },
  mounted () {
    if (this.cinemaInfoList.length === 0) {
      // this.$store.dispatch('getCinemaInfo', this.$store.state.cityId )
      this.getCinemaInfo(this.cityId)
    } else {
      console.log('缓存')
    }
  }
}
</script>
