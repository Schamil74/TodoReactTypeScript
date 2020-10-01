import Input from '@/components/input/input'
import ModalError from '@/components/modal/modal'
import {
    createControl,
    IFormControls,
    validate,
    validateForm,
} from '@/form/form-validation'
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
                placeholder: 'Email',
                errorMessage: 'Поле email не может быть пустым',
            },
            {
                required: true,
                email: true,
            }
        ),
        password: createControl(
            {
                type: 'password',
                placeholder: 'Password',
                errorMessage: 'Поле password не может быть пустым',
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
    const [password, setPassword] = useState<string>('')
    const [isFormValid, setFormValid] = useState<boolean>(false)
    const [formControls, setFormControls] = useState<IFormControls>({})

    useEffect(() => {
        setFormControls(createFormControls())
    }, [])

    const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault()
        if (email !== '' && password !== '') {
            thunkDispatch(thunkMethod({ email, password }))
        }
    }

    const changeHandler = (value: string, controlName: string) => {
        const updatedFormControls = { ...formControls }
        const control = { ...formControls[controlName] }
        controlName === 'email' ? setEmail(value) : setPassword(value)
        control.touched = true
        control.value = value
        const { isValid, optionErrorMessage } = validate(control)

        control.valid = isValid
        control.errorMessage = optionErrorMessage

        updatedFormControls[controlName] = control

        setFormValid(validateForm(updatedFormControls))
        setFormControls(updatedFormControls)
    }

    const renderControls = () => {
        return Object.keys(formControls).map(
            (controlName: string, index: number) => {
                const control = formControls[controlName]

                return (
                    <div className={blockClassName + '__field'} key={index}>
                        <Input
                            value={control.value}
                            valid={control.valid}
                            shouldValidate={!!control.validation}
                            touched={control.touched}
                            placeholder={control.placeholder}
                            errorMessage={control.errorMessage}
                            onChange={(ev: ChangeEvent<HTMLInputElement>) =>
                                changeHandler(ev.target.value, controlName)
                            }
                        />
                    </div>
                )
            }
        )
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
                    {renderControls()}

                    <div className={blockClassName + '__field'}>
                        <button
                            className={blockClassName + '__btn btn btn_wide'}
                            type="submit"
                            disabled={!isFormValid}
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
