import React from 'react'
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom'

export const PrivateRoute = ({
    isAuthenticaded,
    component: Component,
    ...rest
}) => {

    return (       
        <Route { ...rest} 
        component= { (props) =>(
            (isAuthenticaded )
            ? ( <Component { ...props } />)
                : (<Redirect to="/login"/> )
        )}
        />
    )
}

PrivateRoute.propTypes = {
    isAuthenticaded: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}