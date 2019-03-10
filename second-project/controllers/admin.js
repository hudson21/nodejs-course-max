const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    //__dirname points to the routes folder
    //res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'));
    //res.sendFile(path.join(__dirname, '..', 'views', 'add-product.html'));
    //res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
    res.render('admin/edit-product', {
      pageTitle: 'Add Product', 
      path: '/admin/add-product',
      editing: false
    });
}

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product({
        title, 
        price,
        description, 
        imageUrl,
        userId: req.user
    });
    product.save()
    .then(result => { 
        //console.log(result);
        console.log('Created Product');
        res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
}

exports.getEditProduct = (req, res, next) => {
    //Important: The extracted value always is a string! So "true" instead of true
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    
    Product.findById(prodId)
    .then(product => {
        if (!product) {
            return res.redirect('/');
         }
         res.render('admin/edit-product', {
             pageTitle: 'Edit Product', 
             path: '/admin/edit-product',
             editing: editMode,
             product: product
         });
    })
    .catch(err => console.log(err)); 
};

exports.postEditProduct = (req, res, next) => {
    const prodId= req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDescription = req.body.description;
    
    Product.findById(prodId).then(product => {
        product.title = updatedTitle;
        product.price = updatedPrice;
        product.description = updatedDescription;
        product.imageUrl = updatedImageUrl;
        
        return product.save(); 
    })
    .then(result => {
        console.log('UPDATED PRODUCT!');
        res.redirect('/admin/products'); 
    })
    .catch(err => console.log(err));
};

exports.getProducts = (req, res, next) => {
    Product.find()
    //.select('title price -_id')
    //.populate('userId', 'name') // it allows to populate a certain field (all the detail information)
    .then(products => {
        //console.log(products);
        res.render('admin/products', {
            prods: products, 
            pageTitle: 'Admin Products', 
            path: '/admin/products', 
        });
    })
    .catch(err => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findByIdAndRemove(prodId)
    .then(() => {
        console.log('DESTROYED PRODUCT');
        res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
};