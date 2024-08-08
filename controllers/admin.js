const bcrypt = require('bcrypt')

exports.getSetup = (req, res, next) => {
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
}


exports.postSetup = (req , res , next) => {
    const db = req.app.db;

    const doc = {
        usersName: req.body.usersName,
        userEmail: req.body.userEmail,
        userPassword: bcrypt.hashSync(req.body.userPassword, 10),
        isAdmin: true,
        isOwner: true
    };

    // check for users
    db.users.countDocuments({}).then( userCount => {
    if(userCount === 0){
        // email is ok to be used.
        return  db.users.insertOne(doc)
    }})
    .then(() => {
        res.status(200).json({ message: 'User account inserted' });
    })
    .catch(err => {
        console.error(colors.red(`Failed to insert user: ${err}`));
            res.status(200).json({ message: 'Setup failed' });
            return;
    })
            
    res.status(200).json({ message: 'Already setup.' });
}


exports.getAdminLogin = (req , res , next) => {
    res.render(
        'login', {
            title : 'Login'
        })
}