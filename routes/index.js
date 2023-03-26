const apiRoutes = require("./apiRoutes")
const userController = require("../controllers/api/userController");


/**
 * ---------------------------------------------------------------
 * Router class
 * ---------------------------------------------------------------
 */
class Router {

    #routeGroups = [
        /** Include imported routes here  */
        apiRoutes,
    ];


    /**
     * ---------------------------------------------------------------
     * Router constructor
     * ---------------------------------------------------------------
     */
    constructor(express) {
        this.router = express.Router();

    }


    /**
     * ---------------------------------------------------------------
     * create 
     * ---------------------------------------------------------------
     * @param {*} app 
     */
    create(app) {
        this.#attachRoutes();
        this.#handleExceptions();
        app.use(this.router)
    }
    /**
     * --------------------------------------------------------------
     * Catch Error
     * --------------------------------------------------------------
     */
    #catchError(route) {
        return (req, res, next) => {
            route(req, res, next).catch(err => next(err))
        }

    }


    /**
     * ---------------------------------------------------------------
     * Attach routes
     * ---------------------------------------------------------------
     * Induct all defined routes in our application
     */
    #attachRoutes = () => {

        this.#routeGroups.forEach(({ group, routes }) => {
            routes.forEach(({ method, path, middleware, handler }) => {
                // console.log(`${prefix}${group.prefix}${path}`)   
                this.router[method](`${group.prefix ? group.prefix : ""}${path}`, middleware ? middleware : [], handler);
            });
        });
    }


    /**
     * ---------------------------------------------------------------
     * Handle exceptions
     * ---------------------------------------------------------------
     * Will handle exceptions
     */
    #handleExceptions = () => {
        this.router.use((err, req, res, next) => {
            err.statusCode = err.status || err.statusCode || 500;
            return res.status(err.statusCode).send({
                status: err.statusCode,
                message: err.message,
                stackTrace: err
            })
        })
    }
}


module.exports = Router;