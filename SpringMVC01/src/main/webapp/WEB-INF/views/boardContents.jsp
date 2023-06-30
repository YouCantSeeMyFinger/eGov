<%@ page language="java" contentType="text/html ; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
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
		<h2>게시글 조회</h2>
		<div class="panel panel-default">
			<div class="panel-heading">*</div>
			<div class="panel-body">
				<table class="table">
					<tr>
						<td>제목 :</td>
						<td class="text-left">${vo.title}</td>
					</tr>

					<tr>
						<td>작성자 :</td>
						<td class="text-left">${vo.writer}</td>
					</tr>

					<tr>
						<td>작성일 :</td>
						<td class="text-left">${fn:split(vo.indate," ")[0]}</td>
					</tr>

					<tr>
						<td>내용 :</td>
						<td class="text-left">${fn:replace(vo.content,newLineChar, "<br/>")}</td>
					</tr>

					<tr>
						<td colspan="3" class="text-right">
							<button class="btn-sm btn btn-primary"
								onclick="location.href='/m01/boardUpdateForm.do/${vo.idx}'">수정</button>
							<button class="btn-sm btn btn-warning"
								onclick="location.href='/m01/boardDelete.do/${vo.idx}'">삭제</button>
							<button type="reset" class="btn btn-info btn-sm"
								onclick="location.href='/m01/boardList.do'">목록</button>
						</td>
					</tr>

				</table>
			</div>
			<div class="panel-footer">*</div>
		</div>
	</div>
</body>
</html>