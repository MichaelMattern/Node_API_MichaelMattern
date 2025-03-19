const express = require('express');
const router = express.Router();
const Order = require('../models/orders');

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       required:
 *         - customerId
 *         - items
 *         - total
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the order
 *         customerId:
 *           type: string
 *           description: ID of the customer placing the order
 *         items:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               product:
 *                 type: string
 *                 description: The name of the product
 *               quantity:
 *                 type: number
 *                 description: Quantity of the product
 *               price:
 *                 type: number
 *                 description: Price per unit
 *         total:
 *           type: number
 *           description: Total price of the order
 *         status:
 *           type: string
 *           enum: [pending, paid, cancelled]
 *           description: Current order status
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date order was created
 *       example:
 *         _id: "60d5ec49c9a6a8267cd1a876"
 *         customerId: "60d5ec49c9a6a8267cd1a123"
 *         items:
 *           - product: "Laptop"
 *             quantity: 1
 *             price: 1200
 *         total: 1200
 *         status: "pending"
 *         createdAt: "2025-03-18T12:00:00Z"
 */

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       201:
 *         description: Order created successfully
 *       400:
 *         description: Bad request
 */
router.post('/', async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Retrieve all orders
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: List of orders
 *       500:
 *         description: Server error
 */
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /orders/{id}/cancel:
 *   patch:
 *     summary: Cancel an order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order status updated to 'cancelled'
 *       400:
 *         description: Invalid request
 */
router.patch('/:id/cancel', async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: 'cancelled' },
      { new: true }
    );
    res.json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * @swagger
 * /orders/{id}/payment:
 *   post:
 *     summary: Submit payment for an order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Payment submitted successfully
 *       400:
 *         description: Invalid request
 */
router.post('/:id/payment', async (req, res) => {
  try {
    setTimeout(async () => { // Simulating delay
      const order = await Order.findByIdAndUpdate(
        req.params.id,
        { status: 'paid' },
        { new: true }
      );
      res.json({ message: 'Payment submitted after delay', order });
    }, 3000);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     summary: Delete an order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *       400:
 *         description: Invalid request
 */
router.delete('/:id', async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: 'Order deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
