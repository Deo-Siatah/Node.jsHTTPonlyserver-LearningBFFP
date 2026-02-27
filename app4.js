const http = require('http');

const server = http.createServer((req,res) => {
    //1. Content Negotiation: Format (json vs html)
    const acceptHeader = req.headers['accept'] || '';
    //1. Content Negotiation-language
    const acceptLang = req.headers['accept-language'] || '';
    //data 
    const greetings = {
        'en': {title: 'Welcome', msg: 'Hello world!'},
        'es': {title: 'Bienvenido', msg: '¡Hola mundo!'},
        'fr': {title: 'Bienvenue', msg: 'Bonjour le monde!'}
    };
    //pick the language based on header 
    const lang = acceptLang.startsWith('es') ? 'es' : acceptLang.startsWith('fr') ? 'fr' : 'en';
    const content = greetings[lang];

    //3. The vary header
    // tells caches that the response varies based on the Accept-Language header
    res.setHeader('Vary', 'Accept, Accept-Language');

    if (acceptHeader.includes('text/html')) {
        //Return HTML
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(`
            <html>
                <body>
                    <h1>${content.title}</h1>
                    <p>${content.msg}</p>
                </body>
            </html>
        `);
    } else {
        //Default to JSON
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(content));
    }
})

server.listen(5000,() => 
    console.log(`Server running (phase 10) at http://localhost:${5000}`
 ));