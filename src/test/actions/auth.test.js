import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Swal from 'sweetalert2';

import '@testing-library/jest-dom';

import { startLogin, startRegister, startChecking } from '../../actions/auth';
import { types } from '../../types/types';
import * as fetchModule from '../../components/helpers/fetch';




jest.mock('sweetalert2', () => ({
    fire: jest.fn()
}))

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};
let store = mockStore(initState);

Storage.prototype.setItem = jest.fn();

describe('Pruebas en las acciones Auth', () => {

    beforeEach(() => {
        store = mockStore(initState);
        jest.clearAllMocks();
    });

    test('starLogin correcto', async () => {

        await store.dispatch(startLogin('fernando@gmail.com', '123456'))

        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.authLogin,
            payload: {
                uid: expect.any(String),
                name: expect.any(String)
            }
        })

        expect(localStorage.setItem).toHaveBeenCalledWith('token', expect.any(String));
        expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number));

    })


    test('startLogin incorrecto', async () => {

        await store.dispatch(startLogin('fernando@gmail.com', '1234568o'));
        let actions = store.getActions();

        expect(actions).toEqual([]);
        expect(Swal.fire).toHaveBeenCalledWith('Error', 'Password incorrecto', 'error');


        await store.dispatch(startLogin('fernando@gmail2.com', '123456'));
        actions = store.getActions();

        expect(Swal.fire).toHaveBeenCalledWith('Error', 'El usuario no existe, con ese email', 'error');

    })

    test('startRegister correcto', async () => {

        fetchModule.fetchSinToken = jest.fn(() => ({
            json() {
                return {
                    ok: true,
                    uid: '123',
                    name: 'carlos',
                    token: 'ABEDDLAKJSDF'
                }
            }
        }));

        await store.dispatch(startRegister('test', 'test@test.com', '123456'));

        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.authLogin,
            payload: {
                uid: '123',
                name: 'carlos'
            }
        })

        expect(localStorage.setItem).toHaveBeenCalledWith('token', 'ABEDDLAKJSDF');
        expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number));

    })


    test('should startChecking', async () => {

        fetchModule.fetchConToken = jest.fn(() => ({
            json() {
                return {
                    ok: true,
                    uid: '123',
                    name: 'carlos',
                    token: 'ABEDDLAKJSDF'
                }
            }
        }));

        await store.dispatch(startChecking());
        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.authLogin,
            payload: {
                uid: '123',
                name: 'carlos'
            }
        });

        expect(localStorage.setItem).toHaveBeenCalledWith('token', 'ABEDDLAKJSDF');

    })


})
