const next = require('next')
const express = require('express')
const axios = require('axios')
const url = require('url')
const cookieParser = require('cookie-parser')
const dev = process.env.NODE_ENV !== 'production'
const path = require('path')
const app = next({ dev })
const port = process.env.PORT || 3000
const handle = app.getRequestHandler()
// const debug = require('debug')('BreakPoint')

const COOKIE_SECRET = '1234567890@1'
const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: !dev,
    signed: true,
}

const authenticate = async (email, password) => {
    const { data } = await axios.get(
        'https://jsonplaceholder.typicode.com/users'
    )
    return data.find(user => {
        if (user.email === email && user.website === password) return user
    })
}

app.prepare().then(() => {
    const server = express()
    server.use(express.json())
    server.use(cookieParser(COOKIE_SECRET));
    server.get('/login', (req, res) => {
        return app.render(req, res, '/login')
    })

    server.post('/api/login', async (req, res) => {
        const { email, password } = req.body
        const user = await authenticate(email, password)
        if (!user) {
            res.status(403).send('Invalid email or password')
        }

        const userData = {
            email,
            password,
            type: 'authenticated',
        }
        res.cookie('token', userData, COOKIE_OPTIONS)
        res.json(userData)
    })

    server.get('/dashboard', (req, res) => {
        app.render(req, res, '/dashboard')
    })

    server.get('/api/dashboard', async (req, res) => {
        // debug("req. signedCookies", req.signedCookies)
        const { token } = req.signedCookies

        try {
            if (token && token.email) {
                const { data } = await axios.get(
                    'https://jsonplaceholder.typicode.com/users'
                )

                const userProfile = data.find(
                    user => user.email === token.email
                )

                return res.json({ user: userProfile })
            }

            return res.sendStatus(404)
        } catch (err) {
            console.log(err)
        }
    })

    server.get('*', (req, res) => {
        const parseUrl = url.parse(req.url, true)
        const { pathname } = parseUrl

        if (pathname === '/service-worker.js') {
            const filePath = path.join(__dirname, '.next', pathname)
            app.serveStatic(req, res, filePath)
        } else {
            handle(req, res, parseUrl)
        }
    })


    server.listen(port, () => {
        console.log(`Listening on port: ${port}`)
    })
})
