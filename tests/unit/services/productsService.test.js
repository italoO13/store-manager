const { expect } = require('chai');
const sinon = require('sinon');
const Products = require('../../../models/Products');
const productsService = require('../../../services/products.service');

describe('Testa a camada de service da rota products', () => {
  describe('quando é requisitado todos os produtos através da função "getProductsAll"', () => {

    describe('se encontrar algum produto', () => {
      before(() => {
        response = {
          "id": 1,
          "name": "Martelo de Thor",
        }
        sinon.stub(Products, 'getProductsAll').resolves([response])
      })
      after(() => {
        Products.getProductsAll.restore();
      })

      it('deve retornar um array', async () => {
        const response = await productsService.getProductsAll();
        expect(response).to.be.an('array');
      })

      it('deve ser um array com tamanho 1', async() => {
        const response = await productsService.getProductsAll();
        expect(response.length).to.be.equal(1);
      })
      it('deve ser igual ao objeto esperado', async() => {
        const response = await productsService.getProductsAll();
        expect(response[0]).to.deep.equal({
          "id": 1,
          "name": "Martelo de Thor",
        })
      })
    })
    describe('se não encontrar nenhum produto', () => {
      before(() => {
        response = false;
        sinon.stub(Products, 'getProductsAll').resolves(response)
      })
      after(() => {
        Products.getProductsAll.restore();
      })

      it('deve retornar um erro 404 com a a messagem Product not found', async() => {
        expect(await Products.getProductsAll()).to.have.throw;

      })

    })

  })

})