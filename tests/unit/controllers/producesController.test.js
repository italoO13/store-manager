const sinon = require('sinon');
const { expect } = require('chai');

const productsServices = require('../../../services/products.service');
const productsController = require('../../../controllers/products.controller');

describe('Verifica funcionanmento da rotas de controller', () => {
  describe('VErifica o correto funcionamento da função getProductsAll', () => {
    describe('Quando é retornado os dados com sucesso', () => {
      const response = {};
      const request = {};
      dt = [{
        "id": 1,
        "name": "Martelo de Thor",
      }]
      before(() => {
        request.body = {}
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns()
        sinon.stub(productsServices, 'getProductsAll').resolves(dt)
      })
      after(() => {
        productsServices.getProductsAll.restore();
      })

      it('é chamado o status com o código 200', async() => {
        await productsController.getProductsAll(request, response);
        expect(response.status.calledWith(200)).to.be.equal(true);
        expect(response.json.calledWith(dt)).to.be.equal(true);
      })
    })

  })

  describe('VErifica o correto funcionamento da função getProductsId', () => {
    describe('Quando é retornado os dados com sucesso', () => {
      const response = {};
      const request = {};
      dt = {
        "id": 1,
        "name": "Martelo de Thor",
      }
      before(() => {
        request.body = {}
        request.params = {id: 1}
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns()
        sinon.stub(productsServices, 'getProductById').resolves(dt)
      })
      after(() => {
        productsServices.getProductById.restore();
      })

      it('é chamado o status com o código 200 e o objeto esperado', async () => {
        await productsController.getProductById(request, response);
        expect(response.status.calledWith(200)).to.be.equal(true);
        expect(response.json.calledWith(dt)).to.be.equal(true);
      })
    })

  })

  describe('Verifica o correto funcionamento da função postInsertProduct', () => {
    const response = {};
    const request = {};
    dt = [{
      "id": 1,
      "name": "Martelo de Thor",
    }]
    before(() => {
      request.body = {name: "teste"}
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns()
      sinon.stub(productsServices, 'insertProduct').resolves(dt)
    })
    after(() => {
      productsServices.insertProduct.restore();
    })

    it('é chamado o status com o código 200', async () => {
      await productsController.postInsertProduct(request, response);
      expect(response.status.calledWith(201)).to.be.equal(true);
      expect(response.json.calledWith(dt)).to.be.equal(true);
    })
  })

  describe('Verifica o correto funcionamento da função updateProduct', () => {
    describe('Quando é encontrado um produto', () => {
      const response = {};
      const request = {};
      dt = {
        "id": 1,
        "name": "teste",
      }
      before(() => {
        request.body = { name: "teste" }
        request.params = {id:1}
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns()
        sinon.stub(productsServices, 'updateProduct').resolves(dt)
      })
      after(() => {
        productsServices.updateProduct.restore();
      })
  
      it('é chamado o status com o código 200', async () => {
        await productsController.updateProduct(request, response);
        expect(response.status.calledWith(200)).to.be.equal(true);
        expect(response.json.calledWith(dt)).to.be.equal(true);
      })
    })

    describe('Quando não é encontrado um novo produto', () => {
      const response = {};
      const request = {};
      const dt = {message: 'Product not found'}
      before(() => {
        request.body = { name: "teste" }
        request.params = { id: 1 }
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns()
        sinon.stub(productsServices, 'updateProduct').resolves(false)
      })
      after(() => {
        productsServices.updateProduct.restore();
      })

      it('é chamado o status com o código 404', async () => {
        await productsController.updateProduct(request, response);
        expect(response.status.calledWith(404)).to.be.equal(true);
        expect(response.json.calledWith(dt)).to.be.equal(true);
      })
    })

  })

  describe('Verifica o correto funcionamento da função deleteProduct', () => {
    describe('Quando é encontrado um produto', () => {
      const response = {};
      const request = {};
      before(() => {
        request.body = { }
        request.params = { id: 1 }
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns()
        sinon.stub(productsServices, 'deleteProduct').resolves(true)
      })
      after(() => {
        productsServices.deleteProduct.restore();
      })

      it('é chamado o status com o código 204', async () => {
        await productsController.deleteProduct(request, response);
        expect(response.status.calledWith(204)).to.be.equal(true);
      })
    })

    describe('Quando não é encontrado um novo produto', () => {
      const response = {};
      const request = {};
      const dt = { message: 'Product not found' }
      before(() => {
        request.body = {}
        request.params = { id: 1 }
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns()
        sinon.stub(productsServices, 'deleteProduct').resolves(false)
      })
      after(() => {
        productsServices.deleteProduct.restore();
      })

      it('é chamado o status com o código 404', async () => {
        await productsController.deleteProduct(request, response);
        expect(response.status.calledWith(404)).to.be.equal(true);
        expect(response.json.calledWith(dt)).to.be.equal(true);
      })
    })

  })

})