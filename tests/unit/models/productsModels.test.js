const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection');
const Products = require('../../../models/Products');

describe('Testa a camada de models da rota products', () => {
  describe('quando é requisitado todos os produtos através da função "getProductsAll"', () => {
    
    describe('se encontrar algum produto', () => {
      before(() => {
        response = [{
          "id": 1,
          "name": "Martelo de Thor",
        }]
        sinon.stub(connection, 'execute').resolves([response])
      })
      after(() => {
        connection.execute.restore();
      })

      it('deve retornar um array', async () => {
        const response = await Products.getProductsAll();
        expect(response).to.be.an('array');
      })
      it('deve conter um objeto com as chaves "id" e "name"', async () => {
        const response = await Products.getProductsAll();
        expect(response[0]).to.have.a.property('id');
        expect(response[0]).to.have.a.property('name');
      })
      it('deve retornar o objeto com as informações corretas', async () => {
        const response = await Products.getProductsAll();
        expect(response[0]).to.deep.equal({
          "id": 1,
          "name": "Martelo de Thor",
        })
      })

    });

    describe('se não encontrar nenhum produto', () => {
    
      before(() => {
        response = []
        sinon.stub(connection, 'execute').resolves([response])
      })
      after(() => {
        connection.execute.restore();
      })

      it('deve retornar false', async () => {
        const response = await Products.getProductsAll();
        expect(response).to.be.a('boolean');
        expect(response).to.equal(false);
      })
    });
  })


  describe('Quando é requisitado apenas um produto através da função "getProductById"', () => {
    describe('se encontrar algum produto', () => {
      before(() => {
        response = [{
          "id": 1,
          "name": "Martelo de Thor",
        }]
        sinon.stub(connection, 'execute').resolves([response])
      })

      after(() => {
        connection.execute.restore();
      })
      it('deve retornar um objeto', async () => {
        response = await Products.getProductById(1);
        expect(response).to.be.an('object')
      })
      it('se o objeto é igual ao esperado', async () => {
        response = await Products.getProductById(1);
        expect(response).to.deep.equal({
          "id": 1,
          "name": "Martelo de Thor",
        })
      })
    });
    describe('se não encontrar nenhum produto', () => {
      before(() => {
        response = []
        sinon.stub(connection, 'execute').resolves([response])
      })
      after(() => {
        connection.execute.restore();
      })

      it('deve retornar false', async () => {
        response = await Products.getProductById(88);
        expect(response).to.be.equal(false);
      })
    })
  })


  describe('Quando é feito uma requisição para um novo produto através da função "insertProduct"', () => {
    before(() => {
      const response = {
        "insertId": 1
      };
      sinon.stub(connection, 'execute').resolves([response])
    })
    after(() => {
      connection.execute.restore();
    })

    it('deve retornar um array', async () => {
      const response = await Products.insertProduct('italo');
      expect(response).to.be.an('object');
    })
    it('deve conter um objeto com as chaves "id e name"', async () => {
      const response = await Products.insertProduct('italo');
      expect(response).to.have.a.property('id');
      expect(response).to.have.a.property('name');
    })
    it('deve retornar o objeto com as informações corretas', async () => {
      const response = await Products.insertProduct('italo');
      expect(response).to.deep.equal({
        "id": 1,
        name:'italo'
      })
    })
  });







});