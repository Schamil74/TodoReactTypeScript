import { Ifield } from '@/form/form-validation'
import withModificator from '@/hoc/withModificator'
import React from 'react'
const blockClassName = 'input'

interface IPropsField extends Ifield {
    shouldValidate: boolean
    onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void
}

function isInvalid(props: IPropsField): boolean {
    const { valid, touched, shouldValidate } = props
    return !valid && shouldValidate && touched
}

const Input: React.FC<IPropsField> = props => {
    const {
        placeholder,
        type,
        autoComplete,
        onChange,
        errorMessage,
        value,
    } = props

    return (
        <div
            className={`${blockClassName} ${
                isInvalid(props) ? 'is-error' : ''
            }`}
        >
            <input
                className={blockClassName + '__field'}
                onChange={onChange}
                placeholder={placeholder}
                value={value}
                type={type}
                autoComplete={autoComplete}
            />
            {isInvalid(props) ? (
                <span>{errorMessage || 'Введите верное значение'}</span>
            ) : null}
        </div>
    )
}

export default withModificator(Input, 'blockClassName')
