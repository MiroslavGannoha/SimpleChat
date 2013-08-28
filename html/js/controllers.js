'use strict';

/* Controllers */

function chatController($scope, $http) {
    $scope.messages=[
        {text: 'starting message 1', sender: 'Pablo', id: 1, time: 1377600381344},
        {text: 'starting message 2', sender: 'Pablo', id: 2, time: 1377600381344}
    ];
    
    $scope.addMessage = function(msg){

        if ($scope.InputContent === '') return;
        var message;
        console.log(socket)
        if (msg){
            message = msg;
        }
        else{
            message = {
                "time": new Date(),
                "text": $scope.inputContent,
                "sender": (socket.socket.sessionid).substr(0, 5),
                "id": 5
            };
            socket.send(JSON.stringify(message));
        }

        $scope.messages.push(message);
        $scope.inputContent = '';

        //socket.send($scope.inputContent);
    };

    $scope.receiveMessage = function(msg){
        $scope.addMessage(msg)
        $scope.$digest();

    };


    var strings = {
        'connected': '[sys][time]%time%[/time]: Вы успешно соединились к сервером как [user]%name%[/user].[/sys]',
        'userJoined': '[sys][time]%time%[/time]: Пользователь [user]%name%[/user] присоединился к чату.[/sys]',
        'messageSent': '[out][time]%time%[/time]: [user]%name%[/user]: %text%[/out]',
        'messageReceived': '[in][time]%time%[/time]: [user]%name%[/user]: %text%[/in]',
        'userSplit': '[sys][time]%time%[/time]: Пользователь [user]%name%[/user] покинул чат.[/sys]'
    };
    if (navigator.userAgent.toLowerCase().indexOf('chrome') != -1) {
        var socket = io.connect('http://localhost:8080', {'transports': ['xhr-polling']});
    } else {
        var socket = io.connect('http://localhost:8080');
    }

    socket.on('connect', function () {
        socket.on('message', function (msg) {
            console.log(msg.event, msg);
            if(msg.event == 'messageReceived'){
                $scope.receiveMessage(msg);
            }
            else if (msg.event == 'connected' || msg.event == 'userJoined'){
                document.querySelector('#log').innerHTML += strings[msg.event].replace(/\[([a-z]+)\]/g, '<span class="$1">').replace(/\[\/[a-z]+\]/g, '</span>').replace(/\%time\%/, msg.time).replace(/\%name\%/, msg.name).replace(/\%text\%/, unescape(msg.text).replace('<', '&lt;').replace('>', '&gt;')) + '<br>';
            }
            // Добавляем в лог сообщение, заменив время, имя и текст на полученные
        });     
    });
}