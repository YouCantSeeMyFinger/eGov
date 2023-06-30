<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

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
		<h2>게시판 글쓰기</h2>
		<div class="panel panel-default">
			<div class="panel-heading">*</div>
			<div class="panel-body">
				<form method="post" action="boardInsert.do">
					<table class="table">

						<tr>
							<td>제목</td>
							<td><input type="text" name="title" class="form-control"
								placeholder="제목을 입력해주세요." /></td>
						</tr>

						<tr>
							<td>내용</td>
							<td><textarea row="7" class="form-control" name="content"
									placeholder="내용을 입력해주세요."></textarea></td>
						</tr>

						<tr>
							<td>작성자</td>
							<td><input type="text" class="form-control" name="writer"
								placeholder="작성자를 입력해주세요." /></td>
						</tr>

						<tr class="text-right">
							<td colspan="2">
								<button type="submit" class="btn btn-success btn-sm">등록</button>
								<button type="reset" class="btn btn-warning btn-sm"
									onclick="location.href='boardList.do'">취소</button>
							</td>
						</tr>
					</table>
				</form>
			</div>
			<div class="panel-footer">*</div>
		</div>
	</div>
</body>

</html>
