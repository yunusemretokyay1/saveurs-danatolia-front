
const express = require('express');
const Product = require('../../models/Product');
const router = express.Router();

router.get('/search', async (req, res) => {
    const { query } = req.query;

    try {
        const results = await Product.find({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } },
            ]
        });
        res.json(results);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products' });
    }
});

module.exports = router;
