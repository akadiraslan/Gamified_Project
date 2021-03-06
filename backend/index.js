'use strict';
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');
const answerRoutes = require('./routes/answer-route');
const questionRoutes = require('./routes/question-route');
const reportRoutes = require('./routes/report-route');
const topicRoutes = require('./routes/topic-route');
const userRoutes = require('./routes/user-route');
const giftRoutes = require('./routes/gift-route');
const testRoutes = require('./routes/test-route')


const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use('/api', answerRoutes.routes);
app.use('/api', questionRoutes.routes);
app.use('/api', reportRoutes.routes);
app.use('/api', topicRoutes.routes);
app.use('/api', userRoutes.routes);
app.use('/api', giftRoutes.routes);
app.use('/api', testRoutes.routes);

app.listen(config.port, () => console.log('App is listening on url http://localhost:' + config.port));


