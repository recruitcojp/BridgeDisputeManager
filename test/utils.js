const testTransferTx = require('./data/checkTransferTx.json');

class TestData {
  constructor(_accounts) {
    this.accounts = _accounts;
  }

  getTransferTxData(index) {
    return testTransferTx[index];
  }

}

exports.TestData = TestData;
