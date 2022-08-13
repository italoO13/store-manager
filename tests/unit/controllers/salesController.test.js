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

})