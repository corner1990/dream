<template>
    <button :class="dymaicClass">
        <span>
            <slot>button</slot>
        </span>
        
    </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'VButton',
    props: {
        type: {
            type: String,
            default: ''
        },
        primary: {
            type: Boolean,
            default: false,
        },
        danger: {
            type: Boolean,
            default: false,
        },
        ghost: {
            type: Boolean,
            default: false,
        }
    },
    computed: {
        // 动态处理class
        dymaicClass() {
            const { $props } = this;
            const { type } = $props;
            const classKeys = [ 'primary', 'danger', 'ghost' ];
            type PropsType = keyof typeof $props;
            
            const classList = [
                'v-btn',
                type ? `v-btn-${type}` : ''
            ]

            //  处理属性key
            classKeys.map((classKey) => {

                const hasAddClass = this.$props[classKey as PropsType];
                if (hasAddClass) {
                    classList.push(`v-btn-${classKey}`)
                }
            })

            return classList.filter(item => item)
        }
    },
    mounted() {
        console.log('this', this.$props)
    }
})
</script>

<style lang="less" scoped>
.v-btn{
    &{
        line-height: 1.5715;
        position: relative;
        display: inline-block;
        font-weight: 400;
        white-space: nowrap;
        text-align: center;
        background-image: none;
        border: 1px solid transparent;
        box-shadow: 0 2px #00000004;
        cursor: pointer;
        transition: all .3s cubic-bezier(.645,.045,.355,1);
        user-select: none;
        touch-action: manipulation;
        height: 32px;
        padding: 4px 15px;
        font-size: 14px;
        border-radius: 2px;
        color: #000000d9;
        background: #fff;
        border-color: #d9d9d9;
    }
    
    &.v-btn-dashed {
        color: #000000d9;
        background: #fff;
        border-color: #d9d9d9;
        border-style: dashed;
    }
    &:focus,
    &:active,
    &:hover,
    &.v-btn-dashed:hover {
        color: #40a9ff;
        background: #fff;
        border-color: #40a9ff;
    }
    &.v-btn-background-ghost {
        color: #fff;
        background: transparent!important;
        border-color: #fff;
    }
}
.v-btn-primary{
    color: #fff;
    background: #1890ff;
    border-color: #1890ff;
    text-shadow: 0 -1px 0 rgb(0 0 0 / 12%);
    box-shadow: 0 2px #0000000b;
}
.v-btn-primary:hover,
.v-btn-primary:focus {
    color: #fff;
    background: #40a9ff;
    border-color: #40a9ff;
}
.v-btn-dashed {
    color: #000000d9;
    background: #fff;
    border-color: #d9d9d9;
    border-style: dashed;
}
.v-btn-danger {
    &{
        color: #ff4d4f;
        background: #fff;
        border-color: #ff4d4f;
    }
    &:hover{
        color: #ff7875;
        background: #fff;
        border-color: #ff7875;
    }
}
</style>