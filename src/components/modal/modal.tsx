import withModificator from '@/hoc/withModificator'
import { isError } from '@/store/actions/auth-actions'
import React from 'react'
import { useDispatch } from 'react-redux'
import Popup from 'reactjs-popup'
import { Dispatch } from 'redux'
const blockClassName = 'modal'

type TModalError = {
    open: boolean
    title: string
    text: string
    className: string
}
const ModalError: React.FC<TModalError> = props => {
    const { open, title, text, className } = props
    const dispatch: Dispatch = useDispatch()

    return (
        <Popup open={open} modal>
            {(close: Function) => (
                <div className={className}>
                    <h2 className={blockClassName + '__title'}>{title}</h2>
                    <p className={blockClassName + '__error'}>{text}</p>
                    <div className={blockClassName + '__actions'}>
                        <button
                            className="btn"
                            onClick={() => {
                                close()
                                dispatch(isError({ error: false, msg: '' }))
                            }}
                        >
                            ok
                        </button>
                    </div>
                </div>
            )}
        </Popup>
    )
}

export default withModificator(ModalError, blockClassName)
