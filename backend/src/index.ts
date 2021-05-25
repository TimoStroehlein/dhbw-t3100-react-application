import express from 'express';
import {router} from './routes';
import cors from 'cors'

const app = express();
const port = 8080;  // Default port to listen

// support POST JSON bodies
var bodyParser = require('body-parser')
app.use( bodyParser.json() ); 
app.use(express.json());

app.use(cors());
app.use('/rest/api/v1', router);

// Start the Express server
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
