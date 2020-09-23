import React, { useEffect, useState, Fragment } from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store/reducers'
import { thunkLogOut, setUid } from '@/store/actions/auth-actions'
import { UserType } from '@/store/types/auth-types'
import TodosPage from '@/pages/todos-page'
import Login from '@/pages/login'
import Register from '@/pages/register'
import Loader from '@/components/loader/loader'
import firebase from '@/db/db'

const blockClassName = 'app'
const header = 'header'

const App: React.FC = () => {
    const authState = (state: RootState) => state.auth
    const { isFetchingAuth } = useSelector(authState)
    const [user, setUser] = useState<UserType>(null)
    const [redirect, setRedirect] = useState<string>('')
    const thunkDispatch: AppDispatch = useDispatch()
    const dispatch = useDispatch()
    const handleClickLogOut = (ev: React.MouseEvent) => {
        thunkDispatch(thunkLogOut())
    }
    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            setUser(user)

            if (user) {
                setRedirect('/')
                dispatch(setUid(user.uid))
            } else {
                setRedirect('/login')
            }
        })
    }, [])

    return (
        <div className={blockClassName + '__wrapper'}>
            <div className={blockClassName + '__header header'}>
                <div className={header + '__container container'}>
                    <h1>
                        TODO APP (REACT, ROUTER, REDUX, TYPESCRIPT, FIREBASE)
                    </h1>

                    {user && (
                        <button
                            onClick={handleClickLogOut}
                            type="button"
                            className={blockClassName + '__btn btn'}
                        >
                            Выйти
                        </button>
                    )}
                </div>
            </div>
            <div className={blockClassName + '__main main'}>
                <div className={blockClassName + '__container container'}>
                    {isFetchingAuth ? (
                        <Loader />
                    ) : (
                        <Switch>
                            {user ? (
                                <Fragment>
                                    <Route
                                        path={'/'}
                                        exact
                                        component={TodosPage}
                                    />
                                    <Redirect to={redirect} />
                                </Fragment>
                            ) : (
                                <Fragment>
                                    <Route path={'/login'} component={Login} />
                                    <Route
                                        path={'/register'}
                                        component={Register}
                                    />
                                    <Redirect to={redirect} />
                                </Fragment>
                            )}
                        </Switch>
                    )}
                </div>
            </div>
            <div className={blockClassName + '__footer footer'}></div>
        </div>
    )
}

export default App
