const mock = require('mock-require');

const chai = require('chai');

chai.should();

const sinon = require('sinon');

let { weatherWebhook } = require('../src/index');

describe('Test the entry point of the weather webhook', () => {
  const req = {
    body: {
      result: {
        parameters: {
          'geo-city': 'Paris',
        },
      },
    },
  };

  it('should called once the _setHeader_ method of the response when the promise is fulfilled', (done) => {
    mock('../src/call_weather_api', sinon.stub().resolves('success'));

    ({ weatherWebhook } = mock.reRequire('../src/index'));

    const res = {
      setHeader: sinon.spy(),
      send: sinon.spy(),
    };

    weatherWebhook(req, res)
      .then(() => {
        res.setHeader.calledOnce.should.be.true;
        res.setHeader.calledTwice.should.be.false;

        done();
      })
      .catch((e) => {
        done(e);
      });
  });

  it('should called once the _setHeader_ method of the response when the promise is rejected', (done) => {
    mock('../src/call_weather_api', sinon.stub().rejects('fail'));

    ({ weatherWebhook } = mock.reRequire('../src/index'));

    const res = {
      setHeader: sinon.spy(),
      send: sinon.spy()
    };

    weatherWebhook(req, res)
      .then(() => {
        res.setHeader.calledOnce.should.be.true;
        res.setHeader.calledTwice.should.be.false;

        done();
      })
      .catch((e) => {
        done(e);
      });
  });

  it('should called once the _send_ method of the response when the promise is fulfilled', (done) => {
    mock('../src/call_weather_api', sinon.stub().resolves('success'));

    ({ weatherWebhook } = mock.reRequire('../src/index'));

    const res = {
      setHeader: sinon.spy(),
      send: sinon.spy(),
    };

    weatherWebhook(req, res)
      .then(() => {
        res.send.calledOnce.should.be.true;
        res.send.calledTwice.should.be.false;

        done();
      })
      .catch((e) => {
        done(e);
      });
  });

  it('should called once the _send_ method of the response when the promise is rejected', (done) => {
    mock('../src/call_weather_api', sinon.stub().rejects('fail'));

    ({ weatherWebhook } = mock.reRequire('../src/index'));

    const res = {
      setHeader: sinon.spy(),
      send: sinon.spy(),
    };

    weatherWebhook(req, res)
      .then(() => {
        res.send.calledOnce.should.be.true;
        res.send.calledTwice.should.be.false;

        done();
      })
      .catch((e) => {
        done(e);
      });
  });
});
