interface TMessages {
    [key: string]: string
}

const messages: TMessages = {
    'logout': 'Вы вышли из системы',
    'login': 'Для начала войдите в систему',
    'auth/user-not-found': 'Пользователь не найден',
    'auth/wrong-password': 'Неверный пароль',
    'auth/email-already-in-use': 'Email уже существует',
}

export default messages
