import { rootReducer } from '@/store/reducers'
import { Action } from 'redux'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { AuthActionTypes } from './auth-types'
import { TodoActionTypes } from './todo-types'

export type RootState = ReturnType<typeof rootReducer>

export type AppThunkDispatch = ThunkDispatch<
    RootState,
    any,
    Action<TodoActionTypes | AuthActionTypes>
>

export type AppThunkAction<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>
