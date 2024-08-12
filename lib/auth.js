const ObjectId = require('mongodb').ObjectID;
const _ = require('lodash');

const restrictedRoutes = [
    { route: '/admin/product/new', response: 'redirect' },
    { route: '/admin/product/insert', response: 'redirect' },
    { route: '/admin/product/edit/:id', response: 'redirect' },
    { route: '/admin/product/edit', response: 'redirect' },
    { route: '/admin/product/delete/:id', response: 'redirect' },
    { route: '/admin/user/new', response: 'redirect' },
    { route: '/admin/user/edit/:id', response: 'redirect' },
    { route: '/admin/user/edit', response: 'redirect' },
    
];

const restrict = (req, res, next) => {
    checkLogin(req, res, next);
};

const checkLogin = async (req, res, next) => {
    const db = req.app.db;
    // if not protecting we check for public pages and don't checkLogin
    if(req.session.needsSetup === true){
        res.redirect('/admin/setup');
        return;
    }
    
    if(req.session.user){
        next();
        return;
    }
    res.redirect('/admin/login');
};

// Middleware to check for admin access for certain route
const checkAccess = (req, res, next) => {
    const routeCheck = _.find(restrictedRoutes, { route: req.route.path });

    // If the user is not an admin and route is restricted, show message and redirect to /admin
    if(req.session.isAdmin === false && routeCheck){
        if(routeCheck.response === 'redirect'){
            req.session.message = 'Unauthorised. Please refer to administrator.';
            req.session.messageType = 'danger';
            res.redirect('/admin/login');
            return;
        }
        if(routeCheck.response === 'json'){
            res.status(400).json({ message: 'Unauthorised. Please refer to administrator.' });
        }
    }else{
        next();
    }
};

module.exports = {
    restrict,
    checkLogin,
    checkAccess
};
