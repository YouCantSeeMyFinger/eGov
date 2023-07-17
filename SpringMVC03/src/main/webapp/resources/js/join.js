$(document).ready(function() {
	console.log("Join.jsp 실행");
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

	console.log("valueCount : ", valueCount);

	if (valueCount > 15) {
		inputValue = inputValue.substring(0, 15);
		$("#inputPwd").val(inputValue);
		alert("비밀번호는 15자 이하만 가능합니다.");
	}
};

function registerCheck() {
	let contextPath = getContextPath();
	memberId = $("#inputId").val();

	$.ajax({
		url: `${contextPath}/memberRegisterCheck.do`,
		type: "get",
		data: { "memberId": memberId },



		success: function(result) {

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



