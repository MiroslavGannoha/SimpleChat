var http = require("http"),
    connect = require('connect');

var app = connect()
  .use(connect.static('html'))
  //.use('/node_modules', connect.static('node_modules'))
  /*.use(function(req, res){
    res.end();
  })*/
 .listen(8888);
 console.log('Server is running http://localhost:8888/');