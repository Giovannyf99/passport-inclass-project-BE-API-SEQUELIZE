const express = require('express');
const router = express.Router();
const {authenticate} = require('../middlewares/auth')
const { Order, User, Basket, BasketOrder} = require('../models')

//creating a item
router.post('/', authenticate, async (req, res) => {
    try {
        const order = await Order.create(req.body);
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Error creating Item' });
    }
});

//get all items, including associated baskets
router.get('/', async (req, res) => {
    try {
        const orders = await Order.findAll(); // how can we include the ITEMS associated with the baskets in this response?
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving baskets', error });
    }
});

//get a specific item by id, including associated baskets
router.get('/:id', async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id);

        if (!order) {
            res.status(404).json({ message: 'Order not found' });
        } else {
            res.json(order);
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving order' });
    }
});

//update a item by ID
router.put('/:id', authenticate, async (req, res) => {
    try {
        const [updated] = await order.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedOrder = await Order.findByPk(req.params.id);
            res.json(updatedOrder)
        } else {
            res.status(404).json({ message: "Order not found" })
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating Orders' })
    }
});

//deleting a basked by id
router.delete('/:id', authenticate, async (req, res) => {
    try {
        const deleted = await Order.destroy ({
            where: {id: req.params.id}
        })
        if(deleted) {
            res.status(204).json({ message: 'Order deleted'})   
        } else {
            res.status(404).json({ message: 'Order not found'})
        } 
    } catch(error){
        res.status(500).json({ message: 'Error deleting order'})
    }
});





module.exports = router;