import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';


import { Navbar } from '../ui/Navbar';
import { messages } from '../helpers/caledar-messages-es';
import { CalendarEvent } from './CalendarEvent';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es';
import { CalendarModal } from './CalendarModal';
import { uiOpenModal } from '../../actions/ui';
import { eventClearActiveEvent, eventSetActive, eventStartLoading } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { useSelector } from 'react-redux';
import { DeleteEventFab } from '../ui/DeleteEventFab';

moment.locale('es');

const localizer = momentLocalizer(moment);

// const events = [{
//     title: 'Cumpleaños del jefe',
//     start: moment().toDate(),
//     end: moment().add(3, 'hours').toDate(),
//     bgcolor: '#fafafa',
//     notes: 'Comprar el paste',
//     user: {
//         id: '123',
//         name: 'Fernando',
//     }
// }]

export const CalendarScreen = () => {

    const dispatch = useDispatch();

    // TODO: leer el estado de los eventos 
    const { events, activeEvent } = useSelector(state => state.calendar)
    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');
    const { uid } = useSelector(state => state.auth);


    useEffect(() => {

       dispatch( eventStartLoading() );
       
    }, [dispatch])


    const onDoubleClick = () => {
        dispatch(uiOpenModal())
    }

    const onSelectEvent = (e) => {
        dispatch(eventSetActive(e))

    }

    const onViewChange = (e) => {
        setLastView(e);
        localStorage.setItem('lastView', e);
    }

    const onSelectSlot = (e)=>{
         dispatch( eventClearActiveEvent() );
    }

    const eventStyleGetter = (event, start, end, isSelected) => {
        
        const style = {
            backgroundColor: (uid === event.user._id ) ? '#367CF7' : '#465660',
            bordeRadius: '0px',
            opacity: 0.8,
            display: 'bock',
            color: 'white'
        }
        return {
            style
        }
    };

    return (
        <div className="calendar-screen">
            <Navbar />
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                messages={messages}
                eventPropGetter={eventStyleGetter}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelectEvent}
                onView={onViewChange}
                onSelectSlot={ onSelectSlot}
                selectable={true}
                view={lastView}
                components={{
                    event: CalendarEvent
                }}
            />

            <AddNewFab/>
            {
                (activeEvent) && <DeleteEventFab />
            }
            
            
            <CalendarModal />
        </div>
    )
}