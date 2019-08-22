const express = require('express');
const app = express();
const port = process.env.PORT || 80;
const logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const compilerRoute = require('./routes/compiler');

app.use(cors());
app.use(logger('dev'));

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '350mb' }));

app.use('/compile', compilerRoute);

app.use(express.static('public'));

app.get('/', (req, res, next) => {
    res.setHeader('content-type', 'text/html');
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

app.listen(port, () => {
    console.log('success', '[app] Server running on port ' + port);
})
  