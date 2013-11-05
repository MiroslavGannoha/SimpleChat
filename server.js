function start(){
    var http = require('http'),
        connect = require('connect');

    var app = connect()
        .use(connect.static('html'))
        .listen(8888);
    console.log('Server is running http://localhost:8888/');
 }
 exports.start = start;