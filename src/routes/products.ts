import express, { Request, Response, NextFunction } from 'express';
import Product from '../models/Product';

const router = express.Router();

// CREATE
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json({
      message: 'Product created successfully!',
      product: savedProduct,
    });
  } catch (err) {
    next(err);
  }
});

// READ (all products)
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
});

// READ (single product by ID)
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).json({ message: 'Product not found.' });
      return;  // Ensure no further execution happens after response
    }
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
});

// UPDATE
router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    // eslint-disable-next-line max-len, @typescript-eslint/no-unsafe-argument
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) {
      res.status(404).json({ message: 'Product not found.' });
      return;
    }
    res.status(200).json(updatedProduct);
  } catch (err) {
    next(err);
  }
});

// DELETE
// eslint-disable-next-line max-len
router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      res.status(404).json({ message: 'Product not found.' });
      return;
    }
    res.status(200).json({ message: 'Product deleted successfully!' });
  } catch (err) {
    next(err);
  }
});

export default router;
