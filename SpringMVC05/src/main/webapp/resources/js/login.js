
$(document).ready(function(){
    $('.tab div').on('click', function(){
        var active = $(this).attr('data-tab');
    
        $('.tab div').removeClass('active');
        $(this).addClass('active');
    
        $('.tab_box').hide();
        $('.tab_box[data-con="con_'+active+'"]').show();
    });

    /*
    document.querySelector('[name="frm_login"]').onsubmit = function(e){
        e.preventDefault();
        if(e.target.reportValidity()){
            login();
        }
    }
    */
    
});


$(document).on('click', '.eye', function(){
    $('.password').toggleClass('active');

    if( $('.password').hasClass('active') == true ){
        $(this).find('.bi-eye-slash').attr('class',"bi-eye").parents('.password').find('.pw-eye').attr('type',"text");
    }
    else{
        $(this).find('.bi-eye').attr('class',"bi-eye-slash").parents('.password').find('.pw-eye').attr('type','password');
    }
});

$(document).on('click', '[name=frm_login] #btn_login', function(){
    login();
});


//아이디, 비빌번호 찾기 팝업 호출시 스위치
$(document).on('click', '.btn_find_pop', function(){
    $('#fine-pop .result').addClass('d-none');
    $('#fine-pop .btn_find').show();

    $('#fine-pop').modal('show');

    if ($(this).attr('data-type') == 'id') {
        $('#fine-pop div[data-tab="find-id"]').addClass('active');
        $('#fine-pop div[data-tab="find-pw"]').removeClass('active');
        $('#fine-pop div[data-con="con_find-pw"]').hide();
        $('#fine-pop div[data-con="con_find-id"]').show();
    } else {
        $('#fine-pop .tab div[data-tab="find-pw"]').addClass('active');
        $('#fine-pop .tab div[data-tab="find-id"]').removeClass('active');
        $('#fine-pop div[data-con="con_find-id"]').hide();
        $('#fine-pop div[data-con="con_find-pw"]').show();
    }
});


$(document).on('click', '[name=frm_find_id] #btn_find_id', function(){
	var chk = '';
	$('[name=frm_find_id] input').each(function(i){
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

    var params	= $('[name=frm_find_id]').serializeArray();
    
	$.ajax({
        //url: contextPath + '/user/find,
        type: 'post',
        dataType: 'json',
        data: params,
        success: function (data) {
			if(data.code == 1001){
				$('[name=frm_find_id] .result').removeClass('d-none');
                $('[name=frm_find_id] #btn_find_id').hide();
			} else if(data.code == 1002) {
                alert('이메일 주소를 확인해 주세요.');
            } else {
				alert( '데이터 로드에 실패하였습니다.');
			}
        }, error : function(){
            alert( '데이터 로드에 실패하였습니다.');

        }
    });
});

$(document).on('click', '[name=frm_find_pw] #btn_find_pw', function(){
	var chk = '';
	$('[name=frm_find_pw] input').each(function(i){
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

    var params	= $('[name=frm_find_pw]').serializeArray();
    
	$.ajax({
        url: contextPath + '/json/login.json',
        type: 'post',
        dataType: 'json',
        data: params,
        success: function (data) {
			if(data.code == 1001){
				$('[name=frm_find_pw] .result').removeClass('d-none');
                $('[name=frm_find_pw] #btn_find_pw').hide();
			} else if(data.code == 1002) {
                alert('이메일 주소를 확인해 주세요.');
            } else {
				alert( '데이터 로드에 실패하였습니다.');
			}
        }, error : function(){
            alert( '데이터 로드에 실패하였습니다.');

        }
    });
});

function login(){
    var chk = '';
	$('[name=frm_login] input').each(function(i){
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

    var params	= $('[name=frm_login]').serializeArray();

	$.ajax({
        url: contextPath + '/json/login.json',
        type: 'post',
        dataType: 'json',
        data: params,
        success: function (data) {
			if(data.code == 1001){
				location.href = 'index.html';
			} else if(data.code == 1002) {
                alert('회원 정보가 없습니다.');
            } else {
				alert( '올바르지 않은 계정정보입니다.');
			}

        }
    });
}