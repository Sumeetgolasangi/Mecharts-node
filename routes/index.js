const express = require('express')
const homeRoute = require('./home.routes');
const router = express.Router();

const defaultRoutes = [
    {
        path:'/',
        route:homeRoute
    }
]

defaultRoutes.forEach((route) => {
	router.use(route.path, route.route);
});

module.exports = router;