
const bcrypt = require('bcrypt');


    exports.getSignup = (req, res, next) => {
        return res.render('index/customer-signup', 
            { title: 'Signup',
              session : req.session 
             }); 
    }
    
    
    //POST Admin Setup
    exports.postSignup = (req, res, next) => {
        const db = req.app.db;
        const doc = {
            firstName: req.body.firstName,
            secondName: req.body.secondName,
            email: req.body.userEmail,
            password: bcrypt.hashSync(req.body.userPassword, 10), 
        };

        db.customers.insertOne(doc)
            .then(() => {
                res.redirect('/login');
            })
            .catch(err => {
                console.error(`Failed to insert customer: ${err}`);
                res.status(500).json({ message: 'Signup failed' });
            });
    } 
            
        
    
    
    // GET Admin Login Page
    exports.getLogin = (req, res, next) => {
                res.render('login', {
                    title: 'Login',
                    session: req.session
                });     
    }
    
    //POST Admin Login 
    exports.postLogin = (req, res, next) => {
        const db = req.app.db;
       db.customers.findOne({email : req.body.userEmail})
       .then(customer => {
        if(!customer || customer === null){
            res.status(400).json({message : 'A user with that email does not exist.'})
            return;
        }
        bcrypt.compare( req.body.userPassword ,customer.password)
        .then(result => {
            if(result){
                req.session.customerPresent = true;
                req.session.customerId = customer._id;
                req.session.customerEmail = customer.email;
                req.session.customerFirstname = customer.firstName;
                req.session.customerSecondname = customer.secondName;
                // req.session.customerCompany = customer.company;
                // req.session.customerAddress1 = customer.address1;
                // req.session.customerAddress2 = customer.address2;
                // req.session.customerCountry = customer.country;
                // req.session.customerState = customer.state;
                // req.session.customerPostcode = customer.postcode;
                // req.session.customerPhone = customer.phone;
                res.redirect('/')
                //res.status(400).json({message: 'Login Successfull'})
                return;
            }
            else{
                res.status(400).json({message: 'Check password and try again'})
            }
        })
       })
    }


    exports.logout = (req , res, next) => {
        req.session.customerPresent = false;
        req.session.customerId = "";
        req.session.customerEmail = "";
        req.session.customerFirstname = "";
        req.session.customerSecondname = "";
        res.redirect('/login')
    }


    
    
