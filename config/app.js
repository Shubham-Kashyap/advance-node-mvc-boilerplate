
const { connectWithDatabase } = require('./db');
const chalk = require("chalk");
const Router = require('../routes');

/**
 * ---------------------------------------------------------------
 * Application class
 * ---------------------------------------------------------------
 * applcation setup 
 */
class Application {

    constructor(port, express) {
        this.port = port;
        this.app = express();
        this.express = express;
    }

    /**
     * ---------------------------------------------------------------
     * start application
     * ---------------------------------------------------------------
     * Load and boot our application with config settings
     */
    start = () => {
        this.#listen();
        this.#displayIncommingRequest();/** comment it later */
        this.#setupRoutes();
        this.#connectWithDatabase();

    }


    /**
     * ---------------------------------------------------------------
     * Listen to the port
     * ---------------------------------------------------------------
     */
    #listen = () => {

        this.app.listen(this.port, () => {
            console.log(chalk.yellow.bold('Server is running on port :'), chalk.cyan.bold(this.port));
        });
    }


    /**
     * ---------------------------------------------------------------
     * Connect with the database
     * ---------------------------------------------------------------
     */
    #connectWithDatabase = () => {
        connectWithDatabase();
    }


    /**
     * ---------------------------------------------------------------
     * Display incomming requests
     * ---------------------------------------------------------------
     */
    #displayIncommingRequest = () => {
        this.app.use((req, res, next) => {
            // For example, a GET request to `/test` will print "GET /test"
            var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
            console.log(chalk.yellow(`${req.method} : ${fullUrl}`));
            next();
        });

    }


    /**
     * ---------------------------------------------------------------
     * Setup routes
     * ---------------------------------------------------------------
     */
    #setupRoutes = () => {
        // this.app.use(express)
        this.app.use(this.express.json());
        this.app.use(this.express.urlencoded({
            extended: true
        }));
        const router = new Router(this.express);
        router.create(this.app);

    }
}

module.exports = Application;