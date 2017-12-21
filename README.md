*README - myWeather*

How to run it? Just input in your favourite command prompt:
```  
  $ export WWO_API_KEY=<YOUR-API-KEY>
  $ npm run dev
```

How to run the test suite? Thanks to the following command:
```
  $ npm run test
```

How to deploy on the Google Cloud Platform Function? Thanks to the following command:
```
  $ gcloud beta functions deploy weatherWebhook --entry-point weatherWebhook --stage-bucket <YOUR-BUCKET> --trigger-http
```
