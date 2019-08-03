const next = require('next')
const http = require('http')
const url = require('url')
const dev = process.env.NODE_ENV !== 'production'
const path = require('path')
const app = next({ dev })
const port = process.env.PORT || 3000
const handle = app.getRequestHandler()

app.prepare().then(() => {
    http.createServer((req, res) => {
        const parseUrl = url.parse(req.url, true)
        const { pathname } = parseUrl

        if (pathname === '/service-worker.js') {
            const filePath = path.join(__dirname, '.next', pathname)
            app.serveStatic(req, res, filePath)
        } else {
            handle(req, res, parseUrl)
        }
    }).listen(port, () => {
        console.log(`Listening on port: ${port}`)
    })
})
