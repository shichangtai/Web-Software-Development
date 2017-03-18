
window.addEventListener('message',function(e){
    e.preventDefault();
    var submitscore=e.data.score;
    document.getElementById('id_score').value=submitscore;
    console.log(submitscore);



    function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
  var csrftoken = getCookie('csrftoken');
  console.log(csrftoken);

      function csrfSafeMethod(method) {
// these HTTP methods do not require CSRF protection
          return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
      }
      $.ajaxSetup({
  beforeSend: function(xhr, settings) {
    if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
        xhr.setRequestHeader("X-CSRFToken", csrftoken);
    }
}
});

      $.ajax({
        type:"POST",
        url:window.location.href,
        //url: 'http://twitter.com/',
        contentType: "application/json; charset=utf-8",

        data: JSON.stringify({
            score:submitscore,
            csrfmiddlewaretoken: csrftoken

        }),
        success: function(response){
          console.log("Submit score success, sore is " +submitscore);
          
              //console.log(data['last_round']);
          $('#last_round').text(submitscore);
              //console.log(data);
          // $('#personal_high').text(Number(data['personal_high']).toFixed(2))

        },
        error: function(response){
          console.log("error");
        }

      });


});
