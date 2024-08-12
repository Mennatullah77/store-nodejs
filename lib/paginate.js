const { getConfig } = require("./config")


const paginatedProducts = (db , page , query , sort ) => {
    const config = getConfig()
    productsPerPage = config.productsPerPage
    let skip = 0;
    if(page> 1){
        skip = (page - 1) * productsPerPage
    }
    if(!query){
        query = {};
    }
    if(!sort){
        sort = {};
    }
    
    return Promise.all([
        db.products.find(query).sort(sort).skip(skip).limit(productsPerPage).toArray(),
        db.products.countDocuments(query)
    ])
    .then(results =>{
        return {products : results[0] , numOfProducts : results[1]}
    })
    .catch((err) => {
        throw new Error('Error retrieving paginated data');
    });
}

module.exports = {
    paginatedProducts
}