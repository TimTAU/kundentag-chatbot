$(function () {
    "use strict";

    const chatContainerEl = document.getElementById('chat-container');
    scrollToBottom()

    /*setInterval(function () {
        // allow 1px inaccuracy by adding 1
        const isScrolledToBottom = chatContainerEl.scrollHeight - chatContainerEl.clientHeight <= chatContainerEl.scrollTop + 1;
        console.log('isScrolledToBottom', isScrolledToBottom);

        // scroll to bottom if isScrolledToBottom is true
        if (isScrolledToBottom) {
            scrollToBottom()
        }
    }, 500);*/

    function scrollToBottom() {
        chatContainerEl.scrollTop = chatContainerEl.scrollHeight - chatContainerEl.clientHeight;
    }

    let message;
    $('#message-input').on('keypress', function (e) {
        if (e.key === 'Enter') {
            $('#message-button').click();
        }
    })
        .on('keyup', function () {
            $('#message-button').prop('disabled', !$(this).val());
        });

    $('#message-button').on('click', function () {
        const $this = $(this);
        if ($this.prop('disabled')) return;
        const nextIsAnswer = !!$this.data('answer');

        const $messageInput = $('#message-input');
        if (!nextIsAnswer) {
            message = $messageInput.val();
            $('#chat').append(`<div class="chat-item chat-user">${message}</div>`);
            scrollToBottom();
            $this.data('answer', true);
            $messageInput.attr('placeholder', 'Was wäre eine passende Antwort darauf?');
        } else {
            const answer = $messageInput.val();
            $('#chat').append(`<div class="chat-item chat-bot">${answer}</div>`);
            scrollToBottom();
            $this.prop('disabled', true);
            $.ajax(
                '/save', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: JSON.stringify({
                        question: message,
                        answer: answer
                    })
                }
            )
                .done(() => {
                    $this.data('answer', false);
                    $this.prop('disabled', false);
                    $messageInput.attr('placeholder', 'Gib hier deine Frage ein.');
                })
        }
        $messageInput.val('');
    })
});