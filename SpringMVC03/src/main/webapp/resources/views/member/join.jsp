<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

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
	<jsp:include page="../menubar/menubar.jsp"></jsp:include>
	<div class="container">
		<h2>레이 아웃</h2>

		<div class="panel panel-default">
			<div class="panel-heading">회원 가입</div>
			<div class="panel-body">회원가입 폼 만들기</div>
			<div class="panel-footer">Footer</div>
		</div>
	</div>

</body>
</html>
