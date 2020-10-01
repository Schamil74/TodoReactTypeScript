import Loader from '@/components/loader/loader'
import Todos from '@/components/todos/todos'
import { thunkGetTodos } from '@/store/actions/todos-actions'
import { AppThunkDispatch, RootState } from '@/store/types'
import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

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
