const http = require('http');

//implmenting phase 7 (CORS + Preflight)
const server = http.createServer((req,res) => {
    //1.step CORS Configuration
    const allowedOrigin = 'http://localhost:5000';
    const allowedMethods = 'GET,POST,PUT,DELETE,OPTIONS';
    const allowedHeaders = 'Content-Type, Authorization';

    //2.Handle preflight request
    if (req.method === 'OPTIONS') {
        res.writeHead(204, {
            'Access-Control-Allow-Origin': allowedMethods,
            'access-control-allow-headers': allowedHeaders,
            'access-control-max-age': 86400 // cache preflight for 24h
        });
        return res.end();
    }
    // 3. Set standard headers for all responses
    const commonHeaders = {
        'Access-Control-Allow-Origin': allowedOrigin,
        'Content-Type': 'application/json'
    };
    //4.Routes
    if (req.url === '/data' && req.method === 'GET') {
        res.writeHead(200, commonHeaders);
        return res.end(JSON.stringify({message: "This is CORS enabled data"}))
    }

    if (req.url === '/login' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => [
            body += chunk
        ]);
        req.on('end', () => {res.writeHead(200,commonHeaders)})
        res.end(JSON.stringify({message: "login successfull across origins"})
    )
    //Default
    res.writeHead(404,commonHeaders);
    res.end(JSON.stringify({error: "Not Found"}))
    }
})
PORT=5000;
server.listen(PORT, ()=> {
    console.log(`Phase 7 Server (CORS + Preflight)  running at http://localhost:${PORT}`)

})