import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';

import mainRoutes from './routes/index.routes.js';
import conectMongoDB from './config/mongoose.js';


 class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.conectDB();
        this.middlewares();
        this.routes();
    }

    conectDB() {
        conectMongoDB();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
        this.app.use(bodyParser.json({ limit: '20mb' }));
        this.app.use(bodyParser.urlencoded({ extended: true, limit: '20mb' }));
    }

    routes() { 
        mainRoutes(this.app); 
    }

    listen() {
        this.app.listen(this.port, () => console.log(`Servidor corriendo en puerto ${this.port}`) );
    }
}

export default Server;