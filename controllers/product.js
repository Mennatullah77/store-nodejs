const {convertBool , safeParseInt } = require('../lib/common')

exports.getProducts = (req , res , next) => {
    console.log('I am here')
    res.render('products' , {
        title: 'Products' ,
        products: []
    })
}

exports.getNewProduct = (req , res , next) => {
    res.render('product-new' , {
        title: 'Add new Product'
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
        .then(result => {
            const newId = result.insertedId;
            console.log("Product Added with ID:", newId);
            res.redirect('/edit/product/new');
        })
        .catch(err => {
            console.error(`Error inserting document: ${err}`);
            res.status(400).json({ message: 'Error inserting document' });
        });
};
