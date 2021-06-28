const { response } = require('express');
const Serie = require('../models/serie.model');

const getAllSeries = async (req, res = response) => {
    const series = await Serie.findAll({
        attributes: ['imagen', 'titulo', 'fechaCreacion']
    });

    res.status(200).json({
        series
    });
}

const createSerie = async (req, res = response ) => {
    
    const { titulo, ...data} = req.body;
    console.log(data);
    try {
        const existeTituloSerie = await Serie.findOne({
            where: {
                titulo
            }
        });
        if(existeTituloSerie) {
            return res.status(400).json({
                msg: 'Ya existe una serie con ese titulo: ' + titulo
            });
        }

        const serie = Serie.build({
            titulo,
            ...data
        });
        await serie.save();
        res.status(200).json({
            serie
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'error interno'
        })
    }
}

const updateSerie = async(req, res = response) => {
    
    const { id } = req.params;
    const { titulo, ...data} = req.body;
    try {

        const serie = await Serie.findByPk(id);
        if(!serie) {
            return res.status(404).json({
                msg: 'No existe una serie con el id: ' + id
            });
        }
        // const existeTituloSerie = await Serie.findOne({
        //     where: {
        //         titulo
        //     }
        // });
        // if(existeTituloSerie) {
        //     return res.status(400).json({
        //         msg: 'Ya existe una serie con ese titulo: ' + titulo
        //     });
        // }
        await serie.update({ 
            titulo,
            ...data
        });

        res.status(200).json({
            serie
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'error interno'
        })
    }
}

const deleteSerie = async (req, res = response) => {
    const { id } = req.params;

    try {
        const serie = await Serie.findByPk(id);
        if(!serie) {
            return res.status(404).json({
                msg: 'No existe un serie con el id: ' + id
            });
        }
        // await usuario.destroy(); ------ eliminación física

        await serie.update({
            activo: false
        })

        res.status(200).json({
            serie
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'error interno'
        })
    }
}

module.exports = {
    getAllSeries,
    createSerie,
    updateSerie,
    deleteSerie
}