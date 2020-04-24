"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/ChatHub").build();
var user
var TextItem
var groups
var group
var item
var itemText
var editable
var viewable
var items
var CurrentGroup
var sel = document.getElementById("groups");
var iel = document.getElementById("items");

//Disable send button until connection is established
document.getElementById("NewGroup").disabled = true;
document.getElementById("SelectGroup").disabled = true;
document.getElementById("NewItem").disabled = true;
document.getElementById("SelectItems").disabled = true;

connection.on("ReceiveMessage", function (user) {
    var encodedMsg = user;
    var li = document.createElement("li");
    li.textContent = encodedMsg;
    document.getElementById("messagesList").appendChild(li);
});



connection.start().then(function () {
    document.getElementById("sendButton").disabled = false;

    connection.invoke("getGroups", "  ").catch(function (err) {
        return console.error(err.toString());
    });

}).catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("sendButton").addEventListener("click", function (event) {

    document.getElementById("NewGroup").disabled = false;
    document.getElementById("SelectGroup").disabled = false;
    user = document.getElementById("userInput").value;
    alert("User: " + user);
    var message = document.getElementById("messageInput").value;
    connection.invoke("SendMessage", user).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});
document.getElementById("NewGroup").addEventListener("click", function (event) {



    var message = document.getElementById("messageInput").value;
    alert("New Group: " + message);
    connection.invoke("NewGroup", message).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});

document.getElementById("NewItem").addEventListener("click", function (event) {


    var message = document.getElementById("ItemInput").value;
    alert("New item: " + message);
    connection.invoke("NewItem", CurrentGroup, message,user).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});

document.getElementById("SelectGroup").addEventListener("click", function (event) {

    document.getElementById("NewItem").disabled = false;
    document.getElementById("SelectItems").disabled = false;

    var s = document.getElementById("groups");
    var e = s.options[s.selectedIndex].value;
    CurrentGroup = e;
    alert("New Group: " + e + user);
    connection.invoke("getItems", e, user).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});

document.getElementById("SelectItems").addEventListener("click", function (event) {


    var s = document.getElementById("items");
    var e = s.options[s.selectedIndex].value;
    item = e;
    alert("item: " + e);
    connection.invoke("GetItem", CurrentGroup, item).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
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
connection.on("ReceiveItems", function (itemsList) {
    items = itemsList;
    alert(items[0]);
    alert("length " + iel.options.length);
    var i, L = iel.options.length - 1;
    for (i = L; i >= 0; i--) {
        iel.remove(i);
    }

    for (var i = 0; i < items.length; i++) {
      
        var ipt = document.createElement('option');
        ipt.innerHTML = items[i];
        ipt.value = items[i];
        iel.appendChild(ipt);

    }
});

connection.on("ReceiveItem", function (n) {

    alert("debug");

    var x = n.split(",");

    itemText = x[0];
    editable = x[2];
    viewable = x[1];

    document.getElementById("textid").value = itemText;

    alert(itemText + editable + viewable);

    //Checkbox for Edit
    var editCheck = document.createElement('input');
    editCheck.type = "checkbox";
    editCheck.id = "edit";

    //Label for Edit Checkbox
    var checkLabel = document.createElement('label');
    checkLabel.htmlFor = "edit";
    var textin = document.createTextNode("Edit?");
    checkLabel.appendChild(textin);

});