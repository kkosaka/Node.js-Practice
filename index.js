var http = require('http');
var fs  = require('fs');
var url = require('url');
var qs = require('querystring');

var indexPage = fs.readFileSync('./index.html', 'utf-8');

var server = http.createServer((req, res)=>{
    if(req.method == 'GET') {
        var urlParts = url.parse(req.url, true);
        console.log('---GET Request---');
        console.log('url parse result: ', urlParts);
        console.log('name: ' + urlParts.query.name);
        console.log('age: ' + urlParts.query.age);
    } else {
        var body = '';
        req.on('data', (data)=>{
            body += data;
        });
        req.on('end', ()=>{
            var params = qs.parse(body);
            console.log('---POST Request---');
            console.log('url parse result: ',params);
            console.log('name: ' + params.name);
            console.log('age: ' + params.age);
        });
    }
    // var target = "";
    // switch(req.url){
    //     case '/':
    //     case '/index':
    //         target = './index.html';
    //         break;
    //     case '/next':
    //         target = './next.html';
    //         break;
    //     default:
    //         res.writeHead('404', {'Content-Type': 'text/plain'});
    //         res.end('bad request');
    //         return;
    // }
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(indexPage);
    res.end();
});

server.listen(3000);
console.log('start server');