import Loader from '@/components/loader/loader'
import firebase from '@/db/db'
import Login from '@/pages/login'
import Register from '@/pages/register'
import TodosPage from '@/pages/todos-page'
import { setUid, thunkLogOut } from '@/store/actions/auth-actions'
import { RootState } from '@/store/types'
import { AppThunkDispatch } from '@/store/types/'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { Dispatch } from 'redux'

const blockClassName = 'app'
const header = 'header'

const initialRoutes = [
    { id: '1', authed: true, path: '/', exact: true, Component: TodosPage },
    { id: '2', authed: false, path: '/login', Component: Login },
    { id: '3', authed: false, path: '/register', Component: Register },
]

const App: React.FC = () => {
    const authState = (state: RootState) => state.auth
    const { isFetching, uid } = useSelector(authState)
    const [redirect, setRedirect] = useState<string>('')
    const [routes, setRoutes] = useState<Array<{}>>([])
    const thunkDispatch: AppThunkDispatch = useDispatch()
    const dispatch: Dispatch = useDispatch()
    const handleClickLogOut = (ev: React.MouseEvent) => {
        thunkDispatch(thunkLogOut())
    }
    const nodeRef = useRef(null)
    const filteredRoutes = (uid: string | null, routes: Array<{}>) => {
        let innerState = false
        if (uid) innerState = true

        return routes.filter((route: any) => {
            return route.authed === innerState
        })
    }
    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                setRedirect('/')
                dispatch(setUid(user.uid))
                setRoutes(filteredRoutes(user.uid, initialRoutes))
            } else {
                setRedirect('/login')
                dispatch(setUid(null))
                setRoutes(filteredRoutes(null, initialRoutes))
            }
        })
    }, [])

    const routesAreAready = routes.map(
        ({ id, path, exact, Component }: any) => (
            <Route key={id} exact={exact} path={path}>
                <CSSTransition
                    nodeRef={nodeRef}
                    timeout={500}
                    in={true}
                    classNames={'item'}
                    unmountOnExit
                >
                    <div className={blockClassName + '__inner'} ref={nodeRef}>
                        <Component />
                    </div>
                </CSSTransition>
            </Route>
        )
    )

    return (
        <div className={blockClassName + '__wrapper'}>
            <div className={blockClassName + '__header header'}>
                <div className={header + '__container container'}>
                    <h1>
                        TODO APP (REACT, ROUTER, REDUX, TYPESCRIPT, FIREBASE)
                    </h1>

                    {uid && (
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
                <TransitionGroup
                    className={blockClassName + '__container container'}
                >
                    {isFetching && !uid ? (
                        <Loader />
                    ) : (
                        <Switch>
                            {routesAreAready.length > 0 && (
                                <Fragment>
                                    {routesAreAready}

                                    <Redirect to={redirect} />
                                </Fragment>
                            )}
                        </Switch>
                    )}
                </TransitionGroup>
            </div>
            <div className={blockClassName + '__footer footer'}>
                <div className={header + '__container container'}>
                    <h5>Frontend-dveloper: Minibaev Shamil</h5>
                </div>
            </div>
        </div>
    )
}

export default App
