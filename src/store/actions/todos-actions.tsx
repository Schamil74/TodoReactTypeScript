import firebase from '@/db/db'
import { AppThunkAction } from '@/store/types'
import {
    AddTodoActionTypes,
    ADD_TODO,
    BaseTodoType,
    ClearTodoActionTypes,
    CLEAR_TODOS,
    CompleteTodoActionTypes,
    COMPLETE_TODO,
    DeleteTodoActionTypes,
    DELETE_TODO,
    FetcingActionTypes,
    GetTodoActionTypes,
    GET_TODOS,
    IdType,
    InitialTodoType,
    SET_FETCHING,
} from '@/store/types/todo-types'

const getUid = () => {
    const user = firebase.auth().currentUser
    return user ? user.uid : null
}

export const thunkGetTodos = (): AppThunkAction => async (
    dispatch,
    getState
) => {
    const { uid } = getState().auth
    const resultTodos: Array<InitialTodoType> = []
    dispatch(isFetching(true))

    const fbVal = await firebase
        .database()
        .ref(`users/${uid}/todos/`)
        .once('value')

    const todos = fbVal.val()

    if (!todos) {
        dispatch(getTodos(resultTodos))
    } else {
        Object.keys(todos).forEach(key => {
            const todo = todos[key]
            resultTodos.push({
                id: key,
                title: todo.title,
                important: todo.important,
                completed: todo.completed,
            })
        })

        dispatch(getTodos(resultTodos))
    }
}

export const thunkAddTodo = (partTodo: BaseTodoType): AppThunkAction => async (
    dispatch,
    getState
) => {
    const { uid } = getState().auth
    dispatch(isFetching(true))

    const response = await firebase
        .database()
        .ref(`users/${uid}/todos/`)
        .push(partTodo)

    const todo = {
        id: response.key!,
        ...partTodo,
    }

    dispatch(addTodo(todo))
}

export const thunkDeleteTodo = (id: IdType): AppThunkAction => async (
    dispatch,
    getState
) => {
    const { uid } = getState().auth
    dispatch(isFetching(true))
    await firebase.database().ref(`/users/${uid}/todos`).child(id).remove()
    dispatch(deleteTodo(id))
}

export const thunkCompleteTodo = (id: IdType): AppThunkAction => async (
    dispatch,
    getState
) => {
    const { uid } = getState().auth
    dispatch(isFetching(true))
    const child = await firebase
        .database()
        .ref(`users/${uid}/todos/`)
        .child(id)
        .once('value')

    const todo = child.val()

    await firebase
        .database()
        .ref(`/users/${uid}/todos`)
        .child(id)
        .update({ completed: !todo.completed })
    dispatch(completeTodo(id))
}

export const isFetching = (isFetching: boolean): FetcingActionTypes => {
    return { type: SET_FETCHING, isFetching }
}

export function getTodos(todos: Array<InitialTodoType>): GetTodoActionTypes {
    return {
        type: GET_TODOS,
        todos,
    }
}

export function addTodo(todo: InitialTodoType): AddTodoActionTypes {
    return {
        type: ADD_TODO,
        todo,
    }
}

export function deleteTodo(id: IdType): DeleteTodoActionTypes {
    return {
        type: DELETE_TODO,
        id,
    }
}

export function completeTodo(id: IdType): CompleteTodoActionTypes {
    return {
        type: COMPLETE_TODO,
        id,
    }
}

export function clearTodos(): ClearTodoActionTypes {
    return {
        type: CLEAR_TODOS,
    }
}
