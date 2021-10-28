import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
} from "react-router-dom";

import { useDispatch } from 'react-redux';
import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { useEffect } from 'react';
import { startChecking } from '../actions/auth';
import { useSelector } from 'react-redux';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

export const AppRouter = () => {

    const dispatch = useDispatch();
    
    const { checking, uid } = useSelector(state => state.auth)

    useEffect(() => {

        dispatch( startChecking() );

    }, [ dispatch ])

    if ( checking ) {
        return (<h5>Espere...</h5>);
    }

    return (
        <Router>
            <div>
            <Switch>
                <PublicRoute 
                exact 
                path="/login" component={LoginScreen} 
                isAuthenticaded={ !!uid }
                />
                <PrivateRoute 
                exact 
                path="/" 
                component={CalendarScreen}
                isAuthenticaded={!!uid}
                />

                <Redirect to="/" />
            </Switch>
            </div>
        </Router>
    )
}
