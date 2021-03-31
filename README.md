## Desafio testes de API - Cypress
- Foi utilizaddo o MantisBT local e criado um agent pool no azure devops para rodar os testes.

## Arquitetura do Projeto - Cypress

- Interpretador Js - [Node.js - 12.16.1](https://nodejs.org/en/)

- Ambiente de desenvolvimento - [Visual Studio Code](https://code.visualstudio.com)

- Linguagem de desenvolvimento - [JavaScript](https://www.javascript.com)

- Ferramenta de testes automatizados - [Cypress - 6.2](http://cypress.io)

- Relatório de teste on-line -[Cypress Dashboard](https://dashboard.cypress.io/)

- Relatório de teste - [Mochawesome - 6.1.1](https://www.npmjs.com/package/mochawesome)

- Docker - [Docker](https://www.docker.com/get-started)

## Metas

- [x]	1) Implementar 50 scripts de testes que manipulem uma aplicação cuja interface é uma API REST. 
	- Foram criados 51 scripts de teste API localizados no em cypress/integration

- [x]	2) Alguns scripts devem ler dados de uma planilha Excel para implementar Data-Driven.
	- Criado um arquivo de exemplo de DDT no caminho cypress/integration/proects/proectsDataDriven.spec.js

- [x]	3) O projeto deve tratar autenticação.
	- Tratado autenticação nos scripts de test.

- [x]	4) Pelo menos um teste deve fazer a validação usando REGEX (Expressões Regulares).
	- Utilizado exemplo de regex para validar e-mails nos testes.

- [x]	5) O projeto deverá gerar um relatório de testes automaticamente.
	- Utilizadas algumas ferramentas de reports, o mocha e também o dashboard do cypress, além de vídeos e screenshots do próprio cypress.

- [x]	6) Implementar pelo menos dois ambientes (desenvolvimento / homologação).
	- Implantados dois ambientes por pluguin, criado na pasta config dois ambientes, o PROD.SON e o QA.JSON, podendo definir um por padrão no arquivo index.js

- [x]	7) A massa de testes deve ser preparada neste projeto, seja com scripts carregando massa nova no BD ou com restore de banco de dados.
	- Realizado conexão com banco de dados mysql e utilizado métodos after e bofore para popular ou limpar a massa de dados durante os testes.

- [x]	8) Executar testes em paralelo. Pelo menos duas threads (25 testes cada).
	- Foi utilizado uma biblioteca para criar as threads e um script para rodar os testes em paralelo, pode ser verificado no arquivo package.json
	- "cy:run": "cypress-parallel -s cy:run -t 1 -d cypress/integration -a '\"--config baseUrl=http://localhost:8989\"'

- [x]	9)Testes deverão ser agendados pelo Jenkins, CircleCI, TFS ou outra ferramenta de CI que preferir.
	- Foi utilizado o Azure Devops, conforme pode ser visto no projeto.
