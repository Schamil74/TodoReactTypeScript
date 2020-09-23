import React, { useState } from 'react'
import withModificator from '@/hoc/withModificator'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/store/reducers'

type ThunkArgType = {
    email: string
    password: string
}

const blockClassName = 'form'
type PropsType = {
    className: string
    thunkMethod: (oba: ThunkArgType) => AppDispatch
    bindTo: string
    textHelper: string
    textBtn: string
}
const Auth: React.FC<PropsType> = props => {
    const { className, thunkMethod, textHelper, textBtn, bindTo } = props
    const thunkDispatch: AppDispatch = useDispatch()
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault()
        if (email !== '' && password !== '') {
            thunkDispatch(thunkMethod({ email, password }))
        }
    }

    const handleChangeEmail = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const target = ev.target
        const value: string = target.value
        setEmail(value)
    }

    const handleChangePassword = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const target = ev.target
        const value: string = target.value
        setPassword(value)
    }

    return (
        <form className={className} onSubmit={handleSubmit}>
            <div className={blockClassName + '__list'}>
                <div className={blockClassName + '__field'}>
                    <input
                        onChange={handleChangeEmail}
                        placeholder="Введите email"
                        className={blockClassName + '__input input'}
                        type="email"
                        autoComplete="off"
                    />
                </div>
                <div className={blockClassName + '__field'}>
                    <input
                        onChange={handleChangePassword}
                        placeholder="Пароль"
                        className={blockClassName + '__input input'}
                        type="password"
                        autoComplete="off"
                    />
                </div>
                <div className={blockClassName + '__field'}>
                    <button
                        className={blockClassName + '__btn btn btn_wide'}
                        type="submit"
                    >
                        {textBtn}
                    </button>
                </div>
            </div>
            <div className={blockClassName + '__center'}>
                <Link to={bindTo} className={blockClassName + '__to'}>
                    {textHelper}
                </Link>
            </div>
        </form>
    )
}

export default withModificator(Auth, blockClassName)
