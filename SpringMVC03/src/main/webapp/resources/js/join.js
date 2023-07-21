$(document).ready(function() {
	console.log("ready");
});


function checkinputId() {
	let inputValue = $("#inputId").val();
	let valueCount = inputValue.length;

	console.log("valueCount :", valueCount);

	if (valueCount > 10) {
		inputValue = inputValue.substring(0, 10);
		alert("아이디는 10자이하만 가능합니다.");
		$("#inputId").val(inputValue);
	}
};

function checkinputPwd() {
	let inputValue = $("#inputPwd").val();
	let valueCount = inputValue.length;

	securityBar(inputValue);

	if (valueCount > 15) {
		inputValue = inputValue.substring(0, 15);
		$("#inputPwd").val(inputValue);
		alert("비밀번호는 15자 이하만 가능합니다.");
	}
};

function checkinputPwd2() {
	let pwd1 = $("#inputPwd").val();
	let pwd2 = $("#inputPwd2").val();

	if (pwd1 !== pwd2) {
		$("#checkInputbox").html("비밀번호가 일치하지 않습니다.");
		$("#checkInputbox").css("color", "red");
	} else {
		$("#checkInputbox").html("비밀번호가 일치합니다.");
		$("#checkInputbox").css("color", "green");
	}
}


function securityBar(pwd) {

	const hasLowercase = /[a-z]/.test(pwd);
	const hasUppercase = /[A-Z]/.test(pwd);
	const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(pwd);
	const hasNumber = /\d/.test(pwd);

	const securityLevel = [hasLowercase, hasUppercase, hasSpecialChar, hasNumber].filter(Boolean).length;

	progressBarColor(securityLevel);
};


function progressBarColor(securityLevel) {
	console.log(securityLevel);
	$(".progress-container .progress-bar").each(function(index) {
		if (index < securityLevel) {
			$(this).css("width", "100%");

			if (index === 0) {
				$(this).addClass("progress-bar-danger");
			} else if (index === 1) {
				$(this).addClass("progress-bar-warning");
			} else if (index === 2) {
				$(this).addClass("progress-bar-info");
			} else if (index === 3) {
				$(this).addClass("progress-bar-success");
			}
		} else {
			$(this).css("width", "0%");
			$(this).removeClass("progress-bar-danger progress-bar-warning progress-bar-info progress-bar-success");
		}
	});
};


function registerCheck() {
	let contextPath = getContextPath();
	memberId = $("#inputId").val();

	$.ajax({
		url: `${contextPath}/memberRegisterCheck.do`,
		type: "get",
		data: { "memberId": memberId },

		success: function(result) {
			if (result === 1) {
				$("#checkMessage").text("회원가입이 완료되었습니다.");
				$("#checkType").attr("class", "modal-content panel-success");
			} else if (result === 0) {
				$("#checkMessage").text("이미 존재하는 회원입니다.");
				$("#checkType").attr("class", "modal-content panel-warning");
			}

			$("#myModal").modal("show");
		},

		error: function() {
			alert("중복확인 에러");
		}
	});
};

function getContextPath() {
	let path = window.location.pathname;
	return path.substring(0, path.indexOf("/", 1));
};



