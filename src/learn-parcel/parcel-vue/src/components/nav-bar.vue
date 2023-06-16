<template>
    <div class="nav-bar">
        <router-link to="/" class="nav-item">home</router-link>
        <router-link to="/about" class="nav-item">about</router-link>
        <router-link to="/news" class="nav-item">news</router-link>
    </div>
</template>

<script lang="ts">
export default {
    name: 'NavBar',
    setup() {
        return {}
    },
}
</script>

<style lang="less" scoped>
.nav-bar{
    .nav-item{
        margin: 0 12px;
        line-height: 32px;
        padding: 6px 10px;
    }
}
</style>