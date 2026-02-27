//testing phase 6 
const http = require('http');
const crypto = require('crypto') //build in Node module for IDS

PORT=5000

//1. store sessions in Memory
const sessions = new Map();

const app = http.createServer((req,res) => {
    //2. Parse cookie header on requests
    const cookies = req.headers.cookie ? Object.fromEntries(req.headers.cookie.split('; ').map(
        c => c.split('=')
    )): {};
    const sessionId = cookies.session_id;

    //LOGIN
    if (req.url === '/login' && req.method === 'POST') {
        //Generate session ID
        const newSessionId = crypto.randomUUID();
        //store in memory with some user data
        sessions.set(newSessionId, {user: 'Student123', createdAt: Date.now()});

        //3. send Set-Cookie header (http-only and same-site flags)
        res.writeHead(200, {
            'Set-Cookie':`session_id=${newSessionId}; HttpOnly; Path=/; SameSite=Strict`,'Content-Type':'text/plain'
        });
        return res.end('Logged in successfully!')
    }
    //PROTECTED ROUTE
    if (req.url === '/dashboard') {
        //4.validate session for protected routes 
        if (sessionId && sessions.has(sessionId)) {
            const sessionData = sessions.get(sessionId);
            res.writeHead(200, {'Content-Type': 'text/html'});
            return res.end(`<h1>Welcme back, </> ${sessionData.user}`);
        } else {
            res.writeHead(401);
            return res.end('Unauthorized: Please login first.');
        }
    }
    //Default 404
    res.writeHead(404);
    res.end('Not Found');
})



app.listen(PORT, ()=> {
    console.log(`Server running at http://localhost:${PORT}`)
})