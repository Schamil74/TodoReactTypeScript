import {
    SET_UID,
    SET_FETCHING_AUTH,
    AuthType,
    AuthActionTypes,
} from '@/store/types/auth-types'

const initialState: AuthType = {
    uid: null,
    isFetchingAuth: false,
}

export function authReducer(
    state = initialState,
    action: AuthActionTypes
): AuthType {
    switch (action.type) {
        case SET_FETCHING_AUTH:
            return {
                ...state,
                isFetchingAuth: true,
            }
        case SET_UID:
            return {
                ...state,
                isFetchingAuth: false,
                uid: action.uid,
            }

        default:
            return state
    }
}
