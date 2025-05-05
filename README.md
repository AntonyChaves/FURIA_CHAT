# FURIA_CHAT
Este projeto utiliza Java no BackEnd e Javascript no FrontEnd para criar um chat em tempo real para fãs do time de CS da FURIA.

Primeiramento, meus agradecimentos ao Caio e ao Milton pela oportunidade de fazer esse desafio prático.

Para realizar este desafio, utilizei tecnologias que possuo mais segurança, no BackEnd utilizei Java(versão 17) e Spring Framework(versão 3.3.10), já no FrontEnd utilizei apenas HTML, CSS e Javascript Vanilla.

Começando pelo BackEnd, que é a área que eu possuo mais conhecimento e familiaridade em disparado, utilizei Java e Spring Framework para criar um servidor Web Socket que seria capaz de receber mensagens e enviá-las para todos que estão conectados ao servidor, utilizei o Maven para gerenciar dependências. Em relação ao banco de dados, optei por utilizar um banco de dados em memória (H2 database) para facilitar os testes do código sem precisar configurar bancos de dados relacionais (que é o tipo de banco de dados que possuo mais conhecimento).

Em relação ao FrontEnd, optei por implementar de uma forma mais vanilla pois não é uma área que eu possuo muita familiaridade, utilizei HTML, CSS (junto com Bootstrap para responsividade) e Javascript para me conectar com o servidor Web Socket, além disso, utilizei ferramentas como font awesome, sweetalert e geração de emojis para trazer mais interatividade para o projeto.

Para testar o projeto, seria necessário uma máquina que tivesse pelo menos a versão 17 do java instalada e uma IDE para executar o código de forma fácil (utilizei Intellij). Assim que a pasta 'backend' fosse aberta como um projeto, seria necessário carregar as dependências do Maven, esperar carregar tudo e depois executar o arquivo 'BackendApplication', esperar que o Spring Boot carregue o servidor Tomcat na porta 8080, abrir um navegador da escolha do usuário e pesquisar 'localhost:8080', com isso a aplicação seria executada e a Landing Page seria carregada. Após isso, já seria possível utilizar o sistema.

A Landing Page funciona de uma maneira simples e fácil de se entender, no topo há uma navbar que contém links para mídias sociais da FURIA para que os fãs possam acessar oc conteúdos do time, abaixo tem uma imagem com um texto pequeno para os fãs e no final da página tem o chat em si. O chat possuo um input para o usuário escrever o nome que ele terá no chat e dois botões, um para se conectar e outro para desconectar do chat (servidor Web Socket), após conectado, o usuário poderá digitar a mensagem de sua escolha no input mais abaixo, selecionar um emoji através do ícone de emoji ao lado do input e enviar a mensagem através do botão enviar ao lado, assim que ele fizer isso a mensagem vai para a DIV responsável por exibir as mensagens do chat, essa mensagem irá aparecer 
tanto para ele quanto para qualquer outro conectado ao chat (é possível testar isso abrindo o chat em diferentes navegadores e simulando uma conversa). Não é possível se conectar ao chat sem escrever nada como nome de usuário, assim como não é possível enviar uma mensagem que não contenha nenhum conteúdo ou tentar enviar uma mensagem sem ter um nome de usuário digitado, todas essas ações ativam um sweetalert de erro. Essa é uma explicação de como é o funcionamento do chat ao vivo, qualquer dúvida me coloco à disposição para responder.

Novamente agradeço pela oportunidade de estar participando do processo seletivo para essa vaga de assitente de engenharia de software e estar realizando esse desafio prático.

Atenciosamente, Antony Chaves.
