const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

const { protect, admin } = require('../middleware/authMiddleware');

// Public
router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);

// Protected Admin
router.post('/', protect, admin, productController.createProduct);
router.put('/:id', protect, admin, productController.updateProduct);
router.delete('/:id', protect, admin, productController.deleteProduct);

module.exports = router;