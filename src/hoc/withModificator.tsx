import React from 'react'

const withModificator = (Component: Function, classname: string) => (
    props: any
) => {
    const { modificator, addClazz, ...elemProps } = props
    const cls = [classname]
    if (modificator) {
        cls.push(`${classname}_${modificator}`)
    }

    if (addClazz) {
        cls.push(addClazz)
    }

    return <Component className={cls.join(' ')} {...elemProps} />
}

export default withModificator
