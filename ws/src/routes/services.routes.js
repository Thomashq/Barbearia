const express = require('express');
const router = express.Router();
const Barber = require('../models/barberShop');
const Services = require('../models/service');

router.post('/', async(req, res) => {
    try{
        const service = await new Services(req.body).save();
        res.json({ service });
    } catch(err){
        res.json({ error: true, message: err.message })
    }
});

module.exports = router;