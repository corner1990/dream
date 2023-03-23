<template>
    <div class="learn-vite-vue3">
        <h2>learn vite vue3</h2>
        <NavBar />
        <router-view />
    </div>
</template>

<script>
import NavBar from './components/nav-bar.vue';
export default {
    components: {
        NavBar
    },
    setup() {
        return {}
    },
}
</script>