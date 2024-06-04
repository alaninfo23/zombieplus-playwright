![poster](https://raw.githubusercontent.com/qaxperience/thumbnails/main/playwright-zombie.png)

## 🤘 Sobre

Repositório do projeto de testes automatizados do sistema Zombie Plus, construído no curso Playwright Zombie Edition! O Playwright é uma ferramenta de código aberto desenvolvida pela Microsoft que revoluciona a automação de testes em sistemas web, oferecendo uma abordagem eficaz e altamente confiável.

## 💻 Tecnologias
- Node.js
- Playwright
- Javascript
- Faker
- PostgreSQL

## 🤖 Como executar

1. Clonar o repositório, instalar as dependências
```
npm install
```
2. Instalar e executar o banco de dados com Docker
    2.1 Faça download e instale o docker e execute os comandos a seguir no terminal.
    2.2 docker pull postgres
    2.3 docker run -p 5432:5432 -v /tmp/database:/var/lib/postgresql/data -e POSTGRES_PASSWORD=1234 -d postgres
    2.4 docker exec -it {coloque o container id aqui} bash
    2.5 psql -h localhost -U postgres

3. Executar testes em Headless
```
npx playwright test 
```
4. Executar testes na interface gráfica
```
npx playwright test --headed
```
5. Executar no modo UI
```
npx playwright test --ui
```
6. Executar no modo debug
```
npx playwright test --debug
```
7. Executar ver o relatório dos testes
```
npx playwright show-report
```

<hr>
