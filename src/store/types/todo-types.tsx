export const GET_TODOS = 'GET_TODOS'
export const ADD_TODO = 'ADD_TODO'
export const DELETE_TODO = 'DELETE_TODO'
export const SET_FETCHING = 'SET_FETCHING'
export const COMPLETE_TODO = 'COMPLETE_TODO'
export const CLEAR_TODOS = 'CLEAR_TODOS'

export type IdType = string

export interface BaseTodoType {
    title: string
    completed: boolean
    important: boolean
}

export interface InitialTodoType extends BaseTodoType {
    id: IdType
}

export interface TodoState {
    todos: Array<InitialTodoType>
    isFetching: boolean
}

export interface FetcingActionTypes {
    type: typeof SET_FETCHING
    isFetching: boolean
}

export interface GetTodoActionTypes {
    type: typeof GET_TODOS
    todos: Array<InitialTodoType>
}

export interface AddTodoActionTypes {
    type: typeof ADD_TODO
    todo: InitialTodoType
}

export interface DeleteTodoActionTypes {
    type: typeof DELETE_TODO
    id: IdType
}

export interface CompleteTodoActionTypes {
    type: typeof COMPLETE_TODO
    id: IdType
}

export interface ClearTodoActionTypes {
    type: typeof CLEAR_TODOS
}

export type TodoActionTypes =
    | FetcingActionTypes
    | GetTodoActionTypes
    | AddTodoActionTypes
    | DeleteTodoActionTypes
    | CompleteTodoActionTypes
    | ClearTodoActionTypes
