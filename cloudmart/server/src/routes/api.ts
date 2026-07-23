import { Router } from 'express';
import multer from 'multer';
import { register, login } from '../controllers/auth.controller';
import { getProducts, createProduct } from '../controllers/product.controller';
import { createOrder } from '../controllers/order.controller';
import { authenticate, authorizeAdmin } from '../middleware/auth.middleware';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

// Auth Routes
router.post('/auth/register', register);
router.post('/auth/login', login);

// Product Routes
router.get('/products', getProducts);
router.post('/products', authenticate, authorizeAdmin, upload.single('image'), createProduct);

// Order Routes
router.post('/orders', authenticate, createOrder);

export default router;