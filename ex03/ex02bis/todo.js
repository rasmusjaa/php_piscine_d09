$(document).ready(function () {
    $("button").click(note);
    var cookie = [];
    var allcookies = document.cookie;
    if (allcookies) {
        var cookiearray = allcookies.split(';');
        var value = cookiearray[0].split('=')[1];
        cookie = JSON.parse(value);
        cookie.forEach(function(entry) {
            noteToDo(entry);
        });
    }
});

window.onunload = function () {
    WriteCookie()
};

function WriteCookie() {
    var now = new Date();
    now.setMonth( now.getMonth() + 1 );
    var todo = $("#ft_list").children();
    var newCookie = [];
    for (var i = 0; i < todo.length; i++) {
        newCookie.unshift(todo[i].innerHTML);
    }
    document.cookie = "cookie=" + JSON.stringify(newCookie) + ";" + "expires=" + now.toUTCString() + ";";
}

function delNote() {
    if (confirm("Do you want to remove this TO DO note?")) {
        this.remove();
    }
}

function note() {
    var doc = prompt("Please enter some text", "Note"); 
    if (doc && doc != '') {
        noteToDo(doc);
    }
}

function noteToDo(todo) {
    $("#ft_list").prepend($('<div class="note">'+ todo +'</div>').click(delNote));
}
