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
		<h2>회원 가입</h2>

		<div class="panel panel-default">
			<div class="panel-heading text-center"">
				<p>
					<span class="glyphicon glyphicon-heart" id="heartIcon"
						style="color: red;"></span> <span">&nbsp;글은 여러분의 마음과 같습니다.</span>
				</p>
			</div>
			<div class="panel-body">

				<form action="#" method="post">
					<table class="table table-bordered"
						style="text-align: center; border: 1px solid;">
						<tbody>

							<tr>
								<td style="width: 100px; vertical-align: middle;">아이디</td>
								<td><input type="text" class="form-control"
									placeholder="아이디를 입력해주세요." id="inputId"
									oninput="checkinputId()" autocomplete="username" /></td>

								<td style="width: 110px"><button type="submit"
										class="btn btn-sm btn-primary" style="vertical-align: middle;" />중복확인</td>
							</tr>

							<tr>
								<td style="vertical-align: middle;">비밀번호</td>
								<td><input type="password" placeholder="비밀번호를 입력해주세요."
									class="form-control" oninput="checkinputPwd()" id="inputPwd"
									autocomplete="current-password" /></td>
								<td style="vertical-align: middle;"></td>
							</tr>

							<tr>
								<td style="vertical-align: middle;">비밀번호 확인</td>
								<td><input type="password"
									placeholder="다시 한번 비밀번호를 입력해주세요." class="form-control"
									id="inputPwd2" autocomplete="current-password" /></td>
								<td style="vertical-align: middle;"></td>
							</tr>

							<tr>
								<td style="vertical-align: middle;">사용자 이름</td>
								<td><input type="text" placeholder="사용자 이름을 입력해주세요."
									class="form-control" /></td>
								<td style="vertical-align: middle;"></td>
							</tr>

							<tr>
								<td style="vertical-align: middle;">나이</td>
								<td><input type="text" placeholder="나이를 입력해주세요."
									class="form-control" /></td>
								<td style="vertical-align: middle;"></td>
							</tr>

							<tr>
								<td style="vertical-align: middle;">성별</td>
								<td>
									<div class="form-group"
										style="text-align: center; margin: 0 auto;">

										<div class="btn-group" data-toggle="buttons">
											<label class="btn btn-primary active"> <input
												type="radio" autocomplete="off" value="남자" checked>남자</input>
											</label> <label class="btn btn-primary active"><input
												type="radio" autocomplete="off" value="여자">여자</input> </label>
										</div>

									</div>
								</td>
							</tr>

							<tr>
								<td style="vertical-align: middle;">이메일</td>
								<td><input type="text" placeholder="이메일을 입력해주세요."
									class="form-control" /></td>
								<td style="vertical-align: middle;"></td>
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
