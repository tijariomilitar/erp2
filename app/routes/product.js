const router = require("express").Router();
const lib = require('jarmlib');

const productController = require('../controller/product/main');
productController.color = require('../controller/product/color');
productController.image = require('../controller/product/image');
productController.package = require('../controller/product/package');
productController.feedstock = require('../controller/product/feedstock');
productController.price = require('../controller/product/price');

router.get('/index', lib.route.toHttps, productController.index);
router.get('/manage', lib.route.toHttps, productController.manage);

router.get('/', lib.route.toHttps, productController.list);
router.post('/save', lib.route.toHttps, productController.save);
router.get('/id/:id', lib.route.toHttps, productController.findById);
router.post('/filter', lib.route.toHttps, productController.filter);
router.delete('/delete', lib.route.toHttps, productController.delete);

router.post('/image/add', lib.route.toHttps, productController.image.add);
router.delete('/image/remove', lib.route.toHttps, productController.image.remove);

router.post('/feedstock/add', lib.route.toHttps, productController.feedstock.add);
router.get('/feedstock/id/:id', lib.route.toHttps, productController.feedstock.findById);
router.delete('/feedstock/remove', lib.route.toHttps, productController.feedstock.remove);
router.get('/feedstock/list/product_id/:product_id', lib.route.toHttps, productController.feedstock.list);
router.post('/feedstock/category/save', lib.route.toHttps, productController.feedstock.category.save);
router.get('/feedstock/category/list/product_id/:product_id', lib.route.toHttps, productController.feedstock.category.list);

router.get('/price', lib.route.toHttps, productController.price.index);
router.post('/price/filter', lib.route.toHttps, productController.price.filter);
router.post('/price/find', lib.route.toHttps, productController.price.find);
router.post('/price/update', lib.route.toHttps, productController.price.update);
router.post('/price/category/save', lib.route.toHttps, productController.price.category.save);
router.get('/price/category/filter', lib.route.toHttps, productController.price.category.filter);
router.get('/price/category/id/:id', lib.route.toHttps, productController.price.category.findById);
router.delete('/price/category/delete', lib.route.toHttps, productController.price.category.delete);

router.get('/package', lib.route.toHttps, productController.package.index);
router.post('/package/save', lib.route.toHttps, productController.package.save);
router.post('/package/filter', lib.route.toHttps, productController.package.filter);
router.get('/package/id/:id', lib.route.toHttps, productController.package.findById);
router.delete('/package/delete', lib.route.toHttps, productController.package.delete);
router.post('/package/product/update', lib.route.toHttps, productController.package.product.update);

router.post('/package/price/find', lib.route.toHttps, productController.package.price.find);
router.post('/package/price/update', lib.route.toHttps, productController.package.price.update);

router.post('/package/image/add', lib.route.toHttps, productController.package.image.add);
router.delete('/package/image/remove', lib.route.toHttps, productController.package.image.remove);

router.post('/colorSave', lib.route.toHttps, productController.color.save);
router.get('/colorList', lib.route.toHttps, productController.color.list);

module.exports = router;