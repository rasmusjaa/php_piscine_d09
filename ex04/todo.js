$(document).ready(function() {
    n = 0;
    var content;
    var number;
	$.ajax({
		url: 'select.php',
		success: function(response) {
            var arr = JSON.parse(response);
			if (Array.isArray(arr) && arr[0] != '') {
				for (i = 0; i < arr.length; i++) {
					if (arr[i] != '') {
                        content = arr[i].split(';');
                        number = parseInt(content[0]);
                        $('#ft_list').prepend($("<div class='note'>" + content[1] + "</div>").click({param: number}, remove_task));
                        if (number > n) {
                            n = number;
                        }
                    }
				}
			}
		}
	});

	$('button').click(function() {
		var doc = prompt("Please enter some text", "Note"); 
        if (doc && doc != '') {
			n++;
			$('#ft_list').prepend($("<div class='note'>" + doc + "</div>").click({param: number}, remove_task));
			$.ajax({
				type: 'GET',
				url: 'insert.php?key=' + n + '&value=' + doc
			})
		}
	});
});


function remove_task(event) {
	if (confirm('Do you want to remove this TO DO note?')) {
		$.ajax({
			type: 'GET',
			url: 'delete.php?key=' + event.data.param
		})
		this.remove();
	}
}
