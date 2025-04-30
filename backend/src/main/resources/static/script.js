//Criando objeto que irá se conectar com o servidor Web Socket utilizando a URL configurada no BackEnd
const stompClient = new StompJs.Client({
    brokerURL: 'ws://' + window.location.host + '/furia-chat'
});

//Mantendo conexão com o servidor e recebendo e organizando qualquer mensagem que ele envie
stompClient.onConnect = (frame) => {
        setConnected(true);
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topics/furia-chat', (message) => {
            updateLiveChat(JSON.parse(message.body).content);
        });
};

//Tratamento para caso ocorra algum erro no processo de conexão
stompClient.onWebSocketError = (error) => {
    console.error('Error with websocket', error);
};

//Tratamento para caso o servidor retorne algum erro
stompClient.onStompError = (frame) => {
    console.error('Broker reported error: ' + frame.headers['message']);
    console.error('Additional details: ' + frame.body);
};

//Função para desabilitar o habilitar os botões de conexão, assim como se conectar ou desconectar ao servidor
function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
    } else {
        $("#conversation").hide();
    }
}

//Abrindo conexão com o servidor, só irá funcionar se o usuário digitar alguma letra no input de usuário, senão ativa o sweet alert de erro
function connect() {
    const username = $("#user").val().trim();
    if(username === ""){

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Por favor, digite um nome de usuário para se conectar ao CHAT!",
        });
        return;

    }

    stompClient.activate();
}

//Função para se desconectar do servidor
function disconnect() {
    stompClient.deactivate();
    setConnected(false);
    console.log("Disconnected");
}

//Função para enviar novas mensagens ao servidor, para enviar o usuário precisar escrever algo no input de novas mensagen e estar conectado,
//caso contrário, irá ativar sweet alerts de erro
function sendMessage() {

    const msg = $("#message").val().trim();         //Precisa ter algo escrito na caixa de novas mensagens
    if(msg === ""){

        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Por favor, digite uma mensagem para ser exibida no CHAT!",
        }).then(() => {
                $("#send").focus();
        });
            return;
    }

    const username = $("#user").val().trim();       //Precisa haver um nome de usuário
    if(username === ""){

            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Para mandar uma mensagem você precisa se conectar como um usuário!",
            }).then(() => {
                    $("#send").focus();
            });
                return;
    }

    stompClient.publish({                       //Caso esteja tudo certo, irá publicar a mensagem no servidor
        destination: "/app/new-message",        //URL para novas mensagens
        body: JSON.stringify({                  //Envia a mensagem em formato JSON, contendo o usuário e a mensagem em si
            'user': $("#user").val(),
            'message': $("#message").val()
        })
    });
    $("#message").val("");
}

$(document).ready(function() {
    $("form").on('submit', (e) => e.preventDefault());  // Configurando as ações de casa botão
    $("#connect").click(() => connect());
    $("#disconnect").click(() => disconnect());
    $("#send").click(() => sendMessage());

    //Configuração para uso de emojis
    const emojiButton = document.querySelector('#emoji-button');                        //Selecionando botão e alocando local onde irá aparecer
    const emojiPickerContainer = document.querySelector('#emoji-picker-container');     //os emojis para serem escolhidos
    const messageInput = document.querySelector('#message');

    if (emojiButton && emojiPickerContainer && messageInput) {
            // Função para gerar os emojis
        function generateEmojis() {
            const emojis = [                //Emojis disponíveis

                //Games e esports
                "🎮","🕹️","💣","🔫","🧨","🎯","🏹","🛡️","⚔️","🏆","🥇","📡","🧠","🗺️","🧍‍♂","🎙️","📢","🔥","💥","⛏️","🚩","💀", "⚰️","🩸","🔍","🖥️","⌨️","🖱️","📈","🆚","💬","🚀",

                "❤️", "🎉", "🔥", "💯", "✨", "🍕", "☕", "🎵", "⚽", "🎮", "🚀", "💡", "⭐", "🌈", "🎁", "🎈", "🎂",
                // Smileys & Emoções
                "😊", "😂", "😭", "😍", "🥰", "😘", "😗", "😙", "🤩", "🤔", "🤨", "🙄", "😒", "😞", "😟", "😠", "😡", "🤬", "🥺", "😥", "😓", "🥶", "🥵", "🥴", "🤯", "😇", "🤠", "😎", "🤓", "🥳", "🤡", "😈", "💀", "👻", "👽", "🤖", "💩", "🙈", "🙉", "🙊",

                // Pessoas & Corpo
                "👋", "🤚", "🖐️", "✋", "🖖", "👌", "🤏", "🤞", "✌️", "🤘", "🤙", "👈", "👉", "👆", "🖕", "👇", "☝️", "👍", "👎", "👏", "🙌", "🤝", "🙏", "💪", "🦵", "🦶", "👂", "👃", "🧠", "🦷", "👅", "👄", "👶", "👧", "👦", "🧑", "👨", "👩", "👴", "👵", "👨‍⚕️", "👩‍⚕️", "👨‍🎓", "👩‍🎓", "👨‍🏫", "👩‍🏫", "👨‍🌾", "👩‍🌾", "👨‍🍳", "👩‍🍳", "👨‍🔧", "👩‍🔧", "👨‍🏭", "👩‍🏭", "👨‍💼", "👩‍💼", "👨‍💻", "👩‍💻", "👨‍🎤", "👩‍🎤", "👨‍🎨", "👩‍🎨", "👨‍✈️", "👩‍✈️", "👨‍🚀", "👩‍🚀", "👮‍♂️", "👮‍♀️", "🕵️‍♂️", "🕵️‍♀️", "💂‍♂️", "💂‍♀️", "👷‍♂️", "👷‍♀️", "🤴", "👸", "👳‍♂️", "👳‍♀️", "👲", "🧕", "🧔‍♂️", "🧔‍♀️", "👱‍♂️", "👱‍♀️", "👨‍🦰", "👩‍🦰", "👨‍🦱", "👩‍🦱", "👨‍🦳", "👩‍🦳", "👨‍🦲", "👩‍🦲", "🧑‍🤝‍🧑", "👨‍👩‍👦", "👨‍👩‍👧", "👨‍👩‍👧‍👦", "👨‍👩‍👦‍👦", "👨‍👩‍👧‍👧", "👨‍👨‍👦", "👨‍👨‍👧", "👨‍👨‍👧‍👦", "👨‍👨‍👦‍👦", "👨‍👨‍👧‍👧", "👩‍👩‍👦", "👩‍👩‍👧", "👩‍👩‍👧‍👦", "👩‍👩‍👦‍👦", "👩‍👩‍👧‍👧", "👨‍👦", "👨‍👧", "👩‍👦", "👩‍👧",

                // Animais & Natureza
                "🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯", "🦁", "🐮", "🐷", "🐽", "🐔", "🦃", "🕊️", "🐦", "🐧", "🦉", "🦇", "🦋", "🐛", "🐜", "🐝", "🐞", "🦗", "🕷️", "🦂", "🐢", "🐍", "🦎", "🦖", "🦕", "🐳", "🐬", "🐟", "🐠", "🐡", "🐙", "🐚", "🦀", "🦞", "🦐", "🦑", "🐐", "🐑", "🐴", "🦒", "🐘", "🦏", "🦛", "🦓", "🐒", "🦍", "🦧", "🦥", "🦦", "🐺", "🐕‍🦺", "🐩", "🐈‍", "🐇", "🐀", "🐁", "🐿️", "🦔", "🐉", "🦕", "🌴", "🌳", "🌲", "🌵", "🌱", "🌿", "☘️", "🍀", "🍁", "🍂", "🍄", "🍇", "🍎", "🍊", "🍋", "🍌", "🍉", "🍓", "🍍", "🥭", "🥝", "🍅", "🌶️", "🥕", "🥦", "🥬", "🥒", "🌽", "🥔", "🍠", "🥜", "🍞", "🥐", "🥖", "🥨", "🥯", "🥞", "🧇", "🧀", "🍖", "🍗", "🥩", "🥓", "🍔", "🍟", "🍕", "🌭", "🥪", "🌮", "🌯", "🥙", "🧆", "🥚", "🍳", "🥘", "🍲", "🥣", "🥗", "🍿", "🧈", "🧂", "🥫", "🍱", "🍘", "🍙", "🍚", "🍛", "🍜", "🍝", "🍣", "🍤", "🍥", "🥮", "🍡", "🥟", "🥠", "🥡", "🍪", "🎂", "🍰", "🧁", "🥧", "🍫", "🍬", "🍭", "🍮", "🍩", "🥠", "🍦", "🍧", "🍨", "🧉", "🍺", "🍻", "🥂", "🍷", "🥃", "🍸", "🍹", "🧉", "🍾", "🍶", "☕", "🍵", "🥤","🧃", "🧉", "🧊",

            ]; // Adicione mais emojis conforme necessário


            emojis.forEach(emoji => {      //Selecionando o emoji através do click do usuário e incluindo na caixa de novas mensagens
                const emojiElement = document.createElement('span');
                emojiElement.textContent = emoji;
                emojiElement.classList.add('emoji-item');
                emojiElement.addEventListener('click', function() {
                    messageInput.value += emoji;
                    emojiPickerContainer.style.display = 'none'; // Ocultar após a seleção
            });
                emojiPickerContainer.appendChild(emojiElement);
            });
        }

        generateEmojis(); // Chamar para criar os emojis ao carregar a página

            // Controlar a visibilidade do seletor ao clicar no botão de emoji
        emojiButton.addEventListener('click', function() {
            emojiPickerContainer.style.display = (emojiPickerContainer.style.display === 'none' || emojiPickerContainer.style.display === '') ? 'block' : 'none';
        });

            // Ocultar o seletor se clicar fora dele (opcional)
        $(document).on('click', function(event) {
            if (!$(event.target).closest('#emoji-button').length && !$(event.target).closest('#emoji-picker-container').length) {
                emojiPickerContainer.style.display = 'none';
            }
        });
    }
});


//Função responsável por atualizar a área de mensagem com as novas mensagens do servidor WebSocket
function updateLiveChat(message) {
    const livechatDiv = $("#livechat")[0];
    const isScrolledToBottom = livechatDiv.scrollTop + livechatDiv.clientHeight >= livechatDiv.scrollHeight - 5;

    const messageContainer = document.createElement('div');
    messageContainer.classList.add('message-container');

    const messageTextSpan = document.createElement('span');
    messageTextSpan.classList.add('message-text');
    messageTextSpan.textContent = message;

    messageContainer.appendChild(messageTextSpan);

    $("#livechat").prepend(messageContainer);

    if (isScrolledToBottom) {                           //Lógica para manter o chat apontando para baixo e o usuário ver as novas mensagens
        requestAnimationFrame(() => {
            $("#livechat").scrollTop($("#livechat")[0].scrollHeight);
        });
    }
}


