package com.chat.FURIA.backend.Controller;

import com.chat.FURIA.backend.Domain.ChatInput;
import com.chat.FURIA.backend.Domain.ChatOutput;
import org.apache.tomcat.util.buf.CharChunk;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

@Controller                                    //Classe responsável por receber as mensagens do FrontEnd
public class ChatController {

    @MessageMapping("/new-message")          //Endpoint para receber novas mensagens
    @SendTo("/topics/furia-chat")           //URL que contém o lugar para onde essas novas mensagens vão, ou seja, o servidor Web Socket
    public ChatOutput newMessage(ChatInput chatInput){
        System.out.println(chatInput);
        return new ChatOutput(chatInput.user() + ":\n" + chatInput.message() + "\n\n");     //Retorna um objeto Output que junta as duas
    }                                                                                               //informações do Input

}
