const express = require('express');
const router = express.Router();
const Barber = require('../models/barberShop');
const Services = require('../models/service');
const turf = require('@turf/turf');

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
            status: 'A'
        }).select('_id titulo');
        
        res.json({
            servicos: services.map((s) => ({label: s.titulo, value: s._id})),
        });
        
    }catch(err){
        res.json({ error: true, message: err.message })
    }
})

//o .select serve para pegar apenas parâmetros específicos do salão
router.get('/:id', async(req, res) => {
    try{
        const barberShop = await Barber.findById(req.params.id).select(
            'capa nome endereco.cidade geo.cordinates telefone'
        )
        
        const distance = turf.distance(
            turf.point(barberShop.geo.cordinates),
            turf.point([-30.043858, -51.103487])
        );

        res.json({error: false, barberShop, distance})
    }catch(err){
        res.json({error: true, message: err.message})
    }
});
module.exports = router;