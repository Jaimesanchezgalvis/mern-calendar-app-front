import { fetchSinToken, fetchConToken } from "../../components/helpers/fetch"

describe('Pruebas en el helper Fetch', () => {

    let token = '';

    test('Fetchsintoken debe funcionar', async () => {

        const resp = await fetchSinToken('auth', { email: 'jaime@gmail.com', password: '1234567' }, 'POST')
        expect(resp instanceof Response).toBe(true);
        const body = await resp.json()
        expect(body.ok).toBe(true);
        token = body.token;

    })

    test('Fetchcontoken debe funcionar', async () => {

        localStorage.setItem('token', token);
        const resp = await fetchConToken('events/617a9e8183b5a29637431415', {}, 'DELETE');
        const body = await resp.json();
        expect(body.msg).toBe('Evento no existe por ese id');

    })

})
