<template>
    <div  v-show="tabbarIsshow">
        <ul>
            <router-link tag="li" to="/cinema" active-class="nowchoose">
                <i class="iconfont icon-viewgallery"></i>
                <span>影院</span>
            </router-link>
            <router-link tag="li" to="/film" active-class="nowchoose">
                <i class="iconfont icon-training"></i>
                <span>影片</span>
            </router-link>
            <router-link tag="li" to="/center" active-class="nowchoose">
                <i class="iconfont icon-account"></i>
                <span>我的</span>
            </router-link>
        </ul>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('TabbarModule', ['tabbarIsshow'])
  }
}
</script>
<style scoped lang="scss">
    div{
        width: 100%;
        position: fixed;
        bottom: 0;
        background: #eee;
        z-index: 1000;
        ul{
            display: flex;
            li{
                height: 50px;
                text-align: center;
                flex: 1;
                font-size: 16px;
                display: flex;
                flex-direction: column;
                &.nowchoose{
                    color: crimson;
                }
                i{
                    margin-top: 4px;
                    font-size: 22px;
                }
            }
        }
    }
</style>
