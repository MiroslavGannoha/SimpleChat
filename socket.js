function start(){
    // Подключаем модуль и ставим на прослушивание 8080-порта - 80й обычно занят под http-сервер
    var io = require('socket.io').listen(8081); 
    // Отключаем вывод полного лога - пригодится в production'е
    io.set('log level', 2);
    // Навешиваем обработчик на подключение нового клиента
    io.sockets.on('connection', function (socket, data) {
        // Т.к. чат простой - в качестве ников пока используем первые 5 символов от ID сокета
        var ID = (socket.id).toString().substr(0, 5);
        var time = (new Date).toLocaleTimeString();
        var name = 'no name';
        // Навешиваем обработчик на входящее сообщение
        socket.on('message', function (d) {
            console.log('message', name)
            var data = JSON.parse(d);
            console.log(data);
            if (data.type == 'user_data') {
                name = data.name;
                // Посылаем клиенту сообщение о том, что он успешно подключился и его имя
                socket.json.send({'event': 'connected', 'name': name, 'time': time});
                // Посылаем всем остальным пользователям, что подключился новый клиент и его имя
                socket.broadcast.json.send({'event': 'userJoined', 'name': name, 'time': time});
            }
            else{
                // Уведомляем клиента, что его сообщение успешно дошло до сервера
                socket.json.send({'event': 'messageSent', 'name': name, 'text': data.text, 'time': data.time, 'sender': name});
                // Отсылаем сообщение остальным участникам чата
                socket.broadcast.json.send({'event': 'messageReceived', 'name': name, 'text': data.text, 'time': data.time, 'sender': name});
            }
    });
        // При отключении клиента - уведомляем остальных
        socket.on('disconnect', function() {
            var time = (new Date).toLocaleTimeString();
            io.sockets.json.send({'event': 'userSplit', 'name': name, 'time': time});
        });
    });

    /* handshake
    io.set('authorization', function (data) {
        console.log('data11: ', data.query);
    });*/
}
exports.start = start;