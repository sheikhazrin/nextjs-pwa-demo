import axios from 'axios'
import { type } from 'os';

axios.defaults.withCredentials = true

export const loginUser = async ({ email, password }) => {
    try {
        const { data } = await axios.post('/api/login', { email, password })
        if(typeof window !== 'undefined') {
            window[WINDOW_USER_SCRIPT_VARIABLE] = data || {}
        }
        return {
            data,
            err_code: 0
        }
    } catch(err) {
        return {
            message: err.message,
            err_code: 1
        }
    }
}

export const getUserProfile = async () => {
    const { data } = await axios.get('http://localhost:3000/api/dashboard');
    
    return data
}

export const getServerSideToken = (req) => {
    const { signedCookies = {}} = req || {};

    if (!signedCookies) {
        return {}
    } else if (!signedCookies.token) {
        return {}
    }

    return {
        user: signedCookies.token
    }
}

export const getClientSideToken = () => {
    if (typeof window !== 'undefined') {
        const user = window[WINDOW_USER_SCRIPT_VARIABLE] || {}
        return { user };
    }

    return { user: {} }
}

const WINDOW_USER_SCRIPT_VARIABLE = '__USER__'

export const getUserScript = user => {
    return `${WINDOW_USER_SCRIPT_VARIABLE} = ${JSON.stringify(user)};`
}

export const authInitialProps = () => ({ req }) => {
    const auth = req ? getServerSideToken(req) : getClientSideToken();
    
    return { auth }
}