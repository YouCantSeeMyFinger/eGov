<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<c:set var="contextPath" value="${pageContext.request.contextPath}"></c:set>


<!DOCTYPE html>
<html lang="ko">

<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Member Login View</title>

<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
<script
	src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">


<script src="${contextPath}/resources/js/memberLoginForm.js"></script>

</head>

<body>

	<div class="container">
		<jsp:include page="../common/menubar.jsp"></jsp:include>

		<div class="panel panel-default">
			<div class="panel-heading">Login</div>
			<div class="panel-body">

				<form action="${contextPath}/memberLogin.do" method="post">
					<table class="table table-bordered"
						style="text-align: center; border: 1px solid;">
						<tbody>
							<tr>
								<td style="width: 100px; vertical-align: middle;">아이디</td>
								<td><input type="text" class="form-control"
									placeholder="아이디를 입력해주세요." autocomplete="username"
									id="memberId" name="memberId" /></td>
							</tr>
							<tr>
								<td style="vertical-align: middle;">비밀번호</td>
								<td><input type="password" placeholder="비밀번호를 입력해주세요."
									class="form-control" autocomplete="current-password"
									id="memberPassword" name="memberPassword" /></td>
							</tr>
							<tr>
								<td colspan="3">
									<button type="submit" class="btn btn-sm btn-primary">로그인</button>
									<button type="reset" class="btn btn-sm btn-warning"
										onclick="location.href='${contextPath}'">취소</button>
								</td>
							</tr>
						</tbody>
					</table>
				</form>
			</div>
			<div class="panel-footer"></div>


			<!-- Modal -->
			<div class="modal fade" id="loginFormModal" role="dialog">
				<div class="modal-dialog">

					<!-- Modal content-->
					<div class="modal-content panel-info panel-warning">
						<div class="modal-header panel-heading">
							<button type="button" class="close" data-dismiss="modal">&times;</button>
							<h4 class="modal-title" id="loginModalHeader">${msgType}</h4>
						</div>
						<div class="modal-body">
							<p id="loginModalContents">${msg}</p>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-default"
								data-dismiss="modal">Close</button>
						</div>
					</div>

				</div>
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