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
		alert("비밀번호는 15자 이하 가능합니다.");
		$("#inputValue").val(inputValue);
	}
};

