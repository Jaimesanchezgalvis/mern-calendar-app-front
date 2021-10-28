import React from 'react'
import { useDispatch } from 'react-redux'
import { uiOpenModal } from '../../actions/ui';

export const AddNewFab = () => {

    const dispatch = useDispatch();

    const onDoubleClick = () => {
        dispatch(uiOpenModal())
    }


    return (
        <>
            <button 
            className="btn btn-primary fab"
                onClick={onDoubleClick}

            >
                <i className="fas fa-plus"></i>
            </button>
        </>
    )
}
