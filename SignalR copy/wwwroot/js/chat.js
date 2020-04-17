"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();
var groups;
var sel = document.getElementById("groups");



//Disable send button until connection is established


connection.on("ReceiveMessage", function (newItem) {
    alert("Owner: " + newItem.Owner);
});

connection.on("ReceiveGroups", function (groupList) {
    groups = groupList;

    var i, L = sel.options.length - 1;
    for (i = L; i >= 0; i--) {
        sel.remove(i);
    }

    for (var i = 0; i < groups.length; i++) {
        var opt = document.createElement('option');
        opt.innerHTML = groups[i];
        opt.value = groups[i];
        sel.appendChild(opt);
        
    }
});

connection.on("Hope", function (Owner,items) {
    alert("Owner: " + Owner
        + "item:" + items[1]);
});

connection.start().then(function () {
    connection.invoke("getGroups", "  ").catch(function (err) {
        return console.error(err.toString());
    });
}).catch(function (err) {
    return console.error(err.toString());
});



document.getElementById("sendButton").addEventListener("click", function (event) {
    var user = document.getElementById("userInput").value;
    var message = document.getElementById("messageInput").value;
    connection.invoke("SendMessage", user, message).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});

document.getElementById("updater").addEventListener("click", function (event) {

    connection.invoke("getGroups", "  ").catch(function (err) {
        return console.error(err.toString());
    });
   

    event.preventDefault();
});


