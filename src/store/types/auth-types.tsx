export const SET_UID = 'SET_UID'
export const SET_FETCHING = 'SET_FETCHING'
export const SET_ERROR = 'SET_ERROR'
export const SET_LOGGED = 'SET_LOGGED'

export type UserType = firebase.User | null
export type UidType = string | null
export type IsFetchingType = boolean
export interface IsErrorType {
    error: boolean
    msg: string
}

export type AuthPropsType = {
    email: string
    password: string
}

export interface AuthType {
    uid: UidType
    isFetching: IsFetchingType
    isError: IsErrorType
}

export interface SetUidActionType {
    type: typeof SET_UID
    uid: UidType
}

export interface FetchingActionType {
    type: typeof SET_FETCHING
    isFetching: IsFetchingType
}

export interface SetErrorActionType {
    type: typeof SET_ERROR
    isError: IsErrorType
}

export type AuthActionTypes =
    | SetUidActionType
    | FetchingActionType
    | SetErrorActionType
