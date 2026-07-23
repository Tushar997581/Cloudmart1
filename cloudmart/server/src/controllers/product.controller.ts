import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { uploadToS3 } from '../utils/s3';

const prisma = new PrismaClient();

export const getProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const products = await prisma.product.findMany({
            include: { category: true }
        });
        res.status(200).json(products);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const createProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, description, price, stock, categoryId } = req.body;
        let imageUrl = null;

        if (req.file) {
            imageUrl = await uploadToS3(req.file);
        }

        const product = await prisma.product.create({
            data: {
                name,
                description,
                price: parseFloat(price),
                stock: parseInt(stock),
                categoryId,
                imageUrl
            }
        });

        res.status(201).json(product);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};