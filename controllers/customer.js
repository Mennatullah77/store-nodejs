const {paginatedProducts} = require('../lib/paginate')

exports.getIndex = (req , res ,next) => {

    const db = req.app.db;
    const config = req.app.config;
    const ProductsPerPage = config.ProductsPerPage;
    page = req.params.page
    if(!page){
        paginatedProducts(db , 1 )
    .then(results => {
        res.render('index/index' , {
            title: 'Shop',
            products : results.products,
            session : req.session,
            numOfProducts : results.numOfProducts,
            ProductsPerPage : ProductsPerPage,
            pageNum: 1,
            menuItems: []

        })
    })
    .catch((err) => {
        console.error(colors.red('Error getting products for page', err));
    });
    }
    
}


exports.getPage =  (req , res ,next) => {

    const db = req.app.db;
    const config = req.app.config;
    const ProductsPerPage = config.ProductsPerPage;
    pageNum = req.params.pageNum
    
    paginatedProducts(db , pageNum)
    .then(results => {
        res.render('index/index' , {
            title: 'Shop',
            products : results.products,
            session : req.session,
            numOfProducts : results.numOfProducts,
            ProductsPerPage : ProductsPerPage,
            pageNum: 1,
            menuItems: []

        })
    })
    .catch((err) => {
        console.error(colors.red('Error getting products for page', err));
    });
    }
    
