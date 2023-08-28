
var date = dayjs();
var today = dayjs().format('YYYYMMDD');
var contextPath = 'http://192.168.0.3/sample1';


$(document).ready(function(){
    
    $('.date_picker').datepicker({
        format: "yyyy-mm-dd",
        autoclose : true,
    });
});



//사이드 메뉴 on/off
$(document).on('click', '.btn_nav', function(){
    var open_yn = $(this).attr('data-type');
    if (open_yn == 'off'){
        
        $('header').animate({left:0}, 400);
        $('.layout').animate({paddingLeft:0}, 400);
        $('nav').animate({left:-250}, 400);

        $('.layout').addClass('max');
        $(this).attr('data-type', 'on');

    } else {
        $('nav').animate({left:0},400);
        $('header').animate({left:250},400);
        $('.layout').animate({
            paddingLeft:250
        }, 400);
        $('.layout').removeClass('max');
        $(this).attr('data-type', 'off');
    }

});

//메뉴 클릭시
$(document).on('click', 'nav .depth a', function(){
   var target = $(this).closest('.depth');

   if(target.hasClass('depth1') == true){
        var open_yn = target.find('.bi_arrow').attr('data-type');
    
        if (open_yn == 'open'){
            $('nav .depth1').removeClass('on');
            $(target).addClass('on');

            target.find('.bi_arrow').removeClass('bi-chevron-down').addClass('bi-chevron-up').attr('data-type', 'off');
        } else {
            $(target).removeClass('on');
            target.find('.bi_arrow').removeClass('bi-chevron-up').addClass('bi-chevron-down').attr('data-type', 'open');
        }
        
   } else {
        $('nav .depth2').removeClass('active');
        $(this).addClass('active');
   }
});

//전체 검색
$('[name=main_search] [name=search_text]').keydown(function(e) {
	if (e.keyCode == 13) {e.preventDefault()}
    if (e.key == 'Tab' || e.key == 'Enter') {

		$('.search_area .search_cont').html('');
		$.ajax({
			url: contextPath + '/json/keyword.json',
			type: 'post',
			dataType: 'json',
			data: {keyword : $('[name=main_search] [name=search_text]').val()},
			success: function(data) {
				var ele = new Array();

				if (data.code == 1001){
					for(var i=0; i < data.result.length; i++){
						var item = data.result[i];
						ele.push('<a href="'+contextPath+'/'+item.link+'.html'+'">'+item.keyword+'</a>');
					}
					$('.search_area .search_cont').html(ele.join(''));
					$('.search_area .search_cont').show();

				} else if (data.code == 1002){
					$('.search_area .search_cont').html('<a>조회할 데이터가 없습니다.</a>');
				} else {
					alert('데이터 로드에 실패하였습니다.');
				}
			}, error: function(){
				alert('데이터 로드에 실패하였습니다.');
			}
		});
    }
});

$(document).on('click', '.search_area .search_cont a', function(){
    $('.search_area .search_cont').hide();
});

//키워드 검색
$('.bd_search [name=keyword]').keydown(function(e) {
	if (e.keyCode == 13) {e.preventDefault()}
    if (e.key == 'Tab' || e.key == 'Enter') {
        list();
    }
});

//테이블 리스트 전체 선택
$(document).on('click', '.tbl_chkall', function(){
	if ($(this).prop('checked') == true){
		$('.tbl_chk').prop('checked', true);
	} else {
		$('.tbl_chk').prop('checked', false);
	}
});


//sort function
$(document).on('click', 'table thead th[data-sort]', function(e){
    //테이블에 양식에 맞는 실행 정보가 있을 경우
    if(e.target.closest('table') && e.target.closest('table').getAttribute('data-form')){
        var form = e.target.closest('table').getAttribute('data-form');
        document.querySelector('[name="'+form+'"] [name="column"]').value = $(this).attr('data-column');
        if($(this).attr('data-sort') == 'asc'){
            document.querySelector('[name="'+form+'"] [name="order"]').value = 'asc';
            $(this).attr('data-sort', 'desc');
            $(this).find('i').removeClass('bi-caret-down-fill').addClass('bi-caret-up-fill');
    
        } else {
            document.querySelector('[name="'+form+'"] [name="order"]').value = 'desc';
            $(this).attr('data-sort', 'asc');
            $(this).find('i').removeClass('bi-caret-up-fill').addClass('bi-caret-down-fill');
        }
    
    //테이블에 양식에 맞는 실행정보가 없을 경우
    }else{
        $('.cont_top [name=column]').val($(this).attr('data-column'));
        if($(this).attr('data-sort') == 'asc'){
            $('.cont_top [name=order]').val('asc');
            $(this).attr('data-sort', 'desc');
            $(this).find('i').removeClass('bi-caret-down-fill').addClass('bi-caret-up-fill');
    
        } else {
            $('.cont_top [name=order]').val('desc');
            $(this).attr('data-sort', 'asc');
            $(this).find('i').removeClass('bi-caret-up-fill').addClass('bi-caret-down-fill');
        }
    }

    $('table thead th').removeClass('on');
    $(this).addClass('on');
    
   
});

//공통 alert
function alert(html, cb){
	if (typeof html == ('' || 'undefined' || null)) html = '저장이 완료 되었습니다.';
	const ele = new Array;
        ele.push('<div class="modal-backdrop modal-backdrop-bg fade show"></div>');
        ele.push('<div class="modal fade show" id="md_alert">');
		ele.push('  <div class="modal-dialog modal-dialog-centered">');
		ele.push('  	<div class="modal-content">');
		ele.push('  		<div class="modal-header">');
		ele.push('	    		<h1 class="modal-title fs-5">안내</h1>');
		ele.push('	    	</div>');
		ele.push('	    	<div class="modal-body">');
		ele.push('	    		<div>'+html+'</div>');
		ele.push('	    	</div>');
		ele.push('	    	<div class="modal-footer">');
		ele.push('	    		<button type="button" class="btn btn-primary" id="pop_alert_ok">확인</button>');
		ele.push('		    </div>');
		ele.push('  		</div>');
		ele.push('  	</div>');
		ele.push('  </div>');
        ele.push('</div>');

    $('body').addClass('modal-open').append(ele.join(''));
    $('#md_alert').show();
    
	const c_action = document.getElementById('pop_alert_ok');
	c_action.addEventListener('click', function(e){
		if(cb){
            cb();
        }

		$(this).closest('.modal').prev('.modal-backdrop-bg').remove();
        $(this).closest('.modal').remove();
        $('body').removeClass('modal-open');
		

	});

	return false;
}


//공통 confirm
function confirm(html, cb, btn_1, btn_2){

	if (typeof html == ('' || 'undefined' || null)) html = '저장 하시겠습니까?';
	if (typeof btn_1 == ('' || 'undefined' || null)) btn_1 = '취소';
	if (typeof btn_2 == ('' || 'undefined' || null)) btn_2 = '확인';

	var ele = new Array;
        ele.push('<div class="modal-backdrop modal-backdrop-bg fade show"></div>');
        ele.push('<div class="modal fade show" id="md_confirm">');
		ele.push('  <div class="modal-dialog modal-dialog-centered">');
		ele.push('	    <div class="modal-content">');
		ele.push('		    <div class="modal-header">');
		ele.push('		    	<h1 class="modal-title fs-5">안내</h1>');
		ele.push('		    </div>');
		ele.push('		    <div class="modal-body">');
		ele.push('	    		<div>'+html+'</div>');
		ele.push('	    	</div>');
		ele.push('	    	<div class="modal-footer">');
		ele.push('	    		<button type="button" class="btn btn-secondary" id="pop_confirm_close">'+btn_1+'</button>');
		ele.push('	    		<button type="button" class="btn btn-primary" id="pop_confirm_ok">'+btn_2+'</button>');
		ele.push('	    	</div>');
		ele.push('	    </div>');
		ele.push('  </div>');
        ele.push('</div>');
        

	
	
	$('body').addClass('modal-open').append(ele.join(''));
    $('#md_confirm').show();
	

    //확인 클릭시 동작
	const action = document.getElementById('pop_confirm_ok');
	action.addEventListener('click', function(e){
		if (cb){
			cb();
		} 
		
        $(this).closest('.modal').prev('.modal-backdrop-bg').remove();
        $(this).closest('.modal').remove();
        $('body').removeClass('modal-open');

	});

	//취소 클릭시 생성된 요소 삭제
	const c_action = document.getElementById('pop_confirm_close');
	c_action.addEventListener('click', function(e){
		$(this).closest('.modal').prev('.modal-backdrop-bg').remove();
        $(this).closest('.modal').remove();
        $('body').removeClass('modal-open');
		

	});


	return false;

}

//페이징처리함수
function paging(total, row, page, target) {
	if (typeof total == 'undefined') total = 0;
	if (!row) row = 20;
	if (page < 1) page = 1;
	var max_page = Math.ceil(parseInt(total) / row);
	if (page > max_page) page = max_page;
	var page = parseInt(page);
	var max_page2 = Math.ceil(page / 5) * 5;
	var prev_page = page - 1;
	var page_tmp = Math.ceil(page / 5);

	if (page_tmp > 1) page_tmp = (page_tmp - 1) * 5 + 1;
	if (prev_page < 1) prev_page = 1;
	var next_page = page + 1;
	if (next_page > max_page) next_page = max_page;
	if (page > max_page) page = max_page;
	if (max_page2 > max_page) max_page2 = max_page;
	var html = new Array();
	if (!prev_page) prev_page = 1;
	if (!next_page) next_page = 1;
	if (!max_page2) max_page2 = 1;
	if (!max_page) max_page = 1;
	html.push('<li class="page-item"><a class="page-link" data-page="' + prev_page + '"><i class="bi bi-chevron-left"></i></a></li>');

	for (var i = page_tmp; i <= max_page2; i++) {
		if (i > 0) {
			if (i == page) html.push('<li class="page-item active"><a class="page-link" data-page="' + i + '">' + numberPad(i, 2) + '</a></li>');
			else html.push('<li class="page-item"><a class="page-link" data-page="' + i + '">' + numberPad(i, 2) + '</a></li>');
		}
	}
	if (!i) html.push('<li class="page-item active"><a class="page-link" data-page="1">01</a></li>');

	html.push('<li class="page-item"><a class="page-link" data-page="' + next_page + '"><i class="bi bi-chevron-right"></i></a></li>');

	
	//$('.pagination').html(html.join(''));
	if(target){
        $('.'+target).html(html.join(''));

    } else {
	    document.querySelector('.paging').innerHTML = html.join('');
    }
	
}

//넘버 변환2
function numberPad(n, width) {
	n = n + '';
	return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}



function chart391(data) {
    var url = data.url;
    var id = data.id;
    var type = data.type;
    var padding = data.padding;
    var labels_d = data.labels_d;
    var label_d = data.label_d;
    var backgroundColor = data.backgroundColor;
    var borderColor = data.borderColor;
    var borderWidth = data.borderWidth;
    var hover_text = data.hover_text;
    var font_size = data.font_size;
    var show_yn = data.show_yn;
    var anchor = data.anchor;
    var format = data.format;
    var legend_view = data.legend_view;
    var anchor_padding = data.anchor_padding;
	var yscale_text = data.yscale_text
  
    if (data.xgrid == undefined) { var xgrid = true } else { var xgrid = data.xgrid; }
    if (data.ygrid == undefined) { var ygrid = true } else { var ygrid = data.ygrid; }
    if (data.xscale == undefined) { var xscale = true } else { var xscale = data.xscale; }
    if (data.yscale == undefined) { var yscale = true } else { var yscale = data.yscale; }
    if (data.y2scale == undefined) { var y2scale = false } else { var y2scale = data.y2scale; }
    if (data.legend_position == undefined) { var legend_position = 'top' } else { var legend_position = data.legend_position; }

    if (data.fill == undefined) { var fill = false } else { var fill = data.fill; }
    if (data.snake == undefined) { var snake = 0 } else { var snake = data.snake; }
    var ctx = document.querySelector('#' + id).getContext("2d");
    var chart_data = {}
    switch (Number(type)) {
        case 0:
            var type_str = 'line';
            break;
        case 1:
            var type_str = 'bar';
            break;
        case 2:
            var type_str = 'radar';
            break;
        case 3:
            var type_str = 'pie';
            break;
        case 4:
            var type_str = 'doughnut';
            break;
        case 5:
            var type_str = 'polarArea';
            break;
        case 6:
            var type_str = 'bubble';
            break;
            case 8:
                var type_str = 'bar';
                break;
        default:
            var type_str = 'line';
            break;
    }
    var default_color = [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(153, 102, 200, 1)',
        'rgba(255, 159, 64, 1)'
    ];
    $.ajax({
        type: 'get',
        url:  url,
        dataType: 'json',
        success: function (data_json) {
            if (data_json.code == 1 && data_json.result[0].length > 0) {
                chart_data.type = type_str;
                chart_data.data = {};
                chart_data.data.datasets = [];

                if (labels_d != undefined && labels_d.length > 0) { chart_data.data.labels = labels_d } else { chart_data.data.labels = [] }

                var chart_value1 = {};
                chart_value1.datalabels = {}
                if (label_d != '' && label_d != undefined && label_d[0] != undefined) { chart_value1.label = label_d[0] } else { chart_value1.label = '' }
                if (backgroundColor != '' && backgroundColor != undefined && backgroundColor[0] != undefined) { chart_value1.backgroundColor = backgroundColor[0] } else { if(data_json.result.length > 1){chart_value1.backgroundColor = default_color[0]}else{chart_value1.backgroundColor = default_color} }
                if (borderColor != '' && borderColor != undefined && borderColor[0] != undefined) { chart_value1.borderColor = borderColor[0] } else { if(data_json.result.length > 1){chart_value1.borderColor = default_color[0]}else{chart_value1.borderColor = default_color} }
                if (borderWidth != '' && borderWidth != undefined) { chart_value1.borderWidth = borderWidth } else { chart_value1.borderWidth = 1 }
                if (hover_text != '' && hover_text != undefined) { chart_value1.datalabels.color = hover_text } else { chart_value1.datalabels.color = 'white' }
                if (font_size != '' && font_size != undefined) { chart_value1.datalabels.font = { size: font_size } } else { chart_value1.datalabels.font = { size: 12 } }
                if (anchor.toString() != 'end' && anchor.toString() != 'start') { } else { chart_value1.datalabels.align = anchor; chart_value1.datalabels.anchor = anchor }
                chart_value1.datalabels.formatter = function (value, context) {
                    // data 에 넣은 데이타 순번. 물론 0 부터 시작
                    var idx = context.dataIndex;

                    // 여기선 첫번째 데이타엔 단위를 '원' 으로, 그 다음 데이타엔 'P' 를 사용
                    // number_format() 는 여기서 기술하지 않았지만, 천단위 세팅. ChartJS 의 data 엔 숫자만 입력
                    //천단위 콤마
                    function number_format_chart(x) {
                        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    }
                    if (format == undefined) {
                        return number_format_chart(value);
                    } else {
                        return number_format_chart(value) + format;
                    }
                    //return context.chart.data.labels[idx] + ' ' + number_format_chart(value) + (idx == 0 ? '원' : 'P');
                }
                chart_value1.data = []
                for (var i = 0; i < data_json.result[0].length; i++) {
                    var dt = data_json.result[0][i];

                    if (dt.value != undefined && dt.value != '') { chart_value1.data.push(dt.value) } else { chart_value1.data.push(0) }
                    if (!labels_d) { if (dt.item != undefined) { chart_data.data.labels.push(dt.item) } else { chart_data.data.labels.push((i + 1)) } }
                }
                if(type == 8){
                chart_value1.type = 'line'

                chart_value1.yAxisID =  'y2'
                }
                chart_data.data.datasets.push(chart_value1)



                ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                //추가 비교 데이터가 있을 경우 
				if(data_json.result.length > 1){
					for(var i = 1 ; i < data_json.result.length; i++){  
						var chart_value1 = {};
						chart_value1.datalabels = {}
						if (label_d != '' && label_d != undefined && label_d[i] != undefined) { chart_value1.label = label_d[i] } else { chart_value1.label = 'chart'+(i+1) }
						if (backgroundColor != '' && backgroundColor != undefined && backgroundColor[i] != undefined) { chart_value1.backgroundColor = backgroundColor[i] } else { chart_value1.backgroundColor = default_color[i] }
						if (borderColor != '' && borderColor != undefined && borderColor[i] != undefined) { chart_value1.borderColor = borderColor[i] } else { chart_value1.borderColor = default_color[i] }
						if (anchor.toString() != 'end' && anchor.toString() != 'start') { } else { chart_value1.datalabels.align = anchor; chart_value1.datalabels.anchor = anchor }
						chart_value1.datalabels.formatter = function (value, context) {
							// data 에 넣은 데이타 순번. 물론 0 부터 시작
							var idx = context.dataIndex;
							function number_format_chart(x) {
								return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
							}
							if (format == undefined) {
								return number_format_chart(value);
							} else {
								return number_format_chart(value) + format;
							}
						}
						chart_value1.data = []
						for (var j = 0; j < data_json.result[i].length; j++) {
							var dt = data_json.result[i][j];
							if (dt.value != undefined && dt.value != '') { chart_value1.data.push(dt.value) } else { chart_value1.data.push(0) }
						}
				

						chart_data.data.datasets.push(chart_value1)
					}
				}
      



                ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                //공통 옵션 설정
                if (show_yn == 1) { chart_data.plugins = [ChartDataLabels] }
                if (legend_view) { var legend_viewd = legend_view } else { var legend_viewd = false }
                chart_data.options = {
                    responsive : true,
                    elements: {
                        line: {
                            //활성화 하면 그래프 영역이 색깔채움됨
                            fill: fill,
                            tension: snake
                        }
                    },
                    scales: {
                        x: {
                            display: xscale,
                            grid: {
                                display: xgrid,
                            }
                        },
                        y: {
                            display: yscale,
                            title: {
                                display: true,
                                text: yscale_text,
                                color: '#911',
                                font: {
                                  family: 'Comic Sans MS',
                                  size: 20,
                                  weight: 'bold',
                                  lineHeight: 1.2,
                                },
                                padding: {top: 20, left: 0, right: 0, bottom: 0}
                              },
                            grid: {
                                display: ygrid,
                                stacked: true
                            }
                        },
                        y2: {
                            display: y2scale,
                            type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                            position: 'right',
                            // reverse: true,  상하반전
                            title: {
                                display: true,
                                text: yscale_text,
                                color: '#911',
                                font: {
                                  family: 'Comic Sans MS',
                                  size: 20,
                                  weight: 'bold',
                                  lineHeight: 1.2,
                                },
                                padding: {top: 20, left: 0, right: 0, bottom: 0}
                              },
                            grid: {
                                display: ygrid,
                                stacked: true
                            }
                        }
                    },
                    tooltips: {
                        callbacks: {
                            label: function (tooltipItem) {
                                return tooltipItem.yLabel;
                            }
                        }
                    },
					legend : {
						position : 'left'
					}
					,
                    plugins: {
                        //label(상단 제목 감추고 싶으면 legend false)
                        // legend: legend_viewd, // Hide legend
						legend : {
							display : legend_viewd,
							position : legend_position
						}
						,
                        datalabels: {
                            //데이터 라벨 백그라운드 설정 
                            backgroundColor: function (context) {
                                return context.dataset.backgroundColor;
                            },
                            borderRadius: 4,
                            color: 'white',
                            font: {
                                weight: 'bold'
                            },
                            formatter: Math.round,
                            padding: anchor_padding
                        }

                    },
                    layout: {
                        padding: padding
                    },


                }
            }

        }, complete: function () {
            new Chart(ctx, chart_data)
        }
    });


}



//3자리 콤마
 function number_format(str) {
    return str.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
 }

//소수점3자리 콤마
 function number_format_fixed(str) {
	str = String(str);
	str = str.split('.');

	var n_str ='';

	if (typeof str[1] == 'undefined'){
		n_str = str[0].toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	} else {
		n_str = str[0].toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")+'.'+str[1];
	}
	
    return n_str;
 }

//serialzeArray to int(comma)
function commatoint(data){
	var pat = /([0-9]*,)\w+/;
	for (var i=0;i<data.length;i++)
	{
		if (pat.test(data[i].value)) data[i].value = data[i].value.replace(/,/g, '');
	}
	return data;
}

function datetime_local(num){//for datatime-local
	var str = num.toString();
	return str.substring(0, 4) + '-' + str.substring(4, 6) + '-' + str.substring(6, 8) + 'T' + str.substring(8, 10) + ':' + str.substring(10, 12) + ':' + str.substring(12, 14);
}

function date2(num, num2){//for datatime-local
	var str = '';
	var str2 = '';
	if(num > 0) {
		str = num.toString();
		str2 = str.substring(0, 4) + '-' + str.substring(4, 6) + '-' + str.substring(6, 8);
		if(num2) str2 = str2.substring(0, (str2.length - num2))
	}
	return str2;
}

function date3(num, num2){//for datatime-local
	var str = '';
	var str2 = '';
	if(num > 0) {
		str = num.toString();
		str2 = str.substring(0, 4) + '-' + str.substring(4, 6);
		if(num2) str2 = str2.substring(0, (str2.length - num2))
	}
	return str2;
}

//8자리 int 날짜포멧 전환 type 1 = yyyy mm dd  // type = 2  yy mm dd
function length8(num, formet, type) {

	if (typeof num == '' || num == 'undefined' || num == null) {
		num = '';
	}

	var str = num.toString();
	var num_8 = '';
	switch (type) {
		case 2:
			num_8 = str.substring(2, 4) + formet + str.substring(4, 6) + formet + str.substring(6, 8);
			break;
		default:
			num_8 = str.substring(0, 4) + formet + str.substring(4, 6) + formet + str.substring(6, 8);
			break;
	}
	if( String(num).length < 8 ) num_8 = '';
	return num_8;
}

//14자리 int 날짜포멧 전환 type 1 = yyyy mm dd  hh ii ss // type = 2  yy mm dd hh ii ss // 3 yyyy  mm dd //4 hh ii ss
function length14(num, formet1, formet2, type) {
	if (typeof num == '' || num == 'undefined' || num == null) {
		num = '';
	}

	var str = '';
	if(num > 0) str = num.toString();
	var num_14 = ''
	switch (type) {
		case 5:
			num_14 = str.substring(2, 4) + formet1 + str.substring(4, 6) + formet1 + str.substring(6, 8) + ' ' + str.substring(8, 10) + formet2 + str.substring(10, 12);
			break;
		case 4:
			num_14 = str.substring(8, 10) + formet1 +  str.substring(10, 12);
			break;
		case 3:
			num_14 = str.substring(0, 4) + formet1 + str.substring(4, 6) + formet1 + str.substring(6, 8);
			break;
		case 2:
			num_14 = str.substring(2, 4) + formet1 + str.substring(4, 6) + formet1 + str.substring(6, 8) + ' ' + str.substring(8, 10) + formet2 + str.substring(10, 12) + formet2 + str.substring(12, 14);
			break;
		default:
			num_14 = str.substring(0, 4) + formet1 + str.substring(4, 6) + formet1 + str.substring(6, 8) + ' ' + str.substring(8, 10) + formet2 + str.substring(10, 12) + formet2 + str.substring(12, 14);
			break;
	}
	if( String(num).length < 8 ) num_14 = '';
	return num_14;
}

function time2(num, num2){//for datatime-local
	var str = '';
	var str2 = '';
	if(num > 0) {
		str = num.toString();
		str2 = str.substring(8, 10) + ':' + str.substring(10, 12) + ':' + str.substring(12, 14);
		if(num2) str2 = str2.substring(0, (str2.length - num2))
	}
	return str2;
}

//
function toInt(str, formet1, formet2) {
	if (str) {
		if (formet1) {
			if (formet2) {
				var toInt = str.replaceAll(' ', '').replaceAll(formet1, '').replaceAll(formet2, '').trim();
			} else {
				var toInt = str.replaceAll(' ', '').replaceAll(formet1, '').trim();
			}
		}
	}
	return Number(toInt);
}

//nl to br
function nl2br (str, is_xhtml) {
    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1'+ breakTag +'$2');
}

//사업자번호 하이픈
function biznoformatter(num, type) {
    var formatNum = '';
	num = String(num);
    
	try{
        if (num.length == 10) {
		   if (type == 0) {
				formatNum = num.replace(/(\d{3})(\d{2})(\d{5})/, '$1-$2-*****');
		   } else {
				 formatNum = num.replace(/(\d{3})(\d{2})(\d{5})/, '$1-$2-$3');
		   }
        }
    } catch(e) {
          formatNum = num;
          console.log(e);
    }
    return formatNum;
}



function ck_code(code){
    
}