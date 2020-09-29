interface Ivalidation {
    [key: string]: string | boolean | {} | number
}

export interface Ifield {
    type: string
    errorMessage: string
    validation: Ivalidation
    valid: boolean
    touched: boolean
    value: string
}

type Tvalidation = Ivalidation | null

const isEmail = (emailAddress: string): boolean => {
    let pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    )
    return pattern.test(emailAddress)
}

export function createControl(config: any, validation: Tvalidation): Ifield {
    return {
        ...config,
        validation,
        valid: !validation,
        touched: false,
        value: '',
    }
}

export function validate(value: any, validation: Tvalidation = null): boolean {
    if (!validation) {
        return true
    }

    let isValid = true

    if (validation.required) {
        isValid = value.trim() !== '' && isValid
    }

    if (validation.email) {
        isValid = isEmail(value) && isValid
    }

    if (validation.minLength) {
        isValid = value.length >= validation.minLength && isValid
    }

    return isValid
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
