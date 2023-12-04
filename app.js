/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

'use strict';
const express = require('express');
const path = require("path");
const bodyParser = require('body-parser');
const expressNunjucks = require('express-nunjucks').default;

// Constants
const PORT = 3000;
const HOST = '0.0.0.0';

// App
const app = express();

// setup
app.set('views', './views');

const njk = expressNunjucks(app, {
  watch: true,
  noCache: true,
});

app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

var data = new Array();

app.get('/', (req, res) => {

  console.log(data);

	res.render('index', {
		"data": data
	});
});

app.post('/data', (req, res) => {  
  let requestData = req.body;
 
  updateOrAddObject(data, requestData);

  console.log(data);

  res.send('Data Received: ' + JSON.stringify(data));
});

app.get('/reset', (req, res) => {  
  data = [];

  res.send('Polje je resetirano!');
});

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
