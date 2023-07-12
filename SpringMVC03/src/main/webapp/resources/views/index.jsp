<%@page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>



<!DOCTYPE html>
<html lang="en">
<head>
<title>eGov Main Home</title>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">

<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
<script
	src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>

<!-- JS 절대경로 -->
<script src="${pageContext.request.contextPath}/resources/index.js"></script>

</head>
<body>
	<!-- Thymeleaf의 Fragment와 동일한 기능 -->


	<div class="container">
		<jsp:include page="common/menubar.jsp"></jsp:include>
		<h3>Right Aligned Navbar</h3>
		<p>The .navbar-right class is used to right-align navigation bar
			buttons.</p>
	</div>

</body>
</html>
