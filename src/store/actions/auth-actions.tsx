import {
    SET_UID,
    SET_FETCHING_AUTH,
    FetchingAuthType,
    SetUidActionType,
    AuthPropsType,
    UidType,
} from '@/store/types/auth-types'
import { clearTodos } from '@/store/actions/todos-actions'
import { AppDispatch } from '@/store/reducers'
import firebase from '@/db/db'

export const thunkRegister = ({ email, password }: AuthPropsType) => async (
    dispatch: AppDispatch
) => {
    try {
        dispatch(isFetchingAuth(true))
        const response = await firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)

        if (response.user) {
            dispatch(setUid(response.user.uid))
        }
    } catch (error) {
        console.log(error.code)
    }
}

export const thunkLogin = ({ email, password }: AuthPropsType) => async (
    dispatch: AppDispatch
) => {
    try {
        dispatch(isFetchingAuth(true))
        const response = await firebase
            .auth()
            .signInWithEmailAndPassword(email, password)

        if (response.user) {
            dispatch(setUid(response.user.uid))
        }
    } catch (error) {
        console.log(error.code)
    }
}

export const thunkLogOut = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(isFetchingAuth(true))
        await firebase.auth().signOut()
        dispatch(setUid(null))
        dispatch(clearTodos())
    } catch (error) {
        console.log(error.code)
    }
}

export const isFetchingAuth = (isFetchingAuth: boolean): FetchingAuthType => {
    return { type: SET_FETCHING_AUTH, isFetchingAuth }
}

export function setUid(uid: UidType): SetUidActionType {
    return {
        type: SET_UID,
        uid,
    }
}
