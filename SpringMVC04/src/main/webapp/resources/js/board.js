
// Ajax의 엔드포인트 확인잘하기

$(() => {
	loadList();
});

function loadList() {
	$.ajax({
		url: "board/list",
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
		boardHtml.push("<td>" + object.indate.split(" ")[0] + "</td>");
		boardHtml.push(`<td id="cnt${object.idx}">${object.count}</td>`);
		boardHtml.push("</tr>");

		boardHtml.push(`<tr id="b${object.idx}" style="display:none">`);
		boardHtml.push("<td>내용</td>");
		boardHtml.push("<td colspan='4'>");
		boardHtml.push(`<textarea row="7" class="form-control" id="boardContent${object.idx}" readonly></textarea>`);
		boardHtml.push(`<br>`);

		// #TODO 자신이 작성한 글만 수정 및 삭제가 가능하도록 해야한다.
		boardHtml.push(`<span id="update${object.idx}"><button type="button" class="btn btn-sm btn-success" onclick="goUpdateForm(${object.idx})">수정화면</button><span>`);
		boardHtml.push(`<button type="button" class="btn btn-sm btn-warning" onclick="goDelete(${object.idx})">삭제</button>`);
		boardHtml.push("</td>");
		boardHtml.push("</tr>");

	});
	boardHtml.push("</tbody>");

	// #TODO 회원제 게시판으로 변경하면서 회원이 아닌 경우에는 글쓰기를 사용하지 못하도록 해야한다.

	boardHtml.push("<tr>");
	boardHtml.push("<td colspan='5'>");

	isLoggedIn(function(isLoggedIn) {
		console.log(isLoggedIn);
		if (isLoggedIn) {
			boardHtml.push("<button type='button' class='btn btn-primary btn-sm' value='글 쓰기' onclick='goForm()'>글 쓰기</button>");
		}
		boardHtml.push("</td>");
		boardHtml.push("</tr>");

		boardHtml.push("</table>");
		$view.html(boardHtml.join(" "));
	});

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
		url: "board/new",
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
			url: `board/${idx}`,
			type: "get",
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
			url: `board/count/${idx}`,
			type: "put",
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
		url: `board/${idx}`,
		type: "delete",
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
		// ** 주의 **
		// JSON.stringify를 통해 json형식으로 변형
		// 이 때 serialize와 다르다는 것을 알아야한다.
		// data 객체를 사용 할 때에는 데이터를 직렬화화는 과정이 필요하다.
		// 때문에 serialize를 통해 직렬화하는 작업
		// 혹은 json으로 변환하는 데이터 직렬화 작업 둘 중 하나를 거쳐야하는대.
		// 이 경우 serialize를 통해 직렬화를 하지 않았기 때문에 json직렬화를 채택

		url: "board/update",
		type: "put",
		data: JSON.stringify({
			title: updateTitleValue,
			content: updateContentValue,
			idx: idx
		}),
		success: function() {
			loadList();
			alert("수정되었습니다.");
		},
		contentType: "application/json",
		// 이 객체를 통해 서버측에 json데이터라는 것을 알려준다.
		// Board객체의 @RequestBody로 인해 필드에 바인딩 작업을 할 수 있게 된것이다.
		error: error
	});
}

function isLoggedIn(callback) {
	$.ajax({
		url: "/m03/getSession.do",
		type: "GET",
		dataType: "json",
		success: function(data) {
			if (data.member !== "empty") {
				callback(true);
			} else {
				callback(false);
			}
		},
		error: "세션정보 가져오기 실패"
	});
}


