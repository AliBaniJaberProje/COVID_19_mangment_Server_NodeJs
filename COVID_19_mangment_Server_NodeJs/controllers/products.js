const Product=require('../database/model/product');

exports.get_all_product= (req, res, next) => {
    //get all product from DB
    console.log(req.body.ali);
    Product.find({})
        .select(' _id name price')
        .then(result => {
            const allproducts = {
                data: result.map(result => {
                    return {
                        name: result.name,
                        price: result.price,
                        _id: result._id,
                        url: {
                            type: 'GET',
                            urls: 'http://localhost:3000/products/' + result._id
                        }
                    }
                })
            }

            res.status(200).json({
                masaage: allproducts
            })
        })
        .catch(err => {
            res.status(404).json({
                massage: err
            })
        });
};
exports.add_new_product=(req, res, next) => {

    const productToInsert = new Product({
        name: req.body.name,
        price: req.body.price
    })
    productToInsert.save()
        .then(result => {
            res.status(200).json({
                massage: 'add new product'
            })
        })
        .catch(err => {
            res.status(404).text(err)
        });
}
