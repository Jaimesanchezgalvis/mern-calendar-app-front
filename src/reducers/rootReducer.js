import {combineReducers} from 'redux';
import { authReducer } from '../reducers/authReducer';
import { calendarReducer } from './calendarReducer';

import { uiReducer } from './uiReducer';

export const rootReducer = combineReducers({
    ui:uiReducer,
    calendar: calendarReducer,
    auth: authReducer
    
})