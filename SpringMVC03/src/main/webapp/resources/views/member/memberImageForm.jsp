<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<c:set var="contextPath" value="${pageContext.request.contextPath}"></c:set>


<!DOCTYPE html>
<html lang="ko">

<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Member Photo</title>

<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
<script
	src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">


<script src="${contextPath}/resources/js/memberImageForm.js"></script>

</head>

<body>

	<div class="container">
		<jsp:include page="../common/menubar.jsp"></jsp:include>

		<div class="panel panel-default">
			<div class="panel-heading">프로필 설정</div>
			<div class="panel-body">
				<form action="${contextPath}/memberImageUpdate.do" method="post"
					enctype="multipart/form-data">
					<input type="hidden" value="${member.memberId}"></input>
					<table class="table table-bordered"
						style="text-align: center; border: 1px solid;">
						<tbody>

							<tr>
								<td style="width: 100px; vertical-align: middle;">닉네임</td>
								<td>${member.memberName}</td>
							</tr>

							<tr>
								<td style="width: 100px; vertical-align: middle;">아이디</td>
								<td>${member.memberId}</td>
							</tr>
							<tr>
								<td style="vertical-align: middle;">이메일</td>
								<td>${member.memberEmail}</td>
							</tr>


							<tr>
								<td style="vertical-align: middle;">이미지</td>
								<td colspan="2"><span class="btn btn-default"
									style="width: auto; display: flex; text-align: center; justify-content: center">
										<input type="file" name="memberProfile" />
								</span></td>
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
			<div class="panel-footer"></div>


			<div class="modal fade" id="fileFormModal" role="dialog">
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