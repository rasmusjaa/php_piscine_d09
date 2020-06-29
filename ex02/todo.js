var parentDiv;
var cookie = [];

window.onload = function () {
    parentDiv = document.getElementById("ft_list");
    var allcookies = document.cookie;
    if (allcookies) {
        var cookiearray = allcookies.split(';');
        var value = cookiearray[0].split('=')[1];
        var newContent;
        cookie = JSON.parse(value);
        cookie.forEach(function(entry) {
            newContent = document.createTextNode(entry);
            noteToDo(newContent);
        });
    }
};

window.onunload = function () {
    WriteCookie()
};

function WriteCookie() {
    var now = new Date();
    now.setMonth( now.getMonth() + 1 );
    var todo = parentDiv.children;
    var newCookie = [];
    for (var i = 0; i < todo.length; i++) {
        newCookie.unshift(todo[i].innerHTML);
    }
    var x = JSON.stringify(newCookie);
    document.cookie = "cookie=" + x + ";";
    document.cookie = "expires=" + now.toUTCString() + ";"
}

function ReadCookie() {
    var allcookies = document.cookie;
    var cookiearray = allcookies.split(';');
    var name = cookiearray[0].split('=')[0];
    var value = cookiearray[0].split('=')[1];
    var newContent = document.createTextNode(value);
    noteToDo(newContent);
}

function delNote(e) {
    if (e.target.className === "note") {
        if (confirm("Do you want to remove this TO DO note?") === true) {
            e.target.remove();
        }
    }
}

function note() {
    var doc = prompt("Please enter some text", "Note"); 
    if (doc && doc != '') {
        noteToDo(document.createTextNode(doc));
    }
}

function noteToDo(todo) {
    var newDiv = document.createElement("div");
    newDiv.classList.add("note");
    newDiv.appendChild(todo);
    parentDiv.insertBefore(newDiv, parentDiv.firstChild); 
}

function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}
