import withModificator from '@/hoc/withModificator'
import React from 'react'
const blockClassName = 'icon'

type PropsType = {
    className: string
}

const Icon: React.FC<PropsType> = props => {
    return <i className={props.className}></i>
}

export default withModificator(Icon, blockClassName)
