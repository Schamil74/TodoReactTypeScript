import React, { useState, Fragment } from 'react'
import withModificator from '@/hoc/withModificator'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppThunkDispatch } from '@/store/types'
import { RootState } from '@/store/types'
import ModalError from '@/components/modal/modal'
type ThunkArgType = {
    email: string
    password: string
}

const blockClassName = 'form'

type PropsType = {
    className: string
    thunkMethod: (oba: ThunkArgType) => AppThunkDispatch
    bindTo: string
    textHelper: string
    textBtn: string
}
const Auth: React.FC<PropsType> = props => {
    const { className, thunkMethod, textHelper, textBtn, bindTo } = props
    const authState = (state: RootState) => state.auth
    const { isError } = useSelector(authState)
    const thunkDispatch: AppThunkDispatch = useDispatch()
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
        <Fragment>
            {isError.error && (
                <ModalError
                    open={true}
                    title="Ошибка входа"
                    text={isError.msg}
                />
            )}
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
        </Fragment>
    )
}

export default withModificator(Auth, blockClassName)
