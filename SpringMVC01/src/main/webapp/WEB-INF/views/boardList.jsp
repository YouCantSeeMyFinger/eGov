<%--
  Created by IntelliJ IDEA.
  User: gyoon
  Date: 2023-06-15
  Time: 오후 3:23
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

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
		<%-- 제목   --%>
		<h2>Boarder List</h2>
		<div class="panel panel-default">

			<%-- header --%>
			<div class="panel-heading">게시판 목록</div>

			<%-- body--%>
			<div class="panel-body">

				<%-- table --%>
				<table class="table-hover table table-bordered">
					<thead class="table-active">
						<tr>
							<td>번호</td>
							<td>제목</td>
							<td>작성자</td>
							<td>조회수</td>
							<td>작성일</td>
						</tr>
					</thead>
					<c:forEach items="${list}" var="vo">
						<tbody>
							<tr>
								<td>${vo.idx}</td>
								<td><a href="boardContents.do/${vo.idx}">${vo.title}</a></td>
								<td>${vo.writer}</td>
								<td>${vo.count}</td>
								<td>${fn:split(vo.indate," ")[0]}</td>
							</tr>
						</tbody>
					</c:forEach>
				</table>
				<a href="boardForm.do" class="btn btn-primary btn-sm">글쓰기</a>
			</div>

			<%-- footer --%>
			<div class="panel-footer">Footer</div>

		</div>

	</div>
</body>
</html>
