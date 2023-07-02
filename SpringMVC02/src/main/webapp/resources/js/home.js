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
		boardHtml.push(`<td id="title${object.idx}" ><a href="javascript:showBoardContext(${object.idx})">${object.title}</a></td>`);
		boardHtml.push("<td>" + object.writer + "</td>");
		boardHtml.push("<td>" + object.indate + "</td>");
		boardHtml.push(`<td id="cnt${object.idx}">${object.count}</td>`);
		boardHtml.push("</tr>");

		boardHtml.push(`<tr id="b${object.idx}" style="display:none">`);
		boardHtml.push("<td>내용</td>");
		boardHtml.push("<td colspan='4'>");
		boardHtml.push(`<textarea row="7" class="form-control" id="boardContent${object.idx}" readonly></textarea>`);
		boardHtml.push(`<br>`);
		boardHtml.push(`<span id="update${object.idx}"><button type="button" class="btn btn-sm btn-success" onclick="goUpdateForm(${object.idx})">수정화면</button><span>`);
		boardHtml.push(`<button type="button" class="btn btn-sm btn-warning" onclick="goDelete(${object.idx})">삭제</button>`);
		boardHtml.push("</td>");
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

		$.ajax({
			url: "boardContent.do",
			type: "get",
			data: { "idx": `${idx}` },
			dataType: "json",
			success: function(data) {
				$(`#boardContent${idx}`).val(data.content);
			},
			error: error,

		});

		$targetId.css("display", displayValue);
		$(`#boardContent${idx}`).attr("readonly", true);
	} else {
		displayValue = "none";
		$targetId.css("display", displayValue);

		$.ajax({
			url: "boardViewCount",
			type: "post",
			data: { "idx": `${idx}` },
			dataType: "json",
			success: function(data) {
				$(`#cnt${idx}`).text(data.count);
			},
			error: function() {
				alert("조회수 오류");
			}
		});
	}
}

function goDelete(idx) {
	$.ajax({
		url: "goDelete.do",
		type: "post",
		data: { "idx": idx },
		success: loadList,
		error: error,
	});
}

function goUpdateForm(idx) {
	let textValue = $(`#title${idx}`).text();
	let newInputTitle = `<input class="form-control" type="text" value="${textValue}" id="newInputTitle${idx}"></input>`;
	let newButton1 = `<button class="btn btn-sm btn-success" onclick="goUpdate(${idx})">수정</button>&nbsp`;
	let newButton2 = `<button class="btn btn-sm btn-warning" onclick="cancleUpdate()">취소</button>`;

	let newButton = newButton1 + newButton2;
	$(`#boardContent${idx}`).attr("readonly", false);
	$(`#title${idx}`).html(newInputTitle);
	$(`#update${idx}`).html(newButton);
}

function cancleUpdate() {
	loadList();
}

function goUpdate(idx) {
	let updateTitleValue = $(`#newInputTitle${idx}`).val();
	let updateContentValue = $(`#boardContent${idx}`).val();

	$.ajax({
		url: "boardUpdate.do",
		type: "post",
		data: {
			"title": `${updateTitleValue}`,
			"content": `${updateContentValue}`,
			"idx": `${idx}`
		},
		success: function() {
			loadList();
			alert("수정되었습니다.");
		},
		error: error
	});
}
