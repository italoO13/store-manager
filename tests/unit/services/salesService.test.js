const { expect } = require('chai');
const sinon = require('sinon');
const Sales = require('../../../models/Sales');
const salesServices = require('../../../services/sales.service');

describe('Testa a camada de service da rota sales', () => {
  describe('quando é requisitado todos os produtos através da função "insertSales"', () => {

    describe('se as informações forem inseridas corretamente', () => {
      before(() => {
        response = {
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

        sinon.stub(Sales, 'insertSales').resolves(response)
      })
      after(() => {
        Sales.insertSales.restore();
      })

      it('deve retornar um array', async () => {
        const response = await salesServices.insertSales();
        expect(response).to.be.an('object');
      })

      it('deve ser igual ao objeto esperado', async () => {
        const response = await salesServices.insertSales();
        expect(response).to.deep.equal({
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
        })
      })
    })

    describe('se já existir uma venda cadastrada', () => {
      before(() => {
        response = false;
        sinon.stub(Sales, 'insertSales').resolves(response)
      })
      after(() => {
        Sales.insertSales.restore();
      })

      it('deve retornar false', async () => {
        expect(await salesServices.insertSales()).to.be.equal(false);
      })

    })

  })

})