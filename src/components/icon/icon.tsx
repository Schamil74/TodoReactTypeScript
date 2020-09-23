import React from 'react'
import withModificator from '@/hoc/withModificator'
const blockClassName = 'icon'

type PropsType = {
    className: string
}

const Icon: React.FC<PropsType> = props => {
    return <i className={props.className}></i>
}

export default withModificator(Icon, blockClassName)
