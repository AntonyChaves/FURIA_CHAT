package com.chat.FURIA.backend.Domain;
                                        //Dados que sairão do Front End para o servidor Web Socket
public record ChatInput(

        String user,                    //Formato do objeto irá conter uma string para usuário e uma string para a mensagem
        String message

) {
}
