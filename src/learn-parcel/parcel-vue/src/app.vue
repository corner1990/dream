<template>
    <div class="learn-parcel">
        <h3>learn parcel vue3</h3>
        <NavBar />
        <router-view />
    </div>
</template>

<script lang="ts">
import NavBar from './components/nav-bar.vue';

export default {
    name: 'App',
    components: {
        NavBar
    },
    setup() {
        return {}
    },
}
</script>