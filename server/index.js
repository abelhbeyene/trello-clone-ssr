import express from 'express';
import Loadable from 'react-loadable'
import {connect} from 'mongoose'

import serverRenderer from './middleware/renderer';
import apiController from './api'

const PORT = 4000;
const path = require('path');

// initialize the application and create the routes
const app = express();
const router = express.Router();

// Connect to DB
connect('mongodb://localhost:27017/trelloCloneDB')

// root (/) should always serve our server rendered page
router.use('^/$', serverRenderer);

// other static resources should just be served as they are
router.use(express.static(
    path.resolve(__dirname, '..', 'build'),
    { maxAge: '30d' },
));


// APIs
apiController(app)

// tell the app to use the above rules
app.use(router);

// start the app
Loadable.preloadAll().then(() => {
    app.listen(PORT, (error) => {
        if (error) {
            return console.log('something bad happened', error);
        }
    })
})
