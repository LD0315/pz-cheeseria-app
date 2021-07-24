import express = require('express');
import apiRouter from './routes';

const app = express();
const bodyParser = require("body-parser");

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(apiRouter);

var puchasedItems = [] as any[];


  apiRouter.get('/api/recents', (request, response) => {
      response.json(puchasedItems);
  });


  apiRouter.post('/api/purchase',(request, response) => {
    //code to perform particular action.
    //To access POST variable use req.body()methods.
    console.log("HELLO WORLD");
    //console.log("test",request.body);
    request.body.items.forEach((element:any) => {
        puchasedItems.push({date:new Date(), item:element});
    });
    });
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port: ${port}`));