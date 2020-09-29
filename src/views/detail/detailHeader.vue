<template>
    <div class="detailHeader">
        {{ title }}
    </div>
</template>

<script>
export default {
  props: ['title']
}
</script>

<style scoped lang="scss">
    .detailHeader{
        height: 40px;
        line-height: 40px;
        text-align: center;
        background: white;
        position: fixed;
        z-index: 50;
        top: 0;
        width: 100%;
    }
</style>
