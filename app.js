const http = require('http');
const PORT=5000

// //create a server 
// const server = http.createServer((req, res) => {
//     console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
//     if (req.url ==='/api/data' && req.method === 'GET') {
//         res.writeHead(200, {'Content-Type': 'application/json'});
//         res.end(JSON.stringify({ message: 'Hello from the server!' }));
//     }
//     else if (req.url === '/api/data' && req.method === 'POST') {
//         let body = '';
//         req.on('data',chunk => {
//             body += chunk.toString();
//         })
//         req.on('end', () => {
//             console.log('Received data:', body);
//             res.writeHead(200, {'Content-Type': 'text/html','Accept-Language':'es-ES'});
//             res.write('<h1>Successfully posted </h1>');
//             res.end();
//         })
//     }
//     else if (req.url === '/api/data/' && req.method === 'PUT') {
//         const id = req.url.split('/')[3];

//         let body = '';
//         req.on('data',chunk => {
//             body += chunk.toString();
//         });
//         req.on('end', () => {
//             console.log(`Received data for update ID ${id}:`, body);
//             res.writeHead(200, {'Content-Type': 'application/json'});
//             res.end(JSON.stringify({ message: `Data with ID ${id} updated successfully!` }));
//         })
//     }
//     else if (req.url === '/api/data/:id' && req.method === 'DELETE') {
//         res.writeHead(200, {'Content-Type': 'application/json'});
//         res.end(JSON.stringify({ message: 'Data deleted successfully!' }));
//     }
//     else {
//         res.writeHead(404, {'Content-Type': 'application/json'});
//         res.end(JSON.stringify({ message: 'Endpoint not found' }));
//     }
// });

//Implementing phase 5
let items = {1: {name: 'Item One'}}

const server = http.createServer((req,res) => {
    const urlParts = req.url.split('/');
    const id = urlParts[2];

    //1.GET
    if (req.method === 'GET' && id) {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(items[id] || {error: "Not Found"}))
    }

    //2.PUT Idempontent 
    else if (req.method === 'PUT' && id) {
        let body = '';
        req.on('data',chunk => {
            body += chunk
        })
        req.on('end', () => {
            items[id] = JSON.parse(body);
            res.writeHead(200, {'Content-Type':'application/json'});
            res.end(JSON.stringify({message: "updated successfully",data: items[id]}))
        });
    }
    //POST (Non idempotent)
    else if (req.method ==='POST') {
        let body = '';
        req.on('data',chunk => {
            body += chunk
        });
        req.on('end', () => {
            const newId = Date.now(); //new id
            items[newId] = JSON.parse(body);
            res.writeHead(201, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({message: "Created", id: newId}))
        });
    }
    //4.Delete
    else if (req.method === 'DELETE' && id) {
        delete items[id];
        res.writeHead(204);
        res.end(JSON.stringify({message:"deleted successfully",data:items[id]}));
    }
})
server.listen(PORT,() => {
    console.log(`Server running at http://localhost:${PORT}`);
})