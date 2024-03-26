const express = require('express');
const router = express.Router();
const BusBoy = require('busboy');
const aws = require('../services/aws')
const barberShop = require('../models/barberShop');
const Archives = require('../models/archive')
const Services = require('../models/service');

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

module.exports = router;