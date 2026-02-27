//implementing phase 8 (caching) and 9(http compression)
const http = require('http');
const zlib = require('zlib');//built in compression module
const crypto = require('crypto'); //to generate ETags
const { timeStamp } = require('console');
const { buffer } = require('stream/consumers');

const server = http.createServer((req,res) => {
    //Data to serve
    const data = JSON.stringify({message: "Perfomance optimized data!",timeStamp:Date.now()});

    //HTTTP Caching
    //generate an ETag based on the data content.
    const etag = crypto.createHash('md5').update(data).digest('hex');
    
    //checkif client already has this version
    if (req.headers['if-none-match'] === etag) {
        res.writeHead(304); // Not Modified
        return res.end();
    }

    // phase 9: HTTP COMPRESSION
    const acceptEncoding = req.headers['accept-encoding'] || '';
    let responseData = data;
    const headers = {
        'Content-Type':'application/json',
        'ETag': etag,
        'Cache-Control': 'public, max-age=3600' //cache for an hour
    };

    //check if client supports gzip
    if (acceptEncoding.includes('gzip')) {
        zlib.gzip(data, (err,buffer) => {
            if (!err) {
                headers['Content-Encoding'] = 'gzip';
                res.writeHead(200, headers);
                res.end(buffer);
            } else {
                res.writeHead(500);
                res.end('Error compressing data');
            }
        });
    } else {
        res.writeHead(200,headers);
        res.end(responseData);
    }
});


server.listen(5000,() => 
    console.log(`Phase 8 and 9 running at http://localhost:${5000}`)
)