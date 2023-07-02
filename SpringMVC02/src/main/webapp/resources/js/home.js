$(() => {
	loadList();
});

function loadList() {
	$.ajax({
		url: "boardList.do",
		dataType: "json",
		type: "get",
		success: function(data) {
			makeView(data);
			goList()
		},
		error: error
	});
}

function makeView(data) {

	let boardHtml = [];
	const $view = $("#view");
	boardHtml.push("<table class='table table-bordered'>");

	boardHtml.push("<thead>");
	boardHtml.push("<tr>");
	boardHtml.push("<td>번호</td>");
	boardHtml.push("<td>제목</td>");
	boardHtml.push("<td>작성자</td>");
	boardHtml.push("<td>작성일</td>");
	boardHtml.push("<td>조회수</td>");
	boardHtml.push("</tr>");
	boardHtml.push("</thead>");

	boardHtml.push("<tbody>");
	$.each(data, function(index, object) {
		boardHtml.push("<tr>");
		boardHtml.push("<td>" + object.idx + "</td>");
		boardHtml.push(`<td><a href="javascript:showBoardContext(${object.idx})">${object.title}</a></td>`);
		boardHtml.push("<td>" + object.writer + "</td>");
		boardHtml.push("<td>" + object.indate + "</td>");
		boardHtml.push("<td>" + object.count + "</td>");
		boardHtml.push("</tr>");

		boardHtml.push(`<tr id="b${object.idx}" style="display:none">`);
		boardHtml.push("<td>내용</td>");
		boardHtml.push("<td colspan='4'>");
		boardHtml.push(`<textarea row="7" class="form-control" readonly>${object.content}</textarea>`);
		boardHtml.push("</td>")
		boardHtml.push("</tr>");

	});
	boardHtml.push("</tbody>");

	boardHtml.push("<tr>");
	boardHtml.push("<td colspan='5'>");
	boardHtml.push("<button type='button' class='btn btn-primary btn-sm' value='글 쓰기' onclick='goForm()'>글 쓰기</button>");
	boardHtml.push("</td>");
	boardHtml.push("</tr>");
	boardHtml.push("</table>");
	$view.html(boardHtml.join(" "));



} // End makeView ()

function goForm() {
	$("#view").css("display", "none");
	$("#boardForm").css("display", "block");
}

function goList() {
	$("#view").css("display", "block");
	$("#boardForm").css("display", "none");
}

function boardInsert() {
	let formData = $("#tableForm").serialize();

	$.ajax({
		url: "boardInsert.do",
		type: "post",
		data: formData,
		success: loadList,
		error: error
	});

	$("#title").val("");
	$("#content").val("");
	$("#writer").val("");
}

function error() {
	alert("Ajax 통신 에러");
}

function showBoardContext(idx) {

	let $targetId = $(`#b${idx}`);
	let displayValue = $targetId.css("display");

	if (displayValue === "none") {
		displayValue = "table-row";
		$targetId.css("display", displayValue);
	} else {
		displayValue = "none";
		$targetId.css("display", displayValue);
	}
}
