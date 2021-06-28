const { response } = require('express');
const Movie = require('../models/movie.model');

const getAllMovies = async (req, res = response) => {
    const movies = await Movie.findAll({
        attributes: ['imagen', 'titulo', 'fechaCreacion']
    });

    res.status(200).json({
        movies
    });
}

const createMovie = async (req, res = response ) => {
    
    const { titulo, ...data} = req.body;
    console.log(data);
    try {
        const existeTituloMovie = await Movie.findOne({
            where: {
                titulo
            }
        });
        if(existeTituloMovie) {
            return res.status(400).json({
                msg: 'Ya existe una pelicula con ese titulo: ' + titulo
            });
        }

        const movie = Movie.build({
            titulo,
            ...data
        });
        await movie.save();
        res.status(200).json({
            movie
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'error interno'
        })
    }
}

const updateMovie = async(req, res = response) => {
    
    const { id } = req.params;
    const { titulo, ...data} = req.body;
    try {

        const movie = await Movie.findByPk(id);
        if(!movie) {
            return res.status(404).json({
                msg: 'No existe una pelicula con el id: ' + id
            });
        }
        // const existeTituloMovie = await Movie.findOne({
        //     where: {
        //         titulo
        //     }
        // });
        // if(existeTituloMovie) {
        //     return res.status(400).json({
        //         msg: 'Ya existe una pelicula con ese titulo: ' + titulo
        //     });
        // }
        await movie.update({ 
            titulo,
            ...data
        });

        res.status(200).json({
            movie
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'error interno'
        })
    }
}

const deleteMovie = async (req, res = response) => {
    const { id } = req.params;

    try {
        const movie = await Movie.findByPk(id);
        if(!movie) {
            return res.status(404).json({
                msg: 'No existe un movie con el id: ' + id
            });
        }
        // await usuario.destroy(); ------ eliminación física

        await movie.update({
            activo: false
        })

        res.status(200).json({
            movie
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'error interno'
        })
    }
}

module.exports = {
    getAllMovies,
    createMovie,
    updateMovie,
    deleteMovie
}