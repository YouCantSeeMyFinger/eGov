<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<c:set var="contextPath" value="${pageContext.request.contextPath}"></c:set>

<nav class="navbar navbar-inverse">
	<div class="container-fluid">
		<div class="navbar-header">

			<button type="button" class="navbar-toggle" data-toggle="collapse"
				data-target="#myNavbar">
				<span class="icon-bar"></span> <span class="icon-bar"></span> <span
					class="icon-bar"></span>
			</button>

			<a class="navbar-brand" href="${contextPath}">D.C.T</a>
		</div>

		<div class="collapse navbar-collapse" id="myNavbar">
			<ul class="nav navbar-nav">
				<li class="active"><a href="${contextPath}">Home</a></li>
				<li class="dropdown"><a class="dropdown-toggle"
					data-toggle="dropdown" href="#">게시판<span class="caret"></span>
				</a>
					<ul class="dropdown-menu">
						<li><a href="${contextPath}/boardMain.do">자유 게시판</a></li>
						<li role="presentation" class="divider"></li>
						<li><a href="#">Page 1-2</a></li>
						<li role="presentation" class="divider"></li>
						<li><a href="#">Page 1-3</a></li>
					</ul></li>

				<li><a href="#">Page 2</a></li>
			</ul>

			<form class="navbar-form navbar-left" action="#" method="post">
				<div class="input-group">
					<input type="text" class="form-control" placeholder="Search"
						name="search">
					<div class="input-group-btn">
						<button class="btn btn-default" type="submit">
							<i class="glyphicon glyphicon-search"></i>
						</button>
					</div>
				</div>
			</form>

			<!-- 로그인 하지 않았을 시 -->
			<c:if test="${empty member}">
				<ul class="nav navbar-nav navbar-right">
					<li><a href="${contextPath}/memJoin.do"><span
							class="glyphicon glyphicon-user"></span> 회원가입</a></li>
					<li><a href="${contextPath}/memberLoginForm.do"><span
							class="glyphicon glyphicon-log-in"></span> 로그인</a></li>
				</ul>
			</c:if>

			<!-- 로그인 했을 때 -->
			<c:if test="${!empty member}">
				<ul class="nav navbar-nav navbar-right">
					<c:choose>
						<c:when test="${empty member.memberProfile}">
							<li><img src="${contextPath}/resources/images/main.jpg"
								style="width: 50px; height: 50px;" class="img-circle" alt="사진" /></li>
						</c:when>
						<c:otherwise>
							<li><img
								src="${contextPath}/resources/upload/${member.memberProfile}"
								style="width: 50px; height: 50px;" class="img-circle" alt="사진" /></li>
						</c:otherwise>
					</c:choose>
					<li class="dropdown"><a class="dropdown-toggle"
						data-toggle="dropdown" href="#">"${member.memberName}"<span
							class="caret"></span>
					</a>
						<ul class="dropdown-menu">
							<li role="prsentation"><a
								href="${contextPath}/memberUpdateForm">회원정보 수정</a></li>
							<li role="presentation" class="divider"></li>
							<li role="presentation"><a
								href="${contextPath}/memberImageForm.do"><span
									class="glyphicon glyphicon-picture" style="margin-right: 10px"></span>사진등록</a></li>
						</ul></li>

					<li><a href="#"><span class="glyphicon glyphicon-refresh"></span>
							알림</a></li>
					<li><a href="${contextPath}/memberLogout.do"><span
							class="glyphicon glyphicon-log-out"></span> 로그아웃</a></li>



				</ul>
			</c:if>

		</div>
	</div>
</nav>
