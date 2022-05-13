// 组建的props 公共方法
import type { ExtractPropTypes } from 'vue'
export const iconProps = {
    size: {
        type: Number,
    },
    color: {
        type: String
    }
}
// icon type
export type IconPropsType =  ExtractPropTypes<typeof iconProps>;