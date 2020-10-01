export interface IObject {
    [key: string]: string | number
}

export interface Ivalidation {
    [key: string]: string | boolean | number
}

export interface Ifield {
    type: string
    errorMessage: string
    placeholder: string
    validation: Ivalidation | null
    valid: boolean
    touched: boolean
    value: string
    autoComplete: string
}

export interface IFormControls {
    [key: string]: Ifield
}

type ValidateReturn = {
    isValid: boolean
    optionErrorMessage: string
}

const isEmail = (emailAddress: string): boolean => {
    let pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    )
    return pattern.test(emailAddress)
}

export function createControl(
    config: any,
    validation: Ivalidation | null
): Ifield {
    return {
        ...config,
        validation,
        valid: !validation,
        touched: false,
        value: '',
        autoComplete: 'off',
    }
}

export function validate(control: Ifield): ValidateReturn {
    const { validation, value, type, touched, errorMessage } = control

    let isValid = true
    let optionErrorMessage = errorMessage

    if (!validation) {
        return { isValid, optionErrorMessage }
    }

    if (validation.required) {
        isValid = value.trim() !== ''
    }

    if (validation.email && touched) {
        const emailValid = isEmail(value)

        if (emailValid) {
            isValid = true
        } else if (value == '' || emailValid) {
            isValid = false
            optionErrorMessage = 'Поле email не может быть пустым'
        } else {
            isValid = false
            optionErrorMessage = 'Поле email должно быть валидным'
        }
    }

    if (validation.minLength && touched) {
        const minLengthValid = value.length >= validation.minLength

        if (minLengthValid) {
            isValid = true
        } else if (value == '' || minLengthValid) {
            isValid = false
            optionErrorMessage = `Поле ${type} не может быть пустым`
        } else {
            isValid = false
            optionErrorMessage = `Поле ${type} должно иметь не менее ${validation.minLength} символов`
        }
    }

    return { isValid, optionErrorMessage }
}

export function validateForm(formControls: any): boolean {
    let isFormValid = true

    for (let control in formControls) {
        if (formControls.hasOwnProperty(control)) {
            isFormValid = formControls[control].valid && isFormValid
        }
    }

    return isFormValid
}
