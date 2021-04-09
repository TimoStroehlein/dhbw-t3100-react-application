import express from 'express';
import {router} from './routes';

const app = express();
// Default port to listen
const port = 8080;

app.use('/rest/api/v1', router);

// Start the Express server
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
