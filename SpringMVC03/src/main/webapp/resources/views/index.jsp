<%@page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<c:set var="contextPath" value="${pageContext.request.contextPath}"></c:set>

<!DOCTYPE html>
<html lang="en">
<head>
<title>eGov</title>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">

<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
<script
	src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>

<script src="${contextPath}/resources/js/index.js"></script>

</head>
<body>
	<div class="container">
		<jsp:include page="common/menubar.jsp"></jsp:include>
		<div class="panel-default panel">

			<c:choose>
				<c:when test="${empty member.memberProfile}">
					<div>
						<img src="${contextPath}/resources/images/main.jpg"
							style="width: 100%; height: 200px;" alt="사진" />
						<!-- empty -->
					</div>
				</c:when>
				<c:otherwise>
					<div>
						<img src="${member.memberProfile}"
							style="width: 100%; height: 200px;" alt="사진" />
					</div>
					<!-- not empty -->
				</c:otherwise>
			</c:choose>

			<div class="panel-body">
				<ul class="nav nav-tabs">
					<li class="active"><a data-toggle="tab" href="#home">공지사항</a></li>
					<li><a data-toggle="tab" href="#menu1">작성글</a></li>
				</ul>

				<div class="tab-content">
					<div id="home" class="tab-pane fade in active">
						<h3>HOME</h3>
						<p>Some content.</p>
					</div>
					<div id="menu1" class="tab-pane fade">
						<h3>작성한 게시글</h3>
						<p>Some content in menu 1.</p>
					</div>
				</div>
			</div>
			<div class="panel-footer"></div>
		</div>
	</div>


	<div id="loginModal" class="modal fade" role="dialog">
		<div class="modal-dialog">
			<div class="modal-content panel-info" id="loginModalHeader">
				<div class="modal-header panel-heading">
					<button type="button" class="close" data-dismiss="modal">&times;</button>
					<h4 class="modal-title" id="loginModalTitle"></h4>
				</div>
				<div class="modal-body">
					<p id="message"></p>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				</div>
			</div>
		</div>
	</div>
	<script>
		const msgType = ${!empty msgType};
		const msg = ${!empty msg};
	</script>

</body>
</html>
