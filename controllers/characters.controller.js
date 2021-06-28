const { response } = require('express');
const Character = require('../models/character.model');


const getAllCharacters = async (req, res = response) => {
    const characters = await Character.findAll({
        attributes: ['imagen', 'nombre']
    });

    res.status(200).json({
        characters
    });
}

const createCharacter = async (req, res = response ) => {
    
    const { nombre, ...data} = req.body;
    try {
        const existeNombreCharacter = await Character.findOne({
            where: {
                nombre
            }
        });
        if(existeNombreCharacter) {
            return res.status(400).json({
                msg: 'Ya existe un personaje con ese nombre: ' + nombre
            });
        }

        const character = Character.build({
            nombre,
            ...data
        });
        await character.save();
        res.status(200).json({
            character
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'error interno'
        })
    }
}

const updateCharacter = async(req, res = response) => {
    
    const { id } = req.params;
    const { nombre, ...data} = req.body;
    try {

        const character = await Character.findByPk(id);
        if(!character) {
            return res.status(404).json({
                msg: 'No existe un character con el id: ' + id
            });
        }
        // const existeNombreCharacter = await Character.findOne({
        //     where: {
        //         nombre
        //     }
        // });
        // if(existeNombreCharacter) {
        //     return res.status(400).json({
        //         msg: 'Ya existe un personaje con ese nombre: ' + nombre
        //     });
        // }
        await character.update({ 
            nombre,
            ...data
        });
        res.status(200).json({
            character
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'error interno'
        })
    }
}

const deleteCharacter = async (req, res = response) => {
    const { id } = req.params;

    try {
        const character = await Character.findByPk(id);
        if(!character) {
            return res.status(404).json({
                msg: 'No existe un character con el id: ' + id
            });
        }
        // await usuario.destroy(); ------ eliminación física

        await character.update({
            activo: false
        })

        res.status(200).json({
            character
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'error interno'
        })
    }
}


module.exports = {
    getAllCharacters,
    createCharacter,
    updateCharacter,
    deleteCharacter
}
