const express = require('express');
const router = express.Router();

router.get('/setup', (req, res, next) => {
    const db = req.app.db;
    if (!db) {
        return next(new Error('Database not initialized'));
    }

    db.users.countDocuments().then(userCount => {
        if (userCount === 0) {
            return res.render('setup', {
                title: 'Setup'
            });
        }
        return res.redirect('/admin/login');
    }).catch(next); // Add error handling
});

module.exports = router;
