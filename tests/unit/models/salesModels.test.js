const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection');
const Sales = require('../../../models/Sales');

describe('quando é inserido novas vendas no banco de dados através da função "insertSales"', () => {

  describe('Quando é cadastrado corretamente', () => {
    const mockSales = [
      {
        "productId": 1,
        "quantity": 1
      },
      {
        "productId": 2,
        "quantity": 5
      }
    ]

    before(() => {
      sinon.stub(Sales, 'validateExistsProduct').resolves([false, false])
      sinon.stub(connection, 'execute').resolves([{ insertId: 1 }])
      sinon.stub(Sales, 'insertSalesProducts').resolves();
      })
      after(() => {
        connection.execute.restore();
        Sales.validateExistsProduct.restore();
        Sales.insertSalesProducts.restore();
      })

      it('deve retornar um array', async () => {
        const response = await Sales.insertSales(mockSales);
        expect(response).to.be.an('object');
      })
      it('deve conter um objeto com as chaves "id" e "itemsSold"', async () => {
        const response = await Sales.insertSales(mockSales);
        expect(response).to.have.a.property('id');
        expect(response).to.have.a.property('itemsSold');
      })
  });
  
  describe('Quando é cadastrado incorretamente', () => {
    const mockSales = [
      {
        "productId": 800,
        "quantity": 1
      },
      {
        "productId": 2,
        "quantity": 5
      }
    ]

    before(() => {
      sinon.stub(Sales, 'validateExistsProduct').resolves([true])
    })
    after(() => {
      Sales.validateExistsProduct.restore();
    })

    it('deve retornar um false', async () => {
      const response = await Sales.insertSales(mockSales);
      expect(response).to.be.equal(false)
    })
  });
  })