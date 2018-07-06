const express = require('express');
const router = express.Router();
const Anuncio = require('../../models/Anuncio');
const jwtAuth = require('../../lib/jwtAuth');
//const i18n = require("./loadI18n");
/**
 * GET /
 * Recupera una lista de anuncios
 */
router.get('/', jwtAuth(), async (req, res, next) => {
    try {
        var precio = req.query.precio;
        const nombre = req.query.nombre;
        const tags = req.query.tags;
        const venta = req.query.venta;
        const skip = parseInt(req.query.skip);
        const limit = parseInt(req.query.limit);
        const fields = req.query.fields;
        const sort = req.query.sort;
        // Crear un filtro vacio
        const filter = {};
        if (nombre) {
            //filter.nombre = { '$regex': nombre, '$options': 'i' }
            filter.nombre = new RegExp('^' + nombre, "i");
        }
        if (precio) {
            precio = req.query.precio.split('-');//Generamos un array con el rango de precios  
            if (precio.length == 2) {//Tenemos un rango. Si uno de los dos está vacio buscamos un valor inferior o superior al valor que no esta vacio
                var precioMin = precio[0];
                var precioMax = precio[1];
                if (isNumeric(precioMin) && isNumeric(precioMax)) {//Precio entre
                    filter.precio = { $gte: precioMin, $lte: precioMax };
                } else if (isNumeric(precioMin)) { //Precios por encima
                    filter.precio = { $gte: precioMin };
                } else { // Precios por debajo
                    filter.precio = { $lte: precioMax };
                }
            }
        }

        if (tags) {
            filter.tags = tags;
        }
        if (venta) {
            filter.venta = venta;
        }
        const anuncios = await Anuncio.list(filter, skip, limit, fields, sort); // await espera a que ser resuelva la promesa y me da el resultado

        console.log(anuncios.length)
        if (anuncios.length == 0) {
            var err = new Error(__('No existen anuncios para su criterio de búsqueda'));
            next(err);
            return;
        }
        res.json({ success: true, result: anuncios });

    } catch (err) {
        err = new Error(__('No es posible devolver la lista de anuncios'));
        next(err);
    }


});

/**
 * GET /
 * Devuelve un array de  tags disponbles
 */
router.get('/tags', jwtAuth(), async (req, res, next) => {
    try {



        Anuncio.find().distinct('tags', function (error, tags) {
            try {
                res.json({ success: true, result: tags });

            } catch (err) {
                err = new Error(__('No es posible devolver la lista de tags'));
                next(err);
            }
        });

    } catch (err) {
        err = new Error(__('No es posible devolver la lista de tags'));
        next(err);
    }
});
/**
 * POST /
 * Crear un anuncio
 */
router.post('/', jwtAuth(), async (req, res, next) => {
    try {

        // creamos un agente en memoria
        const anuncio = new Anuncio(req.body);
        // version async/await
        const anuncioGuardado = await anuncio.save();
        res.json({ success: true, result: anuncioGuardado });
    } catch (err) {
        err = new Error(__('No es posible crear un anuncio'));
        next(err);
    }
});

/**
 * PUT /
 * Actualiza un anuncio
 */
router.put('/:id', jwtAuth(), async (req, res, next) => {
    try {
        const _id = req.params.id;
        const data = req.body;
        const anuncioModificado = await Anuncio.findOneAndUpdate({ _id: _id }, data, { new: true }).exec();
        res.json({ success: true, result: anuncioModificado });
    } catch (err) {
        err = new Error(__('No es posible modificar un anuncio'));
        next(err);
    }
});

/*


/**
 * Funcion para retornar si es numerico el número
 * @param {valor a comprobar} n 
 */
function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}
module.exports = router;