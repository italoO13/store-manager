const { expect } = require('chai');
const sinon = require('sinon');
const Sales = require('../../../models/Sales');
const salesServices = require('../../../services/sales.service');

describe('Testa a camada de service da rota sales', () => {
  describe('quando é inserido uma nova venda através da função "insertSales"', () => {

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
  describe('quando é requisitado as informações de vendas através da função getSalesAll', () => {
    describe('quando a função retorna as vendas corretamente', () => {
      before(() => {
        const mock = [
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

        sinon.stub(Sales, 'getSalesAll').resolves(mock);
      })
      after(() => {
        Sales.getSalesAll.restore();
      })
      it('verifica que é retornado um objeto', async () => {
        const response = await salesServices.getSalesAll();
        expect(response).to.be.an('array');
      })
      it('verifica que é retornado um objeto igual ao resperado', async () => {
        const response = await salesServices.getSalesAll();
        expect(response).to.deep.equal(
          [
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
        );
      })
    });
    describe('quando a função não encontra nenhuma venda', () => {
      before(() => {
        const mock = false;

        sinon.stub(Sales, 'getSalesAll').resolves(mock);
      })
      after(() => {
        Sales.getSalesAll.restore();
      })

      it('verica que a função retorna false', async () => {
        const response = await salesServices.getSalesAll();
        expect(response).to.equal(false);
      })
    })
  })
  describe('quando é requisitado as informações de vendas através da função getSalesById', () => {
    describe('quando a função retorna as vendas corretamente', () => {
      before(() => {
        const mock = [
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

        sinon.stub(Sales, 'getSalesById').resolves(mock);
      })
      after(() => {
        Sales.getSalesById.restore();
      })
      it('verifica que é retornado um objeto', async () => {
        const response = await salesServices.getSalesById();
        expect(response).to.be.an('array');
      })
      it('verifica que é retornado um objeto igual ao resperado', async () => {
        const response = await salesServices.getSalesById();
        expect(response).to.deep.equal(
          [
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
        );
      })
    });
    describe('quando a função não encontra nenhuma venda', () => {
      before(() => {
        const mock = false;

        sinon.stub(Sales, 'getSalesById').resolves(mock);
      })
      after(() => {
        Sales.getSalesById.restore();
      })

      it('verica que a função retorna false', async () => {
        const response = await salesServices.getSalesById();
        expect(response).to.equal(false);
      })
    })
  })
})