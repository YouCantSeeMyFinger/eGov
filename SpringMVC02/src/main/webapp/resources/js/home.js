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
	// table 시작
	let listHtml = "<table class = 'table table-bordered'>"

	// thead 추가
	listHtml += "<tr>"
	listHtml += "<td>번호</td>"
	listHtml += "<td>제목</td>"
	listHtml += "<td>작성자</td>"
	listHtml += "<td>작성일</td>"
	listHtml += "<td>조회수</td>"
	listHtml += "</tr>"

	// tbody 함수
	// 반복문
	$.each(data, function(index, object) {
		listHtml += "<tr>"
		listHtml += "<td>" + object.idx + "</td>"
		listHtml += "<td>" + object.title + "</td>"
		listHtml += "<td>" + object.writer + "</td>"
		listHtml += "<td>" + object.indate + "</td>"
		listHtml += "<td>" + object.count + "</td>"
		listHtml += "</tr>"
	});

	// table 끝
	listHtml += "</table>"

	$("#view").html(listHtml);
}