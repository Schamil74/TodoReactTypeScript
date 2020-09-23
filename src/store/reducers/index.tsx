import { todoReducer } from '@/store/reducers/todosReducer'
import { authReducer } from '@/store/reducers/authReducer'
import { combineReducers } from 'redux'

import { Action, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk, { ThunkDispatch } from 'redux-thunk'

const rootReducer = combineReducers({
    todos: todoReducer,
    auth: authReducer,
})

export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
)
export type AppDispatch = ThunkDispatch<RootState, any, Action>
export type RootState = ReturnType<typeof rootReducer>
