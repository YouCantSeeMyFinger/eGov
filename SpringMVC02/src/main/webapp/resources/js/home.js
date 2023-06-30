$(() => {
    loadList();
});

function loadList() {
    $.ajax({
        url: "boardList.do",
        dataType: "json",
        type: "get",
        // CallBackFunction
        success: makeView,
        error: function () {
            alert("error");
        }
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
    $.each(data, function (index, object) {
        boardHtml.push("<tr>");
        boardHtml.push("<td>" + object.idx + "</td>");
        boardHtml.push("<td>" + object.title + "</td>");
        boardHtml.push("<td>" + object.writer + "</td>");
        boardHtml.push("<td>" + object.indate + "</td>");
        boardHtml.push("<td>" + object.count + "</td>");
        boardHtml.push("</tr>");
    });
    boardHtml.push("</tbody>");

    boardHtml.push("</table>")

    $view.html(boardHtml.join(" "));
}