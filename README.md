# Projeto Cloneddit

[Link](https://lucas-almeida-sd.github.io/Cloneddit/) para acessar a página do projeto.

Esse projeto consiste em uma aplicação baseada na plataforma [Reddit](https://www.reddit.com/), desenvolvida como uma versão básica da mesma, no qual o intuito foi para praticar minhas habilidades de Dev Front-End.

A aplicação permite ao usuário fazer publicações e interagir com publicações de outros usuários, no entanto, essas ações só são válidas para usuários autenticados. A única ação livre para qualquer usuário é visualizar todos os posts já realizados.

A aplicação foi desenvolvida com __React.js__ e utiliza-se os serviços de `autenticação` e de `banco de dados (Realtime Database)` do __Firebase__.

## Tecnologias

- [React.js](https://pt-br.reactjs.org/)

- [Firebase](https://firebase.google.com/)

## Como executar

Clone o projeto e acesse a pasta do mesmo.

```bash
$ git clone git@github.com:Lucas-Almeida-SD/Cloneddit.git
$ cd Cloneddit
```

Para iniciá-lo, siga os passos abaixo:
```bash
# Instalar as dependências
$ npm install

# Iniciar o projeto
$ npm start
```
O app estará disponível no seu browser pelo endereço http://localhost:3000.

Lembrando que será necessário criar uma conta no [Firebase](https://firebase.google.com/) e um projeto para disponibilizar um Realtime Database.