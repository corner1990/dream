<template>
    <div class="nav-bar">
        <div class="nav-item" v-for="route in routes" :key="route.path" @click="toPage(route)">{{
            route.name
            }}</div>
    </div>
</template>

<script lang="ts">
import { RouteRecordRaw } from 'vue-router';
import router, {routes} from '../router/index';

export default {
    name: 'NavBar',
    setup() {
        
        const toPage = (route: RouteRecordRaw) => {
            const { path } = route;

            router.push({
            path
        })
        }
        return {
            routes,
            toPage
        }
    },
}
</script>

<style lang="less" scoped>
.nav-bar{
    display: flex;
    justify-content: flex-start;
    .nav-item{
        padding: 5px 10px;
        border: 1px solid #f8f8f8;
        margin: 0 10px;
        border-radius: 4px;
        cursor: pointer;
    }
}
</style>