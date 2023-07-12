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

<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>

<script src="${contextPath}/resources/js/join.js"></script>
</head>

<body>

	<div class="container">
		<jsp:include page="../common/menubar.jsp"></jsp:include>
		<h2>레이 아웃</h2>

		<div class="panel panel-default">
			<div class="panel-heading">회원 가입</div>
			<div class="panel-body">

				<form action="#" method="post">
					<table class="table table-bordered"
						style="text-align: center; border: 1px solid; border-radius: 10px;">
						<tbody>

							<tr>
								<td style="width: 100px; vertical-align: middle;">아이디</td>
								<td><input type="text" class="form-control"
									placeholder="아이디를 입력해주세요." id="inputId"
									oninput="checkinputId()" /></td>

								<td style="width: 110px"><button type="submit"
										class="btn btn-sm btn-primary" style="vertical-align: middle;" />중복확인</td>
							</tr>

							<tr>
								<td style="vertical-align: middle;">비밀번호</td>
								<td><input type="text" placeholder="비밀번호를 입력해주세요."
									class="form-control" oninput="checkinputPwd()" id="inputPwd" /></td>
								<td>비밀번호</td>
							</tr>

						</tbody>
					</table>
				</form>

			</div>
			<div class="panel-footer">Footer</div>
		</div>
	</div>

</body>
</html>
