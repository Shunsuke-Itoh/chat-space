$(function(){
  function buildHTML(message){
    if (message.image.url) {
      var content = message.content ? `<P class= "message__main__content">
                                        ${message.content}
                                      </p>`: "";

      var html =  `<div class = "message">
                    <div class = "message__user">
                      <div class = "message__user__name">
                        ${message.user_name}
                      </div>
                      <div class="message__user__date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class = "message__main">
                      ${content}
                      <img class = "message__main__image", src="${message.image.url}">
                    </div>
                  </div>`
    } else {
      var html = `<div class = "message">
                    <div class = "message__user">
                      <div class = "message__user__name">
                        ${message.user_name}
                      </div>
                      <div class="message__user__date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class = "message__main">
                      <P class= "message__mein__content">
                        ${message.content}
                      </P>
                    </div>
                  </div>`
    }
    return html
  }

  $("#new_message").on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url:  url,
      type: "POST",
      data: formData,
      dataType: "json",
      processData: false,
      contentType: false
    })
    .done(function(data) {
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      $('#new_message')[0].reset();
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    })
    .always(function() {
      $('.input-btn__send').prop('disabled', false);
    });
  })
});