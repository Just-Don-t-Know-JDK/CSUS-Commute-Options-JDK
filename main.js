const { response } = require('express');
const express = require('express');
const Datastore = require('nedb');
const app = express();
app.listen(3000, () => console.log('listening at 3000'));

// Host the site
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

// Init the commute info db and survey db
const commuteInfoDB = new Datastore('commuteInfo.db');
const surveyDB = new Datastore('survey.db');
commuteInfoDB.loadDatabase();
surveyDB.loadDatabase();

// receive survey data for survey.db
app.post('/survey', (request, response) => {
    // stuff goes here for the survey responses...
});

// receive the commute info data for commuteInfo.db
app.post('/userData', (request, response) => {
    console.log(request.body);
    commuteInfoDB.insert(request.body);
    response.json({
        status: 'success'
    });
});