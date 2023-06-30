<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%
pageContext.setAttribute("newLineChar", "\n");
%>
<!DOCTYPE html>
<html lang="ko">
<head>
<title>Spring Legacy Test</title>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">

<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">

<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
<script
	src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
</head>

<body>

	<div class="container">
		<h2>Spring Legacy Test</h2>
		<div class="panel panel-default">
			<div class="panel-heading">*</div>
			<div class="panel-body">
				<form method="post" action="../boardUpdate.do">
					<input type="hidden" name="idx" value="${vo.idx}" />
					<table class="table">

						<!-- taglib의 c:out을 통해 특수문자 처리 -->
						<tr>
							<td>제목 :</td>
							<td><input type="text" name="title" class="form-control"
								value="<c:out value='${vo.title}'/>" /></td>
						</tr>

						<tr>
							<td>작성자 :</td>
							<td><input type="text" name="writer" class="form-control"
								value="${vo.writer}" readonly="readonly" /></td>
						</tr>

						<tr>
							<td>작성일 :</td>
							<td>${fn:split(vo.indate," ")[0]}</td>
						</tr>

						<tr>
							<td>내용 :</td>
							<td><textarea colspan="7" type="text" name="content"
									class="form-control">${vo.content}</textarea></td>
						</tr>

						<tr>
							<td colspan="2" class="text-right">
								<button type="submit" class="btn-sm btn btn-primary">저장</button>
								<button type="reset" class="btn-sm btn btn-warning"
									onclick="location.href='/m01/boardList.do'">취소</button>
							</td>
						</tr>
					</table>
				</form>
			</div>
			<div class="panel-footer">*</div>
		</div>
	</div>

</body>
</html>
