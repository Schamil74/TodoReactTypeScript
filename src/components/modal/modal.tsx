import React from 'react'
import Popup from 'reactjs-popup'
import withModificator from '@/hoc/withModificator'
import { Dispatch } from 'redux'
import { useDispatch } from 'react-redux'
import { isError } from '@/store/actions/auth-actions'
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
            {(close: any) => (
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
