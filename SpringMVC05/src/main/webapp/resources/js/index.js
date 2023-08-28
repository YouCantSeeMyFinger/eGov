list()

document.querySelector('[name="main_search"]').onsubmit = function(e){
  e.preventDefault();
  if(e.target.reportValidity()){
    list();
  }
}

$.ajax({
    url: contextPath + '/json/chart1.json',
    type: 'post',
    dataType: 'json',
    //data: params,
    success: function (data) {
        const ctx = document.getElementById('chart1');
        // console.log(data);
        if(data.code == 1001){
            var labels = ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"]
            // var datasets = data.datasets;
            var datasets = [{}];
            datasets[0].borderWidth = 1
            datasets[0].data = data.result[0].data
            datasets[0].label ="Color count"
            datasets[0].backgroundColor = [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'
              ];
            datasets[0].borderColor = [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'
              ];
            console.log(datasets);
            new Chart(ctx, {
                type: 'bar',
                data: {
                  labels: labels,
                  datasets: datasets,
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true
                    }
                  }
                }
              });
        } else if(data.code == 1002) {
            alert('차트 정보가 없습니다.');
        } else {
            alert('옳바르지 않은 데이터입니다.');
        }

    }
});
  
  
$.ajax({
    url: contextPath + '/json/chart2.json',
    type: 'post',
    dataType: 'json',
    //data: params,
    success: function (data) {
        const ctx2 = document.getElementById('chart2');
        // console.log(data);
        if(data.code == 1001){
          var labels = ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"]
          // var datasets = data.datasets;
          var datasets = [{}];
          datasets[0].borderWidth = 1
          datasets[0].data = data.result[0].data
          datasets[0].label ="Color count"
          datasets[0].backgroundColor = [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 205, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(201, 203, 207, 0.2)'
            ];
          datasets[0].borderColor = [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 205, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(201, 203, 207, 0.2)'
            ];
          console.log(datasets);
          new Chart(ctx2, {
              type: 'doughnut',
              data: {
                labels: labels,
                datasets: datasets,
              },
              options: {
                  responsive: true,
                  maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true
                  }
                }
              }
            });
        } else if(data.code == 1002) {
            alert('차트 정보가 없습니다.');
        } else {
            alert('옳바르지 않은 데이터입니다.');
        }

    }
});

function list(){

  var params	= $('[name="main_search"]').serializeArray();

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
                  ele.push('      <input type="checkbox" class="form-check-input" name="seq" value="'+item.seq+'">');
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
