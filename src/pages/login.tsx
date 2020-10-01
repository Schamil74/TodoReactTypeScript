import Auth from '@/components/auth/auth'
import { thunkLogin } from '@/store/actions/auth-actions'
import React from 'react'

const Login: React.FC = () => {
    return (
        <Auth
            thunkMethod={thunkLogin}
            bindTo="/register"
            textHelper="Еще не зарегистрированы?"
            textBtn="Войти"
        />
    )
}

export default Login
