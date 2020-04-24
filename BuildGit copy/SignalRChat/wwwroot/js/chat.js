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
var div = document.getElementById("items");
var it = document.getElementById("textid");

var editCheck = document.getElementById("edit");
var checkvis = document.getElementById("isvis");

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

    var message = document.getElementById("messageInput").value;
    connection.invoke("SendMessage", user).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});
document.getElementById("NewGroup").addEventListener("click", function (event) {



    var message = document.getElementById("messageInput").value;

    connection.invoke("NewGroup", message).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});

document.getElementById("NewItem").addEventListener("click", function (event) {


    var message = document.getElementById("ItemInput").value;
 
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
    
    connection.invoke("getItems", e, user).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});

document.getElementById("SelectItems").addEventListener("click", function (event) {


    var s = document.getElementById("items");
    var e = s.options[s.selectedIndex].value;
    item = e;
  
    connection.invoke("GetItem", CurrentGroup, item).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});

document.getElementById("UpdateItem").addEventListener("click", function (event) {

    


    itemText = it.value

    connection.invoke("UpdateItem", CurrentGroup, item, itemText, editable, viewable).catch(function (err) {
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

   

    var x = n.split(",");

    itemText = x[0];
    editable = x[2];
    viewable = x[1];

    document.getElementById("textid").value = itemText;

    

    if (editable === "1") {
        editCheck.checked = true;

    } else {
        editCheck.checked = false;
    }


    if (viewable === "1") {
        checkvis.checked = true;

    } else {
        checkvis.checked = false;
    }


    if (editCheck.checked === true) {

        editable = "1";

        open(it);
    }
    else {



        editable = "0";

        alert(editable);

        closed(it);
    }



});

function showEdit() {
    var button = document.getElementById("additem");
}

function open(it) {
    it.readOnly = false;
}

function closed(it) {
    it.readOnly = true;
}






editCheck.onclick = function () {

    

    if (editCheck.checked === true) {

        editable = "1";


    }
    else {

        

        editable = "0";

    }
};
checkvis.onclick = function () {

    if (checkvis.checked === true) {

        viewable = "1";

        open(it);
    }
    else {

        viewable = "0";

        closed(it);
    }

};

