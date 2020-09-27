import { rootReducer } from '@/store/reducers'
import { ThunkAction } from 'redux-thunk'
import { Action } from 'redux'
import { ThunkDispatch } from 'redux-thunk'

export type RootState = ReturnType<typeof rootReducer>
export type AppThunkDispatch = ThunkDispatch<RootState, any, Action>

export type AppThunkAction<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>
