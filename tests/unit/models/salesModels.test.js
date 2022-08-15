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
  
describe('quando é requisitado as informações de vendas no banco de dados através da função getSalesAll', () => {
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

      sinon.stub(connection, 'execute').resolves([mock]);
    })
    after(() => {
      connection.execute.restore();
    })
    it('verifica que é retornado um objeto', async() => {
      const response = await Sales.getSalesAll();
      expect(response).to.be.an('array');
    })
    it('verifica que é retornado um objeto igual ao resperado', async () => {
      const response = await Sales.getSalesAll();
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
  describe('quando a função não encontra nenhuma venda no bd', () => {
    before(() => {
      const mock = []

      sinon.stub(connection, 'execute').resolves([mock]);
    })
    after(() => {
      connection.execute.restore();
    })
    it('verica que a função retorna false', async() => {
      const response = await Sales.getSalesAll();
      expect(response).to.equal(false);
    })
  })
})

describe('quando é requisitado as informações de vendas no banco de dados através da função getSalesId', () => {
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

      sinon.stub(connection, 'execute').resolves([mock]);
    })
    after(() => {
      connection.execute.restore();
    })
    it('verifica que é retornado um objeto', async () => {
      const response = await Sales.getSalesById();
      expect(response).to.be.an('array');
    })
    it('verifica que é retornado um objeto igual ao resperado', async () => {
      const response = await Sales.getSalesAll();
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
  describe('quando a função não encontra nenhuma venda no bd', () => {
    before(() => {
      const mock = []

      sinon.stub(connection, 'execute').resolves([mock]);
    })
    after(() => {
      connection.execute.restore();
    })

    it('verica que a função retorna false', async () => {
      const response = await Sales.getSalesById();
      expect(response).to.equal(false);
    })
  })
})