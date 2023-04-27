const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/auth')
const { User, Order} = require('../models')


//creating a item
router.post('/', authenticate, async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error creating Item' });
    }
});

//get all items, including associated baskets
router.get('/', async (req, res) => {
    try {
        const users = await User.findAll(); // how can we include the ITEMS associated with the baskets in this response?
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving baskets', error });
    }
});

//get a specific item by id, including associated baskets
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);

        if (!user) {
            res.status(404).json({ message: 'User not found' });
        } else {
            res.json(user);
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving user' });
    }
});

//update a item by ID
router.put('/:id', authenticate, async (req, res) => {
    try {
        const [updated] = await User.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedUser = await User.findByPk(req.params.id);
            res.json(updatedUser)
        } else {
            res.status(404).json({ message: "User not found" })
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating Users' })
    }
});

//deleting a basked by id
router.delete('/:id', authenticate, async (req, res) => {
    try {
        const deleted = await User.destroy ({
            where: {id: req.params.id}
        })
        if(deleted) {
            res.status(204).json({ message: 'User deleted'})   
        } else {
            res.status(404).json({ message: 'User not found'})
        } 
    } catch(error){
        res.status(500).json({ message: 'Error deleting item'})
    }
});


module.exports = router;