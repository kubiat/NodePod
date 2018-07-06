'use strict'

const jwt = require('jsonwebtoken');

const localConfig = require('../localConfig');

const i18n = require("./loadI18n");

// exporto una funcion que devuelve un middleware
// para comprobar JWT

module.exports = function () {
    return (req, res, next) => {
        // recogemos el token de la peticion
        const token = req.body.token || req.query.token || req.get('x-access-token');

        // Obtenemos el idioma para presentar el error en el idioma seleccionado
        const lang = req.body.lang || req.query.lang;
        if (lang) {
            i18n.setLocale(lang);
        }
        // si no hay token responde no autorizado
        if (!token) {
            const err = new Error(__('no token provided'));//Mostramos error en el idioma seleccionado
            err.status = 401;
            next(err);
            return;
        }
        // verifico el token y dejo pasar al siguiente middeleware
        jwt.verify(token, localConfig.jwt.secret, (err, decoded) => {
            if (err) {
                err.message = __(err.message) //Mostramos error en el idioma seleccionado
                next(err);
                return;
            }
            req.user_id = decoded.user_id;
            next();
        });
    }
}