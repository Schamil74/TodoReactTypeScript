export const SET_UID = 'SET_UID'
export const SET_FETCHING_AUTH = 'SET_FETCHING_AUTH'
export const SET_LOGGED = 'SET_LOGGED'

export type UserType = firebase.User | null
export type UidType = string | null

export type AuthPropsType = {
    email: string
    password: string
}

export interface AuthType {
    uid: UidType
    isFetchingAuth: boolean
}

export interface SetUidActionType {
    type: typeof SET_UID
    uid: UidType
}

export interface FetchingAuthType {
    type: typeof SET_FETCHING_AUTH
    isFetchingAuth: boolean
}

export type AuthActionTypes = SetUidActionType | FetchingAuthType
