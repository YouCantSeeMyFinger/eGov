
$(document).ready(function(){
    list();
    
});

$(document).on('change', '[name=frm_auth_search] select', function(){
    list();
});


$(document).on('click', '.paging a', function(){
    $('[name=frm_auth_search] [name=page]').val($(this).attr('data-page'));
    list();
});


$(document).on('change', '.tbl_auth_list input[type=checkbox]', function(){
    var chk_yn = $(this).is(':checked');
    
    if (chk_yn == true){
        $(this).val('1');
    } else {
        $(this).val('0');
    }
});

$(document).on('click', '.tbl_auth_list .btn_save', function(){
    save($(this).closest('tr'));

});



function list(){

    var params	= $('[name=frm_auth_search]').serializeArray();

    $.ajax({
        url: contextPath + '/json/auth.json',
        type: 'post',
        dataType: 'json',
        data: params,
        success: function(data) {
            
            //$('.tbl_auth_list tbody').html('');
            var ele = new Array();

            if(data.code == 1001) {

                for (var i=0; i < data.result.length; i++){
                    var item = data.result[i];
                    
                    ele.push('<tr>');
                    ele.push('  <td>');
                    ele.push('      <input type="hidden" name="seq" value="'+item.seq+'">');
                    ele.push('      <select class="form-select" name="auth">');
                    ele.push('          <option value="1" '+(item.auth == 1 ? "selected" : "")+'>최고관리자</option>');
                    ele.push('          <option value="2" '+(item.auth == 2 ? "selected" : "")+'>중간관리자</option>');
                    ele.push('          <option value="3" '+(item.auth == 3 ? "selected" : "")+'>일반관리자</option>');
                    ele.push('      </select>');
                    ele.push('  </td>');
                    ele.push('  <td class="text-center">'+item.name+'('+item.c_num+')</td>');
                    ele.push('  <td class="text-center">'+item.email+'</td>');
                    ele.push('  <td class="text-center">');
                    ele.push('      <input type="checkbox" class="form-check-input me-2" name="read1" value="'+item.read1+'" '+(item.read1 == 1 ? 'checked' : '')+'>');
                    ele.push('      <input type="checkbox" class="form-check-input me-2" name="write1" value="'+item.write1+'" '+(item.write1 == 1 ? 'checked' : '')+'>');
                    ele.push('      <input type="checkbox" class="form-check-input" name="execute1" value="'+item.execute1+'" '+(item.execute1 == 1 ? 'checked' : '')+'>');
                    ele.push('  </td>');
                    ele.push('  <td class="text-center">');
                    ele.push('      <input type="checkbox" class="form-check-input me-2"  name="read2" value="'+item.read2+'" '+(item.read2 == 1 ? 'checked' : '')+'>');
                    ele.push('      <input type="checkbox" class="form-check-input me-2" name="write2" value="'+item.write2+'" '+(item.write2 == 1 ? 'checked' : '')+'>');
                    ele.push('      <input type="checkbox" class="form-check-input" name="execute2" value="'+item.execute2+'" '+(item.execute2 == 1 ? 'checked' : '')+'>');
                    ele.push('  </td>');
                    ele.push('  <td class="text-center">');
                    ele.push('      <input type="checkbox" class="form-check-input me-2"  name="read3" value="'+item.read3+'" '+(item.read3 == 1 ? 'checked' : '')+'>');
                    ele.push('      <input type="checkbox" class="form-check-input me-2" name="write3" value="'+item.write3+'" '+(item.write3 == 1 ? 'checked' : '')+'>');
                    ele.push('      <input type="checkbox" class="form-check-input" name="execute3" value="'+item.execute3+'" '+(item.execute3 == 1 ? 'checked' : '')+'>');
                    ele.push('  </td>');
                    ele.push('  <td>');
                    ele.push('      <button class="btn btn-primary btn_save"><i class="bi bi-save"></i></button>');
                    ele.push('  </td>');
                    
                    ele.push('</tr>');
                }

                $('.tbl_auth_list tbody').html(ele.join(''));
                $('.total span').text(number_format(data.total));
                paging(data.total, $('[name=frm_auth_search] [name=row]').val(), $('[name=frm_auth_search] [name=page]').val(), 'auth_paging');
                
            } else {
                $('.tbl_auth_list tbody').html('<tr><td class="text-center" colspan="6">조회할 데이터가 없습니다.</td></tr>');

            }
            
        }, error: function() {
            alert('실패하였습니다.');
    
        }, complete: function(){
            
        }
    });


}


function save(target){
    var params      = new Array();

    params.auth     = target.find('[name=auth] option:selected').val();
    params.read1    = target.find('[name=read1]').val();
    params.read1    = target.find('[name=read1]').val();
    params.write1   = target.find('[name=write1]').val();
    params.execute1 = target.find('[name=execute1]').val();
    params.read2    = target.find('[name=read2]').val();
    params.write2   = target.find('[name=write2]').val();
    params.execute2 = target.find('[name=execute2]').val();
    params.read3    = target.find('[name=read3]').val();
    params.write3   = target.find('[name=write3]').val();
    params.execute3 = target.find('[name=execute3]').val();

    console.log(params);
    confirm('저장 하시겠습니까?', function(){
        /*
            $.ajax({
                //url: contextPath + '/admin/point/edit',
                type: 'post',
                dataType: 'json',
                data: params,
                success: function(data) {
                    if(data.code == 1001) {
                        alert('저장 되었습니다.');
                        list();	
                    } 
                }, error: function() {
                    alert('실패하였습니다.');
            
                }, complete: function(){
                    
                }
            });
            */
        
        });
}

