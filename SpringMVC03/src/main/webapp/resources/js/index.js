$(document).ready(() => {
	console.log("Js 인식 테스트");

	if (msgType && msg) {
		console.log("회원가입 성공");
		$("#loginModal").modal("show");
		$("#loginModalTitle").html("축하합니다 !!");
		$("#message").html("회원가입에 성공하였습니다.");
		$("#loginModalHeader").addClass("panel-success");
	}
});

