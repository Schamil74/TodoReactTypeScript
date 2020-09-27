import React, { Fragment, useEffect } from 'react'
import Todos from '@/components/todos/todos'
import { useDispatch, useSelector } from 'react-redux'
import { AppThunkDispatch, RootState } from '@/store/types'
import { thunkGetTodos } from '@/store/actions/todos-actions'
import Loader from '@/components/loader/loader'

const TodosPage = () => {
    const todosState = (state: RootState) => state.todos
    const { isFetching, todos } = useSelector(todosState)
    const thunkDispatch: AppThunkDispatch = useDispatch()

    useEffect(() => {
        thunkDispatch(thunkGetTodos())
    }, [])
    return (
        <Fragment>
            {isFetching ? (
                <Loader />
            ) : (
                <Todos modificator="main" todos={todos} />
            )}
        </Fragment>
    )
}

export default TodosPage
