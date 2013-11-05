'use strict';

/* Controllers */
function authorizeController($scope, $rootScope) {
    $scope.$watch('name', function(name){
        $rootScope.name = name;
    });
}

function chatController($scope, $http, $location) {

    if(!$scope.name){
        $location.path('#/authorize');
        return;
    }
    $scope.messages=[
        {text: 'starting message 1', sender: 'Pablo', id: 1, time: 1377600381344},
        {text: 'starting message 2', sender: 'Pablo', id: 2, time: 1377600381344}
    ];
    
    $scope.addMessage = function(msg){
        console.log('m', msg, $scope.inputContent);
        if (!$scope.inputContent && !msg) return;
        var message;
        if (msg){
            message = msg;
        }
        else{
            message = {
                "time": new Date(),
                "text": $scope.inputContent,
                "sender": $scope.name,
                "id": 5
            };
            socket.send(JSON.stringify(message));
        }

        $scope.messages.push(message);
        $scope.inputContent = '';

        //socket.send($scope.inputContent);
        console.log($scope.messages)
    };

    $scope.receiveMessage = function(msg){
        console.log('receive message', msg)
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
        var socket = io.connect('http://localhost:8081', {'transports': ['xhr-polling'], 'query': 'name:"123"'});
    } else {
        var socket = io.connect('http://localhost:8081');
    }

    socket.on('connect', function () {
        var user_data = {"name": $scope.name, "color": $scope.color, "type": 'user_data'};
        socket.send(JSON.stringify(user_data));
        socket.on('message', function (msg) {
            console.log('msg', msg.event, msg);
            if(msg.event == 'messageReceived'){
                $scope.receiveMessage(msg);
            }
            else if (msg.event == 'connected' || msg.event == 'userJoined' || msg.event == 'userSplit'){
                document.querySelector('#log').innerHTML += strings[msg.event].replace(/\[([a-z]+)\]/g, '<span class="$1">').replace(/\[\/[a-z]+\]/g, '</span>').replace(/\%time\%/, msg.time).replace(/\%name\%/, msg.name).replace(/\%text\%/, unescape(msg.text).replace('<', '&lt;').replace('>', '&gt;')) + '<br>';
            }
        });     
    });
}