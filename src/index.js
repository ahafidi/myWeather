// @flow

const callWeatherApi: any = require('../src/call_weather_api');

const weatherWebhook = (req: Object, res: Object): Promise<void> => {
  const city: string = req.body.result.parameters['geo-city'];
  const { date }: { date: string } = req.body.result.parameters;

  return callWeatherApi(city, date)
    .then((output: string) => {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({
        speech: output,
        displayText: output,
      }));
    })
    .catch((error: string) => {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({
        speech: error,
        displayText: error,
      }));
    });
};

module.exports = { weatherWebhook };
