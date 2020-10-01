import Auth from '@/components/auth/auth'
import { thunkRegister } from '@/store/actions/auth-actions'
import React from 'react'

const Register: React.FC = () => {
    return (
        <Auth
            thunkMethod={thunkRegister}
            bindTo="/login"
            textHelper="Уже зарегистрированы?"
            textBtn="Зарегистрироваться"
        />
    )
}

export default Register
