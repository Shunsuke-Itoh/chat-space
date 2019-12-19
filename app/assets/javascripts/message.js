$(function(){

  var buildHTML = function(message) {
    if (message.image.url) {
      var content = message.content ? `<P class= "message__main__content">
                                        ${message.content}
                                      </p>`: "";

      var html =  `<div class = "message" data-message-id = "${message.id}">
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
      var html = `<div class = "message" data-message-id = "${message.id}">
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
    };
    return html;
  };

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

  var reloadMessages = function() {
    last_message_id = $('.message:last').data("message-id");
    $.ajax({
      url: 'api/messages',
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      var insertHTML = ''; 
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
      });
      $('.messages').append(insertHTML);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
    })
    .fail(function() {
      alert("自動更新に失敗しました。");
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});