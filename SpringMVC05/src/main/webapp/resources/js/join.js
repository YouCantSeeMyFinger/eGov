
//아이디 중복확인
$(document).on('click', '[name=frm_join] #btn_id_check', function() {
    var user_id  = $('[name=frm_join] [name=user_id]').val();

    if (user_id == '' || user_id == null || typeof(user_id) == 'undefined'){
        alert('아이디를 입력해주세요.');
        return false;
    }

    $.ajax({
        url: contextPath + '/json/login.json',
        type: 'post',
        dataType: 'json',
        data: {user_id : user_id},
        success: function (data) {
            $('[name=frm_join] [name=user_id]').val('');

			if(data.code == 1001){
                $('[name=frm_join] [name=user_id]').val(user_id);
				alert('사용 가능한 아이디 입니다.');
			} else if(data.code == 1002) {
               
                alert('이미 등록된 아이디 입니다.');
            } else {
               
				alert( '데이터 로드에 실패하였습니다.');
			}
        }, error : function(){
            
            alert( '데이터 로드에 실패하였습니다.');

        }
    });
   
});

//비밀번호 체크
$(document).keyup(function(e) {
    if ($('[name=frm_join] [name=email]').is(":focus")) {

        if ($('[name=frm_join] [name=uesr_pw]').val() != $('[name=frm_join] [name=user_pw_chk]').val()){
            $('[name=frm_join] [name=user_pw_chk]').next('p').removeClass('d-none');
        } else {
            $('[name=frm_join] [name=user_pw_chk]').next('p').addClass('d-none');
        }
    
    }
});

//인증번호 받기
$(document).on('click', '[name=frm_join] #btn_certi', function() {
    var user_hp = $('[name=frm_join] [name=user_hp]').val();

    if (user_hp == '' || user_hp == null || typeof(user_hp) == 'undefined'){
        alert('휴대폰 번호를 입력해주세요.');
        return false;
    }

    $.ajax({
        url: contextPath + '/json/login.json',
        type: 'post',
        dataType: 'json',
        data: {user_hp : user_hp},
        success: function (data) {
			if(data.code == 1001){
				alert('인증번호를 전송 하였습니다.');
			} else {
				alert( '인증번호 전송에 실패하였습니다.');
			}
        }, error : function(){
            alert( '인증번호 전송에 실패하였습니다.');

        }
    });
});


$(document).on('click', '[name=frm_join] #btn_join', function() {
    var chk = '';
	$('[name=frm_join] input').each(function(i){
		$(this).removeClass('bg-required ');
		if ($(this).prop('required') == true && $(this).val() == ''){
			$(this).addClass('bg-required');
			chk++;
		}
	});
	
	if(chk > 0){
		alert('필수 입력 정보를 확인하세요.');
		return false;
	}
    

    var params	= $('[name=frm_join]').serializeArray();

    $.ajax({
        url: contextPath + '/json/login.json',
        type: 'post',
        dataType: 'json',
        data: params,
        success: function (data) {
			if(data.code == 1001){
				alert('회원가입이 완료 되었습니다.', function(){
                    location.href = contextPath+'/html/login.html';
                });
				
			} else {
				alert( '데이터 로드에 실패하였습니다.');
			}
        }, error : function(){
            alert( '데이터 로드에 실패하였습니다.');

        }
    });

});