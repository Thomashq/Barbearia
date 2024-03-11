const express = require('express');
const router = express.Router();
const Barber = require('../models/barberShop');
const Services = require('../models/service');

router.post('/', async(req, res) => {
    try{
        const barberShop = await new Barber(req.body).save();
        res.json({ barberShop });
    } catch(err){
        res.json({ error: true, message: err.message })
    }
});

router.get('/service/:barberShopId', async(req, res) => {
    try{
        const{ barberShopId } = req.params;
        const services = await Services.find({
            barberShopId,
            satus: 'A'
        }).select('_id titulo');
        
        res.json({
            servicos: Services.map(s => ({label: s.titulo, value: s._id}))
        });
        
    }catch(err){
        res.json({ error: true, message: err.message })
    }
})

module.exports = router;