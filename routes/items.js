const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/auth');
const { Item, BasketItem, Basket } = require('../models');
// Add your resource-specific routes here

//creating a item
router.post('/', authenticate, async (req, res) => {
    try {
        const item = await Item.create(req.body);
        res.status(201).json(basket);
    } catch (error) {
        res.status(500).json({ message: 'Error creating Item' });
    }
});

//get all items, including associated baskets
router.get('/', async (req, res) => {
    try {
        const items = await Item.findAll(); // how can we include the ITEMS associated with the baskets in this response?
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving baskets', error });
    }
});

//get a specific item by id, including associated baskets
router.get('/:id', async (req, res) => {
    try {
        const item = await Item.findByPk(req.params.id);

        if (!item) {
            res.status(404).json({ message: 'Item not found' });
        } else {
            res.json(item);
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving item' });
    }
});

//update a item by ID
router.put('/:id', authenticate, async (req, res) => {
    try {
        const [updated] = await Item.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedItem = await Item.findByPk(req.params.id);
            res.json(updatedItem)
        } else {
            res.status(404).json({ message: "Item not found" })
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating Items' })
    }
});

//deleting a basked by id
router.delete('/:id', authenticate, async (req, res) => {
    try {
        const deleted = await Item.destroy ({
            where: {id: req.params.id}
        })
        if(deleted) {
            res.status(204).json({ message: 'Item deleted'})   
        } else {
            res.status(404).json({ message: 'Item not found'})
        } 
    } catch(error){
        res.status(500).json({ message: 'Error deleting item'})
    }
});



module.exports = router;