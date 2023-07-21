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

<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
<script
	src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">


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

				<form action="${contextPath}/memberRegister.do" method="post">
					<input type="hidden" name="memberPassword" value=""
						id="memberPassword" />
					<table class="table table-bordered"
						style="text-align: center; border: 1px solid;">
						<tbody>

							<tr>
								<td style="width: 100px; vertical-align: middle;">아이디</td>
								<td><input type="text" class="form-control"
									placeholder="아이디를 입력해주세요." id="inputId"
									onkeyup="checkinputId()" autocomplete="username" name="inputId" /></td>

								<td style="width: 110px"><button type="button"
										class="btn btn-sm btn-primary" style="vertical-align: middle;"
										onclick="registerCheck()" />중복확인</td>
							</tr>

							<tr>
								<td style="vertical-align: middle;">비밀번호</td>
								<td><input type="password" placeholder="비밀번호를 입력해주세요."
									class="form-control" onkeyup="checkinputPwd()" id="inputPwd"
									autocomplete="current-password" name="inputPwd" /></td>

								<td style="vertical-align: middle; font-size: 3px"><span>보안
										상태</span>
									<div class="progress-container">
										<div class="progress"
											style="width: 15px; margin-bottom: 0; display: inline-block;">
											<div class="progress-bar" role="progressbar"
												aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"
												style="width: 0%"></div>
										</div>

										<div class="progress"
											style="width: 15px; margin-bottom: 0; display: inline-block;">
											<div class="progress-bar" role="progressbar"
												aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"
												style="width: 0%"></div>
										</div>

										<div class="progress"
											style="width: 15px; margin-bottom: 0; display: inline-block;">
											<div class="progress-bar" role="progressbar"
												aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"
												style="width: 0%"></div>
										</div>

										<div class="progress"
											style="width: 15px; margin-bottom: 0; display: inline-block;">
											<div class="progress-bar" role="progressbar"
												aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"
												style="width: 0%"></div>
										</div>
									</div></td>
							</tr>

							<tr>
								<td style="vertical-align: middle;">비밀번호 확인</td>
								<td><input type="password"
									placeholder="다시 한번 비밀번호를 입력해주세요." class="form-control"
									id="inputPwd2" name="inputPwd2" autocomplete="current-password"
									onkeyup="checkinputPwd2()" /></td>
								<td style="vertical-align: middle; font-size: 5px;"
									id="checkInputbox"></td>
							</tr>

							<tr>
								<td style="vertical-align: middle;">사용자 이름</td>
								<td><input type="text" placeholder="사용자 이름을 입력해주세요."
									class="form-control" id="inputUserName" name="inputUserName" /></td>
								<td style="vertical-align: middle;"></td>
							</tr>

							<tr>
								<td style="vertical-align: middle;">나이</td>
								<td><input type="text" placeholder="나이를 입력해주세요."
									class="form-control" id="inputAge" name="inputAge" /></td>
								<td style="vertical-align: middle;"></td>
							</tr>

							<tr>
								<td style="vertical-align: middle;">성별</td>
								<td>
									<div class="form-group"
										style="text-align: center; margin: 0 auto;">

										<div class="btn-group" data-toggle="buttons">
											<label class="btn btn-primary active"> <input
												type="radio" autocomplete="off" value="남자"
												id="checkGenderMale" name="checkGenderMale" checked>남자</input>
											</label> <label class="btn btn-primary active"> <input
												type="radio" autocomplete="off" value="여자"
												id="checkGenderFemale" name="checkGenderFemale">여자 </input>
											</label>
										</div>

									</div>
								</td>
							</tr>

							<tr>
								<td style="vertical-align: middle;">이메일</td>
								<td><input type="text" placeholder="이메일을 입력해주세요."
									class="form-control" id="inputEmail"
									name="inputEmail /></td>
								<td style="vertical-align: middle;"></td>
							</tr>

							<tr>
								<td colspan="3">
									<button type="submit" class="btn btn-sm btn-primary">등록</button>
									<button type="reset" class="btn btn-sm btn-warning"
										onclick="location.href='${contextPath}'">취소</button>
								</td>

							</tr>

						</tbody>


					</table>
				</form>

			</div>
		
			<div id="myModal" class="modal fade" role="dialog">
				<div class="modal-dialog">
					<div class="modal-content panel-info" id="checkType">
						<div class="modal-header panel-heading">
							<button type="button" class="close" data-dismiss="modal">&times;</button>
							<h4 class="modal-title">INFO</h4>
						</div>
						<div class="modal-body">
							<p id="checkMessage"></p>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
						</div>
					</div>
				</div>
			</div>
			<div class="panel-footer">Footer</div>
		</div>
	</div>
</body>
</html>