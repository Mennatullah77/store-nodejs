const bcrypt = require('bcrypt')


// GET Setup Page
exports.getSetup = (req, res, next) => {
    const db = req.app.db;
    if (!db) {
        return next(new Error('Database not initialized'));
    }

    db.users.countDocuments()
        .then(userCount => {
            if (userCount === 0) {
                return res.render('setup', { title: 'Setup' });
            }
            return res.redirect('/admin/login');
        })
        .catch(next); // Error handling
}



exports.postSetup = (req, res, next) => {
    const db = req.app.db;
    const doc = {
        usersName: req.body.usersName,
        userEmail: req.body.userEmail,
        userPassword: bcrypt.hashSync(req.body.userPassword, 10), // Use the hashed password here
        isAdmin: true,
        isOwner: true
    };

    // Check for existing users
    db.users.countDocuments({})
        .then(userCount => {
            if (userCount === 0) {
                // No users exist, insert the new admin user
                return db.users.insertOne(doc)
                    .then(() => {
                        res.status(200).json({ message: 'User account inserted' });
                    })
                    .catch(err => {
                        console.error(`Failed to insert user: ${err}`);
                        res.status(500).json({ message: 'Setup failed' });
                    });
            } else {
                // Users already exist
                res.status(400).json({ message: 'Already setup.' });
            }
        })
        .catch(err => {
            console.error(`Failed to check user count: ${err}`);
            res.status(500).json({ message: 'Setup failed' });
        });
}


// GET Admin Login Page
exports.getLogin = (req, res, next) => {
    res.render('login', {
        title: 'Login'
    });
}


exports.postLogin = (req, res, next) => {
    const db = req.app.db;
       

   db.users.findOne({userEmail : req.body.userEmail})
   .then(user => {
    if(!user || user === null){
        res.status(400).json({message : 'A user with that email does not exist.'})
        return;
    }
    bcrypt.compare( req.body.userPassword ,user.userPassword)
    .then(result => {
        if(result){
            res.redirect('/admin/dashboard')
            res.status(400).json({message: 'Login Successfull'})
            return;
        }
        else{
            res.status(400).json({message: 'Check password and try again'})
        }
    })
   })

}


exports.dashboard = (req , res , next) => {
    res.render('dashboard' , {
        title : "Admin Dashboard"
    })
}