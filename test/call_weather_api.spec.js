const chai = require('chai');

chai.should();

let { callWeatherApi } = require('../src/call_weather_api');

describe('Test the callWeatherApi function [do not forget to export the right wwo key before]', () => {
  it('The output should be a string', (done) => {
    const now = new Date();
    const today = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`;
    callWeatherApi('Paris', today)
      .then((r) => {
        r.should.be.a.string;
        done();
      })
      .catch((e) => {
        done(e);
      });
  });

  it('The output should match the expected template', (done) => {
    const now = new Date();
    const today = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`;
    callWeatherApi('Paris', today)
      .then((r) => {
        r.should.be.a.string;
        r.should.to.match(/Current conditions in the city of Paris, France are Overcast with a projected high of [0-9]{1,}°C or [0-9][0-9]{1,}°F and a low of [0-9]{1,}°C or [0-9]{1,}°F on [0-9]{4}-[0-9]{2}-[0-9]{1,}/);
        done();
      })
      .catch((e) => {
        done(e);
      });
  });
});
