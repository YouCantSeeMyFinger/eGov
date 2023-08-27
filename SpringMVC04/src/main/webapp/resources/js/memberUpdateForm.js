$(document).ready(function() {
	console.log("msgType : ", msgType);
	console.log("msg : ", msg);

	if (msgType && msg) {
		$("#memberModalHead").addClass("panel-warning");
		$("#memberModal").modal("show");
	}

});

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
		$("#memberPassword").val(null);
	} else {
		$("#checkInputbox").html("비밀번호가 일치합니다.");
		$("#checkInputbox").css("color", "green");
		$("#memberPassword").val(pwd1);
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

function getContextPath() {
	let path = window.location.pathname;
	return path.substring(0, path.indexOf("/", 1));
};



