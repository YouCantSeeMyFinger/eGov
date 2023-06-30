$(document).ready(function() {
	loadList();
});

function loadList() {
	$.ajax({
		url: "boardList.do",
		dataType: "json",
		type: "get",
		success: makeView,
		error: function() {
			alert("error");
		}
	});
}

function makeView(data) {
	alert(data);
}