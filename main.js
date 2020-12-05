const { response } = require('express');
const express = require('express');
const app = express();
app.listen(3000, () => console.log('listening at 3000'));

// Host the site
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

// NEED THE SURVEY & THE Data Analysis INFO, ALSO POST API KEY
app.post('/userData', (request, response) => {
    console.log(request.body);
    response.json({
        status: 'success'
    });
});