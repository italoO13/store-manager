# Store Manager

API para uma loja de comércio eletrônico com endpoints de produtos e vendas utilizando:
  - Nodejs
  - Express
  - Docker e MySQL
  - Padrão REST com arquitetura MSC.
  -75% de cobertura de testes unitários com Mocha, chai e Sinnon

Para executar localmente, clone o repositório e execute os seguintes comandos:

```
$ docker-compose up -d
$ docker exec -it store_manager bash
$ npm run migration
$ npm start
$ npm run test:mocha
```

### Metodos de Produto

|Methodo|Rota|Descrição|
| ------ | ------ | ----- |
|get|/products|Retorna todos os produtos|
|get|/products/search?q=|Retorna os produtos que contenham a palavra pesquisada|
|get|/products/:id|Retorna um único produto a partir do id|
|post|/products|Cria um novo produto|
|put|/products/:id|Edita um produto a partir do id|
|delete|/products/:id|Apaga um produto a partir do id|

Formato de requisição para o POST e PUT:
```
{
  "name": "Pruduct"
}
```

### Metodos de Vendas

|Methodo|Rota|Descrição|
| ------ | ------ | ----- |
|get|/sales|Retorna todas as vendas|
|get|/sales/:id|Retorna uma única venda a partir do id|
|post|/sales|Cria uma nova venda|
|put|/sales/:id|Edita uma venda a partir do id|
|delete|/sales/:id|Apaga uma venda a partir do id|

Formato de requisição para o POST e PUT:
```
[
  {"productId": "1", "quantity": "3"}, 
  {"productId": "3", "quantity": "5"}
]

```
