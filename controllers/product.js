const {convertBool , safeParseInt } = require('../lib/common')
const {ObjectId} = require('mongodb')

exports.getProducts = (req , res , next) => {
    const db = req.app.db;
    let products = []
    db.products.find().toArray()
    .then(products => {
        res.render('products' , {
            title: 'Products' ,
            products: products,
            session : req.session
        })  
    })
    
}

exports.getNewProduct = (req , res , next) => {
    res.render('product-new' , {
        title: 'Add new Product',
        session : req.session
    })
}

exports.postNewProduct = (req, res, next) => {
    console.log('I am here');
    const db = req.app.db;

    const doc = {
        productTitle: req.body.productTitle,
        productPrice: req.body.productPrice,
        productDescription: req.body.productDescription,
        productPublished: convertBool(req.body.productPublished),
        productAddedDate: new Date(),
        productStock: safeParseInt(req.body.productStock) || null,
    };


    db.products.insertOne(doc)
        .then(product => {
            const newId = product.insertedId;
            console.log("Product Added with ID:", newId);
            res.redirect(`/admin/product/edit/${newId}`);
        })
        .catch(err => {
            console.error(`Error inserting document: ${err}`);
            res.status(400).json({ message: 'Error inserting document' });
        });
};

exports.getEditProduct = (req, res, next) => {
    const db = req.app.db;
    const productId = req.params.productId; // Fixed typo

    db.products.findOne({ _id:  new ObjectId(productId) })
        .then(product => {
            if (!product) {
                return res.status(404).render('404', { // Assuming you have a 404 template
                    pageTitle: 'Product Not Found'
                });
            }
            res.render('product-edit', {
                pageTitle: 'Admin Edit Product', // Consistent case
                product: product,
                session : req.session
            });
        })
        .catch(err => {
            console.error(err); // Log the error
            res.status(500).render('500', { // Assuming you have a 500 template
                pageTitle: 'Server Error',
                error: 'An error occurred while fetching the product.'
            });
        });
};




exports.postEditProduct = (req, res, next) => {
    
    const db = req.app.db;
    const productId = new ObjectId(req.body.product_id)
    

    const productDoc = {
        productTitle: req.body.productTitle,
        productPrice: req.body.productPrice,
        productDescription: req.body.productDescription,
        productPublished: convertBool(req.body.productPublished),
        productStock: safeParseInt(req.body.productStock) || null,
    };

    db.products.findOne({ _id : productId})
    .then(product => {
        if(!product) {
            console.log('Product is not found!!')
        }
    })
    db.products.updateOne({ _id: productId }, { $set: productDoc }, {})
        .then(product => {
            console.log("Product updated with ID:", productId);
            res.redirect(`/admin/product/edit/${productId}`);
        })
        .catch(err => {
            console.error(`Error updatinf document: ${err}`);
            res.status(400).json({ message: 'Error updating document' });
        });
};


