import {
    InitialTodoType,
    IdType,
    GET_TODOS,
    ADD_TODO,
    DELETE_TODO,
    COMPLETE_TODO,
    CLEAR_TODOS,
    SET_FETCHING,
    CompleteTodoActionTypes,
    BaseTodoType,
    GetTodoActionTypes,
    AddTodoActionTypes,
    DeleteTodoActionTypes,
    FetcingActionTypes,
    ClearTodoActionTypes,
} from '@/store/types/todo-types'
import { UidType } from '@/store/types/auth-types'
import { ThunkAction } from 'redux-thunk'
import { RootState } from '@/store/reducers'
import { Action } from 'redux'
import firebase from '@/db/db'

const getUid = () => {
    const user = firebase.auth().currentUser
    return user ? user.uid : null
}

type thunkType = ThunkAction<Promise<void>, RootState, unknown, Action<string>>

export const thunkGetTodos = (): thunkType => async dispatch => {
    const uid = getUid()
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
                completed: todo.competed,
            })
        })

        dispatch(getTodos(resultTodos))
    }
}

export const thunkAddTodo = (
    partTodo: BaseTodoType
): thunkType => async dispatch => {
    const uid = getUid()
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

export const thunkDeleteTodo = (id: IdType): thunkType => async dispatch => {
    const uid = getUid()
    dispatch(isFetching(true))
    await firebase.database().ref(`/users/${uid}/todos`).child(id).remove()
    dispatch(deleteTodo(id))
}

export const thunkCompleteTodo = (id: IdType): thunkType => async dispatch => {
    const uid = getUid()
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
