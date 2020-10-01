import {
    AuthActionTypes,
    AuthType,
    SET_ERROR,
    SET_FETCHING,
    SET_UID,
} from '@/store/types/auth-types'

const initialState: AuthType = {
    uid: null,
    isFetching: false,
    isError: {
        error: false,
        msg: '',
    },
}

export function authReducer(
    state = initialState,
    action: AuthActionTypes
): AuthType {
    switch (action.type) {
        case SET_FETCHING:
            return {
                ...state,
                isError: {
                    error: false,
                    msg: '',
                },
                isFetching: action.isFetching,
            }
        case SET_ERROR:
            return {
                ...state,
                isFetching: false,
                isError: {
                    error: action.isError.error,
                    msg: action.isError.msg,
                },
            }
        case SET_UID:
            return {
                isError: {
                    error: false,
                    msg: '',
                },
                isFetching: false,
                uid: action.uid,
            }

        default:
            return state
    }
}
