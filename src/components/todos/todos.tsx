import withModificator from '@/hoc/withModificator'
import {
    thunkAddTodo,
    thunkCompleteTodo,
    thunkDeleteTodo,
} from '@/store/actions/todos-actions'
import { AppThunkDispatch } from '@/store/types'
import { IdType, InitialTodoType } from '@/store/types/todo-types'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import Icon from '../icon/icon'

const blockClassName = 'todos'

type IProps = {
    todos: Array<InitialTodoType>
    className: string
}

type TItems = Array<{
    [key: string]: string
}>

const Todos: React.FC<IProps> = props => {
    const { className, todos } = props
    const [title, setTitle] = useState<string>('')
    const [important, setImportant] = useState<boolean>(false)
    const [filter, setfilter] = useState<string>('all')
    const [toFilterItems] = useState<TItems>([
        { filter: 'all' },
        { filter: 'active' },
        { filter: 'important' },
        { filter: 'completed' },
    ])
    const thunkDispatch: AppThunkDispatch = useDispatch()

    const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const target = ev.target
        const value: string = target.value
        setTitle(value)
    }

    const handleCheckbox = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const checked = ev.target.checked
        setImportant(prev => (prev = checked))
    }

    const handleClickAdd = () => {
        const value = title.trim()
        if (value == '') return
        thunkDispatch(
            thunkAddTodo({
                title: value,
                completed: false,
                important,
            })
        )
        setImportant(prev => (prev = false))
        setTitle(prev => (prev = ''))
    }

    const handlerClickDelete = (id: IdType) => {
        thunkDispatch(thunkDeleteTodo(id))
    }

    const handlerClickCompleted = (id: IdType) => {
        thunkDispatch(thunkCompleteTodo(id))
    }

    const handleFilter = (filter: string) => {
        setfilter(filter)
    }

    const filterItems = (items: Array<InitialTodoType>, filter: string) => {
        if (items.length === 0) {
            return items
        } else if (filter === 'all') {
            return items
        } else if (filter === 'completed') {
            return items.filter((item: InitialTodoType) => item.completed)
        } else if (filter === 'active') {
            return items.filter((item: InitialTodoType) => !item.completed)
        } else if (filter === 'important') {
            return items.filter((item: InitialTodoType) => item.important)
        }
    }
    const filteredTodos = filterItems(todos, filter)

    const todoList = filteredTodos!.map(
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
                        onClick={() => handlerClickCompleted(id)}
                        className={blockClassName + '__btn'}
                        type="button"
                        title={
                            completed ? 'Сделать активной' : 'Завершить задачу'
                        }
                    >
                        <Icon modificator="checked icon_success" />
                    </button>

                    <button
                        onClick={() => handlerClickDelete(id)}
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
            <div className={blockClassName + '__filters'}>
                {todos.length > 0 &&
                    toFilterItems.map(item => {
                        const isActive = item.filter === filter
                        const classNames = isActive
                            ? blockClassName + '__filters-item' + ' is-active'
                            : blockClassName + '__filters-item'

                        return (
                            <div
                                onClick={() => handleFilter(item.filter)}
                                className={classNames}
                                key={item.filter}
                            >
                                {item.filter}
                            </div>
                        )
                    })}
            </div>

            <div className={blockClassName + '__add'}>
                <div className={blockClassName + '__field input'}>
                    <input
                        value={title}
                        onChange={handleChange}
                        placeholder="Введите название новой задачи"
                        type="text"
                        className={blockClassName + '__input input__field'}
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
