import React, { useEffect, useState } from 'react'
import withModificator from '@/hoc/withModificator'
import { InitialTodoType, IdType } from '@/store/types/todo-types'
import {
    thunkAddTodo,
    thunkDeleteTodo,
    thunkCompleteTodo,
} from '@/store/actions/todos-actions'
import { AppDispatch } from '@/store/reducers'
import { useDispatch } from 'react-redux'

import Icon from '../icon/icon'
const blockClassName = 'todos'

type PropsType = {
    todos: Array<InitialTodoType>
    className: string
}

const Todos: React.FC<PropsType> = props => {
    const { className, todos } = props
    const [title, setTitle] = useState<string>('')
    const [important, setImportant] = useState<boolean>(false)
    const thunkDispatch: AppDispatch = useDispatch()

    const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const target = ev.target
        const value: string = target.value
        setTitle(value)
    }

    const handleCheckbox = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const checked = ev.target.checked
        setImportant(prev => (prev = checked))
    }

    const handleClickAdd = (ev: React.MouseEvent<HTMLButtonElement>) => {
        if (title.trim() == '') return
        thunkDispatch(
            thunkAddTodo({
                title: title.trim(),
                completed: false,
                important,
            })
        )
        setImportant(prev => (prev = false))
        setTitle(prev => (prev = ''))
    }

    const handlerClickDelete = (
        ev: React.MouseEvent<HTMLButtonElement>,
        id: IdType
    ) => {
        thunkDispatch(thunkDeleteTodo(id))
    }
    const handlerClickCompleted = (
        ev: React.MouseEvent<HTMLButtonElement>,
        id: IdType
    ) => {
        thunkDispatch(thunkCompleteTodo(id))
    }

    const todoList = todos.map(
        ({ id, title, completed, important }: InitialTodoType) => {
            const computedClassName = completed
                ? ` ${blockClassName}__item_completed`
                : important
                ? ` ${blockClassName}__item_important`
                : ''

            return (
                <div
                    key={id}
                    className={blockClassName + '__item' + computedClassName}
                >
                    <p className={blockClassName + '__text'}>{title}</p>

                    <button
                        onClick={ev => handlerClickCompleted(ev, id)}
                        className={blockClassName + '__btn'}
                        type="button"
                        title={
                            computedClassName
                                ? 'Сделать активной'
                                : 'Завершить задачу'
                        }
                    >
                        <Icon modificator="checked icon_success" />
                    </button>

                    <button
                        onClick={ev => handlerClickDelete(ev, id)}
                        className={blockClassName + '__btn'}
                        type="button"
                        title="Удалить"
                    >
                        <Icon modificator="minus icon_remove" />
                    </button>
                </div>
            )
        }
    )

    return (
        <div className={className}>
            <div className={blockClassName + '__add'}>
                <div className={blockClassName + '__field'}>
                    <input
                        value={title}
                        onChange={handleChange}
                        placeholder="Введите название новой задачи"
                        type="text"
                        className={blockClassName + '__input input'}
                    />
                </div>
                <label className={blockClassName + '__label'}>
                    <span>Отметить как важное</span>
                    <input
                        type="checkbox"
                        name="important"
                        id="important"
                        checked={important}
                        onChange={handleCheckbox}
                    />
                </label>

                <button
                    title="Добавить задачу"
                    className={blockClassName + '__btn'}
                    type="button"
                    onClick={handleClickAdd}
                >
                    <Icon modificator="add icon_add-item" />
                </button>
            </div>
            <div className={blockClassName + '__list'}>
                {todos.length === 0 ? (
                    <div className={blockClassName + '__placeholder'}>
                        Пока задач нет. Введите новую задачу
                    </div>
                ) : (
                    todoList
                )}
            </div>
        </div>
    )
}

export default withModificator(Todos, blockClassName)
