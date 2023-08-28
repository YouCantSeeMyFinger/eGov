
$(document).ready(function(){
    list();
    
});

$(document).on('change', '[name=frm_bd_search] select', function(){
    list();
});


$(document).on('click', '.paging a', function(){
    $('[name=frm_bd_search] [name=page]').val($(this).attr('data-page'));
    list();
});


$(document).on('click', '#md_board_write .btn_save', function(){
    save();
});


$(document).on('click', '#btn_write', function(){
    $('#md_board_write .modal-title').text('게시글 작성');
    $('#md_board_write input').val('');
    $('#md_board_write textarea').val('');
    $('#md_board_write .modal-body').find('select').val('');
    $('#md_board_write .modal-footer .btn_save').text('등록');
    $('#md_board_write').modal('show');

});

$(document).on('click', '.tbl_bd_list tbody td:not(:first-child)', function(){
    var seq = $(this).closest('tr').find('[name=seq]').val();
    $('#md_board_write .modal-title').text('게시글 상세');
    $('#md_board_write .modal-footer .btn_save').text('수정');
    $('#md_board_write').modal('show');

    view(seq);
});


$(document).on('click', '[name=frm_bd_search] .btn_del', function(){
    remove();
});


function list(){
    var params	= $('[name=frm_bd_search]').serializeArray();

    $.ajax({
        url: contextPath + '/json/list.json',
        type: 'post',
        dataType: 'json',
        data: params,
        success: function(data) {
            
            $('.tbl_bd_list tbody').html('');
            var ele = new Array();

            if(data.code == 1001) {

                for (var i=0; i < data.result.length; i++){
                    var item = data.result[i];
                    ele.push('<tr>');
                    ele.push('  <td>');
                    ele.push('      <input type="checkbox" class="form-check-input tbl_chk" name="seq" value="'+item.seq+'">');
                    ele.push('  </td>');
                    ele.push('  <td class="text-center">'+item.name+'</td>');
                    ele.push('  <td>'+item.content+'</td>');
                    ele.push('  <td class="text-center">'+number_format(item.point)+'</td>');
                    ele.push('  <td class="text-center">'+length8(item.start_date, '-', 1)+'</td>');
                    ele.push('  <td class="text-center">'+(item.state == '1' ? '정상' : '탈퇴')+'</td>');
                    ele.push('</tr>');
                }

                $('.tbl_bd_list tbody').html(ele.join(''));
                $('.total span').text(number_format(data.total));
                paging(data.total, $('[name=frm_bd_search] [name=row]').val(), $('[name=frm_bd_search] [name=page]').val(), 'bd_paging');
                
            } else {
                $('.tbl_bd_list tbody').html('<tr><td class="text-center" colspan="6">조회할 데이터가 없습니다.</td></tr>');

            }
            
        }, error: function() {
            alert('실패하였습니다.');
    
        }, complete: function(){
            
        }
    });


}


function view(seq){

    $.ajax({
        url: contextPath + '/json/view.json',
        type: 'post',
        dataType: 'json',
        data: {seq : seq},
        success: function(data) {

            if(data.code == 1001) {
                var item = data.result[0];
                console.log(item);
                $('#md_board_write [name=date]').val(length8(item.date, '-', 1));
                $('#md_board_write [name=name]').val(item.name);
                $('#md_board_write [name=point]').val(item.point);
                $('#md_board_write [name=date]').val(item.date);
                $('#md_board_write [name=state] option[value="'+item.state+'"]').prop('selected', true);
                $('#md_board_write [name=content]').val(item.content);
            } else {
            }
            
        }
    });

}

function save(){
    var params	= $('[name=frm_bd_write]').serializeArray();

   var chk = '';
   $('[name=frm_bd_write] input').each(function(i){
       //$(this).css('background', '');
       var required = $(this);
       if (required.prop('required') && $(this).val() == ''){
           $(this).addClass('bg-required');
           $(this).focus();
           chk++;
       }
   });

   if (chk > 0) {
       alert('필수 입력 정보를 확인하세요.');
       return false;
   } 

   confirm('저장 하시겠습니까?', function(){
    
       $.ajax({
           url: contextPath + '/json/test.json',
           type: 'post',
           dataType: 'json',
           data: params,
           success: function(data) {
               if(data.code == 1003) {
                   alert('저장 되었습니다.', function(){
                        $('#md_board_write').modal('hide');
                        list();	
                   });
               } 
           }, error: function() {
               alert('실패하였습니다.');
       
           }, complete: function(){
               
           }
       });
       
   
   });
}



function remove(){
    var chk_yn = new Array;
	$('.tbl_bd_list [name=seq]:checked').each(function(i){
		chk_yn.push($(this).val());
	});

    
    if (chk_yn.length == 0 ){
        alert('삭제할 게시물을 선택해 주세요.');
        return false;
    }
    
    console.log(chk_yn);
    confirm('삭제 하시겠습니까?', function(){
        $.ajax({
            url: contextPath + '/json/test.json',
            type: 'post',
            dataType: 'json',
            data: {	seq : chk_yn},
            success: function(data) {
                if (data.code == 1003){
                    alert('삭제 되었습니다.', function(){
                        list();	
                   });

                } else {
                    alert('삭제에 실패하였습니다.');
                }
                
            }, 
            complete: function() {
                list();
                
            }
        });
    });
    
		

}