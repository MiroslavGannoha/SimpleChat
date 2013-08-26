var http = require("http"),
    connect = require('connect'),
    is = require('socket.io');

var app = connect()
  .use(connect.static('html'))
  /*.use(connect.static('../realtimemultiplayer','realtimemultiplayer'))
  .use(function(req, res){
    res.end();
  })*/
 .listen(8888);
 console.log('Server is running http://localhost:8888/')