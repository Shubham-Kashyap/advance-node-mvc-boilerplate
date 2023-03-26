const express = require('express');
const Server = require("./config/app");
const port = process.env.PORT || 5000;


/**
 * ---------------------------------------------------------------
 * Boot application
 * ---------------------------------------------------------------
 * Load and boot our application with config settings
 */
const boot = () => {
    const app = new Server(port, express);
    app.start();
}


boot();