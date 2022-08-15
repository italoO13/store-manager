const sinon = require('sinon');
const { expect } = require('chai');

const salesServices = require('../../../services/sales.service');
const salesController = require('../../../controllers/sales.controller');

describe('Verifica funcionamento de controller da rota sales', () => {
  describe('VErifica o correto funcionamento da função insertSales', () => {
    describe('Quando é retornado os dados com sucesso', () => {
      const response = {};
      const request = {};
      const dt = {
        "id": 3,
        "itemsSold": [
          {
            "productId": 1,
            "quantity": 1
          },
          {
            "productId": 2,
            "quantity": 5
          }
        ]
      }
      before(() => {

        request.body = [
          {
            "productId": 1,
            "quantity": 1
          },
          {
            "productId": 2,
            "quantity": 5
          }
        ]
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns()
        sinon.stub(salesServices, 'insertSales').resolves(dt)
      })
      after(() => {
        salesServices.insertSales.restore();
      })

      it('é chamado o status com o código 201', async () => {
        await salesController.insertSales(request, response);
        expect(response.status.calledWith(201)).to.be.equal(true);
        expect(response.json.calledWith(dt)).to.be.equal(true);
      })
    })
    describe('Quando o produto não foi encontrado', () => {
      const request = {}
      const response = {}
      before(() => {
        request.body = {};
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns()
        sinon.stub(salesServices, 'insertSales').resolves(false);
      })
      after(() => {
        salesServices.insertSales.restore();
      })

      it('Retorna um error status 404 com a messagem Product not found', async() => {
        await salesController.insertSales(request, response);
        expect(response.status.calledWith(404)).to.be.equal(true);
        expect(response.json.calledWith({message:'Product not found'})).to.be.equal(true);
      })
    })
  })

  describe('VErifica o correto funcionamento da função getSalesAll', () => {
    describe('Quando é retornado os dados com sucesso', () => {
      const response = {};
      const request = {};
      const dt = [
        {
          "saleId": 1,
          "date": "2021-09-09T04:54:29.000Z",
          "productId": 1,
          "quantity": 2
        },
        {
          "saleId": 1,
          "date": "2021-09-09T04:54:54.000Z",
          "productId": 2,
          "quantity": 2
        }]
      
      before(() => {

        request.body = {}

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns()
        sinon.stub(salesServices, 'getSalesAll').resolves(dt)
      })
      after(() => {
        salesServices.getSalesAll.restore();
      })

      it('é chamado o status com o código 201', async () => {
        await salesController.getSalesAll(request, response);
        expect(response.status.calledWith(200)).to.be.equal(true);
        expect(response.json.calledWith(dt)).to.be.equal(true);
      })
    })
    describe('Quando o produto não foi encontrado', () => {
      const request = {}
      const response = {}
      before(() => {
        request.body = {};
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns()
        sinon.stub(salesServices, 'getSalesAll').resolves(false);
      })
      after(() => {
        salesServices.getSalesAll.restore();
      })

      it('Retorna um error status 404 com a messagem Product not found', async () => {
        await salesController.getSalesAll(request, response);
        expect(response.status.calledWith(404)).to.be.equal(true);
        expect(response.json.calledWith({ message: 'Sale not found' })).to.be.equal(true);
      })
    })
  })

  describe('VErifica o correto funcionamento da função getSalesById', () => {
    describe('Quando é retornado os dados com sucesso', () => {
      const response = {};
      const request = {};
      const dt = [
        {
          "date": "2021-09-09T04:54:29.000Z",
          "productId": 1,
          "quantity": 2
        },
        {
          "date": "2021-09-09T04:54:54.000Z",
          "productId": 2,
          "quantity": 2
        }]

      before(() => {

        request.body = {}
        request.params = {id:1}
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns()
        sinon.stub(salesServices, 'getSalesById').resolves(dt)
      })
      after(() => {
        salesServices.getSalesById.restore();
      })

      it('é chamado o status com o código 200', async () => {
        await salesController.getSalesById(request, response);
        expect(response.status.calledWith(200)).to.be.equal(true);
        expect(response.json.calledWith(dt)).to.be.equal(true);
      })
    })
    describe('Quando o produto não foi encontrado', () => {
      const request = {}
      const response = {}
      request.params = { id: 1 }
      before(() => {
        request.body = {};
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns()
        sinon.stub(salesServices, 'getSalesById').resolves(false);
      })
      after(() => {
        salesServices.getSalesById.restore();
      })

      it('Retorna um error status 404 com a messagem Product not found', async () => {
        await salesController.getSalesById(request, response);
        expect(response.status.calledWith(404)).to.be.equal(true);
        expect(response.json.calledWith({ message: 'Sale not found' })).to.be.equal(true);
      })
    })
  })

})