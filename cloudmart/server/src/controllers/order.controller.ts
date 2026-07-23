import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createOrder = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { address } = req.body;
        const userId = req.user!.id;

        const cart = await prisma.cart.findUnique({
            where: { userId },
            include: { items: { include: { product: true } } }
        });

        if (!cart || cart.items.length === 0) {
            res.status(400).json({ error: 'Cart is empty' });
            return;
        }

        let totalAmount = 0;
        const orderItems = cart.items.map(item => {
            totalAmount += item.quantity * item.product.price;
            return {
                productId: item.productId,
                quantity: item.quantity,
                price: item.product.price
            };
        });

        const order = await prisma.order.create({
            data: {
                userId,
                totalAmount,
                address,
                items: { create: orderItems }
            }
        });

        // Clear cart
        await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });

        res.status(201).json(order);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};