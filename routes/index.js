const express = require('express');
const router = express.Router();
const faqRoutes = require("./faq.router");

const routes = [
    {
        path: "/faq",
        route: faqRoutes,
    }
];

routes.map((obj) => {
    router.use(obj.path, obj.route);
});

module.exports = router;