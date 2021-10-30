
import { types } from '../types/types';

describe('Pruebas en Types', () => {

    test('los types debesn de ser iguales', () => {

        expect(types).toEqual({

            uiOpenModal: '[ui] Open modal',
            uiCloseModal: '[ui] Close modal',

            eventSetActive: '[event] Set Active',
            eventLogout: '[event] Logout event',

            eventStartAddNew: '[event] Start Add new',
            eventAddNew: '[event] Add new',
            eventClearActiveEvent: '[event] Clear active event',
            eventUpdate: '[event] Event updated',
            eventDeleted: '[event] Event deleted',
            eventLoaded: '[event] Events loaded',

            authChekingFinish: '[auth] Finish Checking login state',
            authStartLogin: '[auth] Start login',
            authLogin: '[auth] login',
            authStartRegister: '[auth] Start Register',
            authStartTokenRenew: '[auth] Start token renew',
            authLogout: '[auth] Logotu',

        })
    })
})