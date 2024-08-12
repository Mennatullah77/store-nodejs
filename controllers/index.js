const {paginatedProducts} = require('../lib/paginate')
const {getMenu} = require('../lib/menu')


exports.getIndex = (req , res ,next) => {
    const db = req.app.db;
    const config = req.app.config;
    const ProductsPerPage = config.ProductsPerPage;
    page = req.params.page
    if(!page){
        Promise.all([paginatedProducts(db , 1 ) , getMenu()])
    .then(results  => {
        res.render('index/index' , {
            title: 'Shop',
            products : results[0].products,
            session : req.session,
            numOfProducts : results[0].numOfProducts,
            ProductsPerPage : ProductsPerPage,
            pageNum: 1,
            menuItems: results[1]

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
    
    Promise.all([paginatedProducts(db , pageNum ) , getMenu()])
    .then(results => {
        res.render('index/index' , {
            title: 'Shop',
            products : results[0].products,
            session : req.session,
            numOfProducts : results[0].numOfProducts,
            ProductsPerPage : ProductsPerPage,
            pageNum: 1,
            menuItems: results[1]

        })
    })
    .catch((err) => {
        console.error(colors.red('Error getting products for page', err));
    });
    }

exports.getCategory = (req , res ,next) => {

    const db = req.app.db;
    const config = req.app.config;
    const ProductsPerPage = config.ProductsPerPage;
    category = req.params.cat
    
    
    Promise.all([paginatedProducts(db , req.params.pageNum , {productCategory : category}) , getMenu()])
    .then(results => {
        res.render('index/index' , {
            title: 'Shop',
            products : results[0].products,
            session : req.session,
            numOfProducts : results[0].numOfProducts,
            ProductsPerPage : ProductsPerPage,
            pageNum: 1,
            menuItems: results[1]

        })
    })
    .catch((err) => {
        console.error(colors.red('Error getting products for page', err));
    });
    }

