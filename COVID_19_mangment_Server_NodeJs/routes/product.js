const express = require('express');
const router = express.Router();
const checkAuth=require('../middleware/check-auth');

const productControlar=require('../controllers/products');


router.get('/',productControlar.get_all_product);
router.post('/',productControlar.add_new_product);
module.exports = router;
