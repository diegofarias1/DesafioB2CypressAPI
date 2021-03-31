## Desafio testes de API - Cypress

- Arquitetura Projeto
	- Linguagem		- Javascript
	- Orquestrador de testes - 
	- Relatório de testes automatizados - 
	- Framework interação com API - 

## Metas

- [x]	1) Implementar 50 scripts de testes que manipulem uma aplicação cuja interface é uma API REST. 
				Foram criados 51 scripts de teste API localizados no caminho , cypress/integration

- [x]	2) Alguns scripts devem ler dados de uma planilha Excel para implementar Data-Driven.
				Criado um arquivo de exemplo de DDT no caminho cypress/integration/proects/proectsDataDriven.spec.s

- [x]	3) O projeto deve tratar autenticação.
				Tratado autenticação nos scripts de test.

- [x]	4) Pelo menos um teste deve fazer a validação usando REGEX (Expressões Regulares).
				Utilizado exemplo de regex para validar e-mails nos testes.

- [x]	5) O projeto deverá gerar um relatório de testes automaticamente.
				Utilizado algumas ferramentas de reports, o mocha e também o dashboard do cypress, além de videos e screenshots do proprio cypress.

- [x]	6) Implementar pelo menos dois ambientes (desenvolvimento / homologação).
				Implatado dois ambientes por pluguin, criado na pasta config dois ambientes, o PROD.SON e o QA.JSON, podendo definir um por padrão no arquivo index.js

- [x]	7) A massa de testes deve ser preparada neste projeto, seja com scripts carregando massa nova no BD ou com restore de banco de dados.
				Realizado conexão com banco de dados mysql e utilizado metodos after e bofore para popular ou limpar a massa de dados durante os testes.

- [x]	8) Executar testes em paralelo. Pelo menos duas threads (25 testes cada).
				Foi utilizado uma bilbioteca para criar as threads e um script para rodar os testes em paralelo, pode ser verificado no arquivo package.json
				"cy:run": "cypress-parallel -s cy:run -t 1 -d cypress/integration -a '\"--config baseUrl=http://localhost:8989\"' --config defaultCommandTimeout=10000 --reporter junit --reporter-options mochaFile=results/cypress-and-azure-devops-[hash].xml,toConsole=true",

- [x]	9)Testes deverão ser agendados pelo Jenkins, CircleCI, TFS ou outra ferramenta de CI que preferir.
				Foi utilizado o Azure Devops, conforme pode ser visto no projeto.