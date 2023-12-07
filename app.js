/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

'use strict';
const express = require('express');
const path = require("path");
const bodyParser = require('body-parser');
const querystring = require('querystring');
const expressNunjucks = require('express-nunjucks').default;

// Constants
const PORT = 3000;
const HOST = '161.35.221.182';

// App
const app = express();

// setup views
app.set('views', './views');

// setup nunjucks
const njk = expressNunjucks(app, {
  watch: true,
  noCache: true,
});

// path and bodyparse configuration
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// main data array
var data = new Array();

// root endpoint
app.get('/', (req, res) => {

  console.log(data);

  res.render('index', {
    "data": data
  });
});

// endpoint for data store
app.post('/data', (req, res) => {  
  let requestData = req.body;
 
  updateOrAddObject(data, requestData);

  console.log(data);

  res.send('Data Received: ' + JSON.stringify(requestData));
});

// endpoint for data store
app.get('/data', (req, res) => {  
  let requestData = new Array();
  requestData['id'] = req.query.id;
  requestData['light'] = req.query.light;
  requestData['button'] = req.query.button;
 
  updateOrAddObject(data, requestData);

  console.log(data);

  res.json("{'success': 'true'}");
});

// endpoint for data reset
app.get('/reset', (req, res) => {  
  data = [];

  res.send('Polje je resetirano!');
});

// update or add object
function updateOrAddObject(array, object) {
  const index = array.findIndex(item => item.id === object.id);

  if (index !== -1) {
      // Replace the existing object
      array[index] = object;
  } else {
      // Add new object as it does not exist
      array.push(object);
  }
}

app.listen(PORT, HOST);

module.exports = app;
