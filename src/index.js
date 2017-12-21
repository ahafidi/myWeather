// @flow

// import * as http from 'http';
const http: any = require('http');

const host: string = 'api.worldweatheronline.com';
const wwoApiKey: string = process.env.WWO_API_KEY || ''; // remember to set this env var below before running

function callWeatherApi(city: string, date: string) {
  return new Promise((resolve: Function, reject: Function) => {
    const path: string = `${'/premium/v1/weather.ashx?format=json&num_of_days=1&q='}${encodeURIComponent(city)}&key=${wwoApiKey}&date=${date}`;

    http.get({ host, path }, (res) => {
      let body = '';
      res.on('data', (chunk: string) => { body += chunk; }); // accumulate chunks
      res.on('end', () => { // called once all the chunks have been received
        const response: Object = JSON.parse(body);

        const forecast: Object = response.data.weather[0];
        const location: Object = response.data.request[0];

        const conditions: Object = response.data.current_condition[0];
        const currentConditions: string = conditions.weatherDesc[0].value;

        const output = `Current conditions in the ${location.type.toLowerCase()} of ${location.query} are ${currentConditions} with a projected high of ${forecast.maxtempC}°C or ${forecast.maxtempF}°F and a low of ${forecast.mintempC}°C or ${forecast.mintempF}°F on ${forecast.date}.`;

        resolve(output);
      });
      res.on('error', (error: string) => {
        reject(error);
      });
    });
  });
}

// export default function weatherWebhook(req: any, res: any) {
exports.weatherWebhook = (req: Object, res: Object) => { // entry point + width subtyping
  const city: string = req.body.result.parameters['geo-city'];
  const { date }: { date: string } = req.body.result.parameters; // object de-structuring

  callWeatherApi(city, date)
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
