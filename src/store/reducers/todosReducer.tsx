import {
    TodoState,
    TodoActionTypes,
    GET_TODOS,
    ADD_TODO,
    DELETE_TODO,
    COMPLETE_TODO,
    CLEAR_TODOS,
    SET_FETCHING,
} from '@/store/types/todo-types'

const initialState: TodoState = {
    todos: [],
    isFetching: false,
}

export function todoReducer(
    state = initialState,
    action: TodoActionTypes
): TodoState {
    switch (action.type) {
        case SET_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching,
            }

        case GET_TODOS:
            return {
                todos: [...state.todos, ...action.todos],
                isFetching: false,
            }

        case ADD_TODO:
            return {
                todos: [...state.todos, action.todo],
                isFetching: false,
            }

        case DELETE_TODO:
            return {
                todos: [...state.todos.filter(todo => todo.id !== action.id)],
                isFetching: false,
            }
        case COMPLETE_TODO:
            return {
                todos: [
                    ...state.todos.map(todo =>
                        todo.id !== action.id
                            ? todo
                            : { ...todo, completed: !todo.completed }
                    ),
                ],
                isFetching: false,
            }
        case CLEAR_TODOS:
            return {
                ...state,
                isFetching: false,
                todos: [],
            }
        default:
            return state
    }
}
