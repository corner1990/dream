import { ExtractPropTypes } from 'vue';
// ExtractPropTypes的作用是为了方便定义外部props的类型

export const ButtonType = ['default', 'primary', 'success', 'warning', 'danger', 'info'];

export const ButtonSize = ['large', 'normal', 'small', 'mini'];

export const buttonProps = {
    type: {
        type: String,
        value: ButtonType 
    },
    size: {
        type: String,
        value: ButtonSize
    }
}

export type ButtonProps = ExtractPropTypes<typeof buttonProps>;