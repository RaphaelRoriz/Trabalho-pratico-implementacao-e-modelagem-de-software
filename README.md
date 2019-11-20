# **Aplicativo UFLANews**

## Motivação e objetivos.
   
  A Universidade Federal de Lavras(UFLA) conta com uma infinidade de entidades capazes de gerar boletins informativos, os quais são distribuídos atraveś do email institucional e de páginas web relativas à tais entidades; entretanto, tal meio de distribuição causa desconfortos recorrentes à alguns usuários: O recebimento de boletins que não são do interesse do mesmo, e o não recebimento de boletins de interesse(ou então, a falta de alguma notificação, dando mais destaque ao recebimento do mesmo).
Esta falta de controle sobre os boletins levou a PRG à solicitar a criação deste Aplicativo móvel.

## Funcionalidades:

Ao utilizar o aplicativo UFLANews, o usuário será capaz de:
  
  * Ler as notícias do feed principal;
  * Receber notificações dos boletions de interesse;
  * Seguir um publicador, dando ênfase ao conteúdo por ele publicado;
  * Curtir boletins informativos;
  * Postar comentários em boletins informativos;
  * Buscar publicadores de conteúdos e áreas de interesse;
  
 Em suma , o aplicativo permitirá ao usuário ter maior controle sobre as notificações dos boletins de interesse.
 
 ## Plataformas :
 
 O aplicativo será desenvolvido para a plataforma Android.
  

## Equipe:

### Guilherme Dânrley Silva Hanauer
* [Perfil Github](https://github.com/Gahiji)
* Scrum team member;
* Hard Skills: Programação C/C++, Python e Administração de Sistemas Linux.
* Soft Skills: Organização.

### Igor Henrique Torati Ruy
* [Perfil GitHub](https://github.com/igortorati)
* Scrum Master;
* Hard Skills: Programação Java e Criação e Manipulação de BD.
* Soft Skills: Resolução de Conflitos, Solução de Problemas e Ética.

### Luiz Felipe de Oliveira Calvo
* [Perfil GitHub](https://github.com/luizcalvo)
* Scrum team member;
* Hard Skills: Programação em Java, Python, e C++;
* Soft Skills: Facilidade com abstrações, Comunicação, Proatividade e Criatividade.

### Raphael Fernandes Reis Roriz 
* [Perfil GitHub](https://github.com/RaphaelRoriz)
* Product Owner;
* Hard Skills:Programação;
* Soft Skills:Pensamento Crítico , Organização;

## Atores do sistema:
* *Visitante*: Um visitante é um usuário que não possui conta e/ou ainda não foi capaz de realizar login no aplicativo;
* *API-PRG*: A API da PRG gerencia os dados exibidos aos usuários do aplicativo;
* *Usuário*: O usuário interage com o aplicativo e realiza as tarefas que deseja;
### Diagrama de casos de uso:

[diagrama]:https://github.com/RaphaelRoriz/Trabalho-pratico-implementacao-e-modelagem-de-software/blob/master/Casos%20De%20Uso%20UFLANewsReduzido.png "Diagrama de casos de uso"

![alt text][diagrama]

### Documentação:
* [Documento de requisitos](https://github.com/RaphaelRoriz/Trabalho-pratico-implementacao-e-modelagem-de-software/issues?page=1&q=is%3Aissue+is%3Aopen)

## Utilização

1 - Clone o repositorio do github:
> git clone https://github.com/RaphaelRoriz/Trabalho-pratico-implementacao-e-modelagem-de-software.git

2 - Instale os scripts do *framework* Ionic:
> npm install @ionic/app-scripts@latest --save-dev

3 - Siga as instruções de instalação da API utilizada pelo aplicativo UFLANews [clicando aqui](https://github.com/RaphaelRoriz/Trabalho-pratico-implementacao-e-modelagem-de-software/tree/master/UFLAnews-api).

3- Execute o aplicativo:
> ionic serve
