
const express = require('express');
const cors = require('cors');

const db = require('./db/connection');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            charactersRoutes: '/api/characters',
            moviesRoutes: '/api/movies',
            seriesRoutes: '/api/series',
            authRoutes: '/auth'
        }
        this.dbConnection();
        this.middlewares();
        this.routes();
    }

     async dbConnection () {
        
        try {

            await db.authenticate();
            console.log('dbOnline');

        } catch (error) {
            throw new Error(error);
        }
    }

    middlewares() {
        
        this.app.use(cors());
        
        this.app.use(express.json());

    }

    routes() {
        this.app.use(this.paths.charactersRoutes, require('./routes/characters.routes'));
        this.app.use(this.paths.moviesRoutes, require('./routes/movies.routes'));
        this.app.use(this.paths.seriesRoutes, require('./routes/series.routes'));
        this.app.use(this.paths.authRoutes, require('./routes/auth.routes'));
    }

    listen () {
        this.app.listen(this.port, () => {
            console.log('Servidor escuchando en el puerto: ', this.port);
        });
    }
}

module.exports = Server;