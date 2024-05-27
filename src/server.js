import express from 'express';
import configViewEngine from './config/viewEngine';
import initWebRoutes from './routes/web';
import initApiRoutes from './routes/api';
import configCors from './config/cors';
require('dotenv').config();
import connection from './config/connectDB';
import bodyParser from 'body-parser';

const app = express();

const PORT = process.env.PORT || 8080;

// config Cors
configCors(app);

// config engine
configViewEngine(app);

// test connection db
connection();

// config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// init web routes
initWebRoutes(app);

// init api routes
initApiRoutes(app);
app.listen(PORT, () => {
    console.log('Server running on port ' + PORT);
});
