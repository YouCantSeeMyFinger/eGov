<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core"%>

<c:set var="contextPath" value="${pageContext.request.contextPath}"></c:set>


<!DOCTYPE html>
<html lang="ko">
<head>
<title>Ego</title>
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
		<jsp:include page="../menubar/menubar.jsp"></jsp:include>
		<h2>레이 아웃</h2>

		<div class="panel panel-default">
			<div class="panel-heading">헤드 부분</div>
			<div class="panel-body">바디 부분</div>
			<div class="panel-footer">풋터</div>
		</div>
	</div>

</body>
</html>
