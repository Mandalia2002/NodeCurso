import fs from 'fs'
import http2 from 'http2'

const server = http2.createSecureServer({
    key: fs.readFileSync('./keys/server.key'),
    cert: fs.readFileSync('./keys/server.crt')
}, (req, res) => {
    console.log(req.url)

    // res.writeHead(200, {'content-type': 'text/html'})
    // res.write(`<h1>Sandia ${req.url}</h1>`)
    // 

    // const data = {name: 'aaa', age: 12, city: 'New York'}
    // res.writeHead(200, {'content-type': 'application/json'})
    // res.end(JSON.stringify(data))

    if (req.url === '/') {
        const htfile = fs.readFileSync('./public/index.html', 'utf-8')
        res.writeHead(200, { 'content-type': 'text/html' })
        res.end(htfile)
    } else if (req.url?.endsWith('.js')) {
        res.writeHead(200, { 'content-type': 'application/javascript' })
    } else if (req.url?.endsWith('.css')) {
        res.writeHead(200, { 'content-type': 'text/css' })
    }

    try{
    const respo = fs.readFileSync(`./public${req.url}`, 'utf-8')
    res.end(respo)
    } catch(error){
        res.writeHead(404, { 'content-type': 'text/html' })
        res.end()
    }
})

server.listen(8080, () => {
    console.log('running')
})