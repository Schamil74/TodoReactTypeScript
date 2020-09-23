import React, { useState } from 'react'
import Auth from '@/components/auth/auth'

import { thunkLogin } from '@/store/actions/auth-actions'

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
