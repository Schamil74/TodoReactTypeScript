import {
    SET_UID,
    SET_FETCHING,
    SET_ERROR,
    SetUidActionType,
    SetIsFetchingActionType,
    SetErrorActionType,
    AuthPropsType,
    UidType,
    IsFetchingType,
    IsErrorType,
} from '@/store/types/auth-types'
import { clearTodos } from '@/store/actions/todos-actions'
import firebase from '@/db/db'
import { Dispatch } from 'redux'
import { AppThunkAction } from '@/store/types'
import messages from '@/messages/firebase.error'

export const thunkRegister = ({
    email,
    password,
}: AuthPropsType): AppThunkAction => async (dispatch: Dispatch) => {
    try {
        dispatch(isFetching(true))
        const response = await firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)

        if (response.user) {
            dispatch(setUid(response.user.uid))
            dispatch(isFetching(false))
        }
    } catch (error) {
        if (messages[error.code]) {
            const msg = messages[error.code]
            dispatch(isError({ error: true, msg }))
        } else {
            dispatch(isError({ error: true, msg: error.code }))
        }
    }
}

export const thunkLogin = ({
    email,
    password,
}: AuthPropsType): AppThunkAction => async (dispatch: Dispatch) => {
    try {
        dispatch(isFetching(true))
        const response = await firebase
            .auth()
            .signInWithEmailAndPassword(email, password)

        if (response.user) {
            dispatch(setUid(response.user.uid))
            dispatch(isFetching(false))
        }
    } catch (error) {
        if (messages[error.code]) {
            const msg = messages[error.code]
            dispatch(isError({ error: true, msg }))
        } else {
            dispatch(isError({ error: true, msg: error.code }))
        }
    }
}

export const thunkLogOut = (): AppThunkAction => async (dispatch: Dispatch) => {
    try {
        dispatch(isFetching(true))
        await firebase.auth().signOut()
        dispatch(setUid(null))
        dispatch(clearTodos())
        dispatch(isFetching(false))
    } catch (error) {
        if (messages[error.code]) {
            const msg = messages[error.code]
            dispatch(isError({ error: true, msg }))
        } else {
            dispatch(isError({ error: true, msg: error.code }))
        }
    }
}

export function setUid(uid: UidType): SetUidActionType {
    return {
        type: SET_UID,
        uid,
    }
}

export function isFetching(
    isFetching: IsFetchingType
): SetIsFetchingActionType {
    return {
        type: SET_FETCHING,
        isFetching,
    }
}

export function isError({ error, msg }: IsErrorType): SetErrorActionType {
    return {
        type: SET_ERROR,
        isError: {
            error,
            msg,
        },
    }
}
