import ModalError from '@/components/modal/modal'
import { createControl } from '@/form/form-validation'
import withModificator from '@/hoc/withModificator'
import { AppThunkDispatch, RootState } from '@/store/types'
import React, { ChangeEvent, Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

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
    titleModal: string
}

function createFormControls() {
    return {
        email: createControl(
            {
                type: 'email',
                errorMessage: 'Поле email не может быть пустым',
                autoComplete: 'off',
            },
            {
                required: true,
                email: true,
            }
        ),
        password: createControl(
            {
                type: 'password',
                errorMessage: 'Поле password не может быть пустым',
                autoComplete: 'off',
            },
            {
                required: true,
                minLength: 6,
            }
        ),
    }
}

const Auth: React.FC<PropsType> = props => {
    const { className, thunkMethod, textHelper, textBtn, bindTo } = props
    const authState = (state: RootState) => state.auth
    const { isError } = useSelector(authState)
    const thunkDispatch: AppThunkDispatch = useDispatch()
    const [email, setEmail] = useState<string>('')
    const [formControls, setFormControls] = useState<any>('')
    const [password, setPassword] = useState<string>('')

    useEffect(() => {
        setFormControls(createFormControls())
    }, [])

    const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault()
        if (email !== '' && password !== '') {
            thunkDispatch(thunkMethod({ email, password }))
        }
    }

    const handleChangeEmail = (ev: ChangeEvent<HTMLInputElement>) => {
        const target = ev.target
        const value: string = target.value
        setEmail(value)
    }

    const handleChangePassword = (ev: ChangeEvent<HTMLInputElement>) => {
        const target = ev.target
        const value: string = target.value
        setPassword(value)
    }

    return (
        <Fragment>
            {isError.error && (
                <ModalError
                    open={true}
                    title="Ошибка авторизации"
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
