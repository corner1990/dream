<template>
 <div>
    <h3>learn vue ui</h3>
    <br />
     <div class="btn-demo">
        <v-button type="primary" ghost>Primary</v-button>
        <v-button ghost>Default</v-button>
        <v-button type="dashed" ghost>Dashed</v-button>
        <v-button danger ghost>Danger</v-button>
        <v-button type="link" ghost>Link</v-button>
      </div>
 </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  components: {}
});
</script>

<style lang="scss">
.btn-demo {
  &{
    background: rgb(190, 200, 200);
    padding: 26px 16px 16px;
  }
  .v-btn{
    margin-right: 12px;
    margin-bottom: 12px;
  }
}
</style>
