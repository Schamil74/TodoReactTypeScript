import { authReducer } from '@/store/reducers/authReducer'
import { todoReducer } from '@/store/reducers/todosReducer'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

export const rootReducer = combineReducers({
    todos: todoReducer,
    auth: authReducer,
})

export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
)
