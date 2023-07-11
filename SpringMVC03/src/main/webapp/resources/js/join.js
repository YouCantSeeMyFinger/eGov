$(document).ready(function() {
	console.log("Join.jsp 실행");
});

function checkinputLength() {
	let inputValue = $("#inputId").val();
	let valueCount = inputValue.length;

	console.log("valueCount ; {}", valueCount);

	if (valueCount > 10) {
		inputValue = inputValue.substring(0, 10);
		alert("아이디는 10이하 입니다.");
		$("#inputId").val(inputValue);
	}
};

