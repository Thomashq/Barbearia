const express = require('express');
const router = express.Router();
const Barber = require('../models/barberShop');

router.post('/', async(req, res) => {
    try{
        const barberShop = await new Barber(req.body).save();
        res.json({barberShop});
    }
    catch(err){
        res.json({error: true, message: err.message})
    }
});

module.exports = router;