const { expect } = require('chai');
const sinon = require('sinon');
const Products = require('../../../models/Products');
const productsService = require('../../../services/products.service');
const CustomError = require('../../../errors/customError')

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
        // expect(await productsService.getProductsAll()).to.have.throw(new CustomError(404, "Product not found"));

      })

    })
  })

  describe('quando é inserido um novo produto através da função "insertProduct"', () => {
    before(() => {
      response = {
        id: 1,
        name:"teste"
      };
      sinon.stub(Products, 'insertProduct').resolves(response)
    })
    after(() => {
      Products.insertProduct.restore();
    })

    it('retorna um objeto com o id  e nome do produto', async () => {
      const response = await productsService.insertProduct('teste');
      expect(response).to.deep.equal({
        id: 1,
        name: "teste"
      })
    })

  })


})