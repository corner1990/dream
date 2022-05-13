<template>
    <i class="v-icon" :style="style">
        <slot>icon</slot>
    </i>
</template>


<script lang="ts">
import { computed } from '@vue/runtime-core'
import { defineComponent } from 'vue'
import { iconProps, IconPropsType } from './icon'

export default defineComponent({
    name: 'VIcon',
    props: iconProps,
    setup(props) {
        console.log(props)
        const style = computed(() => {
            let styleObj: Record<string, any> = {};
            if (props) {
               if (props.size) {
                   styleObj['font-size'] = props.size + 'px'
               }
               if (props.color) {
                   styleObj['color'] = props.color
               }
            }

            return styleObj;
        })

        return {
            style
        }
    },
})
</script>
