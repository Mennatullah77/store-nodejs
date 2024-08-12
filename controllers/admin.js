const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');


// GET Admin Setup Page
exports.getSetup = (req, res, next) => {
    const db = req.app.db;
    if (!db) {
        return next(new Error('Database not initialized'));
    }
    req.session.needsSetup = false;
    db.users.countDocuments()
        .then(userCount => {
            if (userCount === 0) {
                req.session.needsSetup = true;
                return res.render('setup', { title: 'Setup' });
            }
            req.session.needsSetup = false;
            return res.redirect('/admin/login');
        })
        .catch(next); // Error handling
}


//POST Admin Setup
exports.postSetup = (req, res, next) => {
    const db = req.app.db;
    const doc = {
        userName: req.body.userName,
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
    const db = req.app.db;
    db.users.countDocuments()
    .then(userCount => {
        if(userCount > 0){
            req.session.needsSetup = false;
            res.render('login', {
                title: 'Login'
            });
        }
        else{
            req.session.needsSetup = true;
            res.redirect('/admin/setup')
        }
    })

    
}

//POST Admin Login 
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
            req.session.user = req.body.userEmail;
            req.session.userName = user.userName;
            req.session.userId = user._id.toString();
            req.session.isAdmin = user.isAdmin;
            res.redirect('/admin/dashboard')
            //res.status(400).json({message: 'Login Successfull'})
            return;
        }
        else{
            res.status(400).json({message: 'Check password and try again'})
        }
    })
   })
}

//GET Admin Dashboard Page
exports.dashboard = (req , res , next) => {
    res.render('dashboard' , {
        title : "Admin Dashboard",
        session : req.session
    })
}

exports.getUsers = (req, res, next) => {
    const db = req.app.db;
    db.users.find().toArray()  // Convert the cursor to an array
        .then(users => {
            console.log(users[0].userEmail);
            if (users.length === 0) {
                console.log('No users found');
            }
            res.render('users', {
                title: "Users",
                users: users,
                session : req.session
            });
        })
        .catch(err => {
            console.error('Error fetching users:', err);
            res.status(500).render('500', {
                title: 'Server Error',
                error: 'An error occurred while fetching users.'
            });
        });
};


exports.getNewUser = (req , res , next) => {
    res.render('users-new' , {
        title : "Add new user",
        session : req.session
    
    })
}

exports.postNewUser = (req , res , next ) => {
    const db = req.app.db;
    const doc = {
        userName: req.body.userName,
        userEmail: req.body.userEmail,
        userPassword: bcrypt.hashSync(req.body.userPassword, 10), // Use the hashed password here
        isAdmin: false,
        isOwner: false
    };

        db.users.insertOne(doc)
        .then(() => {
        res.status(200).json({ message: 'User account inserted' });
        })
        .catch(err => {
        console.error(`Failed to insert user: ${err}`);
        res.status(500).json({ message: 'Setup failed' });
        });
            
        }

exports.getEditUser = (req , res , next) => {
    const db = req.app.db;
    const userId = req.params.userId
    db.users.findOne({_id : new ObjectId(userId)})
    .then(user => {
        if(!user){
            console.log("There is no user")
        }
        res.render('users-edit' , {
            title: "Edit User",
            user: user,
            session : req.session
        })
 })  
}


exports.postEditUser = (req , res , next) => {
    const db = req.app.db;
    const userId = req.body.userId
    const userDoc = {
        userName: req.body.userName,
        userEmail: req.body.userEmail,
        userPassword: bcrypt.hashSync(req.body.userPassword, 10), // Use the hashed password here
        isAdmin: false,
        isOwner: false
    };
    db.users.findOne({_id : new ObjectId(userId)})
    .then(() => {
        if(!product) {
            console.log('Product is not found!!')
        }
    })
    db.uers.updateOne({ _id: new ObjectId(userId) }, { $set: userDoc }, {})
        .then(product => {
            console.log("Product updated with ID:", userId);
            res.redirect(`/admin/user/edit/${userId}`);
        })
        .catch(err => {
            console.error(`Error updatinf document: ${err}`);
            res.status(400).json({ message: 'Error updating document' });
        });   
}

