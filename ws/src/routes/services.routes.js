const express = require('express');
const router = express.Router();
const BusBoy = require('busboy');
const aws = require('../services/aws')
const barberShop = require('../models/barberShop');
const Archives = require('../models/archive')
const Services = require('../models/service');


router.get('/barberShop/:barberShopId', async (req, res)=>{
    try{
        const services = await Services.find({
            barberShopId: req.params.barberShopId,
            status: {$ne: 'E'}
        })
        //retornará separado em diversos objetos para melhor visualização
        let barberServices = [];
        //for para trabalhar dentro de services
        for(let i of services){
            const files = await Archives.find({
                model: 'Service',
                referenciaId: i._id
            })
            //o i._doc separa apenas os dados que eu quero
            barberServices.push({...i._doc, services});
        }
        res.json({error: false, servicos: barberServices})
    }catch(err){
        res.json({error: true, message: err.message})
    }
});

router.put('/:id', async (req, res) => {
    const busBoy = new BusBoy({ headers: req.headers });
    busBoy.on('finish', async () => {
        try {
            const { barberShopId, service } = req.body;
            let errors = [];
            let arquivos = [];

            if (req.files && Object.keys(req.files) > 0) {
                for (let key of Object.keys(req.files)) {
                    const file = req.files[key];
                    const nameParts = file.name.split('.');
                    const fileName = `${new Date().getTime()}.${nameParts[nameParts.length - 1]}`;

                    const path = `services/${barberShopId}/${fileName}`;

                    const response = await aws.uploadToS3(file, path);
                    if (response.error) {
                        errors.push({ error: true, message: response.message });
                    }
                    else {
                        arquivos.push(path);
                    }
                }
            }

            if(errors.length > 0){
                res.json(errors[0]);
                return false;
            }
            const jsonService = JSON.parse(service);
            await Services.findByIdAndUpdate(req.params.id, jsonService);
            //criação do arquivo 
            archives = arquivos.map((archive) => ({
                referenciaId: req.params.id,
                model: 'Service',
                caminho: archive
            }));

            await Archives.insertMany(archives);
            res.json({error: false})
        }
        catch (err) {
            res.json({ error: true, message: err.message })
        }
    });
    req.pipe(busBoy);
});

//Não é possível criar arquivos via json, usarei formdata
router.post('/', async (req, res) => {
    const busBoy = new BusBoy({ headers: req.headers });
    busBoy.on('finish', async () => {
        try {
            const { barberShopId, service } = req.body;
            let errors = [];
            let arquivos = [];

            if (req.files && Object.keys(req.files) > 0) {
                for (let key of Object.keys(req.files)) {
                    const file = req.files[key];
                    const nameParts = file.name.split('.');
                    const fileName = `${new Date().getTime()}.${nameParts[nameParts.length - 1]}`;

                    const path = `services/${barberShopId}/${fileName}`;

                    const response = await aws.uploadToS3(file, path);
                    if (response.error) {
                        errors.push({ error: true, message: response.message });
                    }
                    else {
                        arquivos.push(path);
                    }
                }
            }

            if(errors.length > 0){
                res.json(errors[0]);
                return false;
            }
            let jsonService = JSON.parse(service);
            const newService = await new Services(jsonService).save();
            //criação do arquivo 
            archives = arquivos.map((archive) => ({
                referenciaId: newService._id,
                model: 'Service',
                caminho: archive
            }));

            await Archives.insertMany(archives);
            res.json({servico: newService, archives})
        }
        catch (err) {
            res.json({ error: true, message: err.message })
        }
    });
    req.pipe(busBoy);
});

router.delete('/remove', async (req, res,) => {
    try{
        const { id } = req.body;

        await aws.deleteFileS3(id);

        await Archives.findOneAndDelete({
            caminho: id
         });
        
         res.json({error: false});
    }catch(err){
        res.json({error: true});
    }
});

router.delete('/:id', async (req, res,) => {
    try{
        const { id } = req.params;

        await Services.findByIdAndUpdate(id, {status: 'E'});
        
         res.json({error: false});
    }catch(err){
        res.json({error: true, message: err.message});
    }
});

module.exports = router;