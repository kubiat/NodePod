const express = require('express');
const router = express.Router();
const Usuario = require('../../models/Usuario');
const jwtAuth = require('../../lib/jwtAuth');
const localConfig = require('../../localConfig');
const crypto = require("crypto");
const jwt = require('jsonwebtoken');

/**
 * Registro
 */
router.post('/registro', async (req, res, next) => {
    try {
        //Recogemos primero la clave para encriptarla
        var hash=crypto.createHash('sha256').update(req.body.clave ).digest('base64');
        req.body.clave = hash;
        // creamos un usuario en memoria
        const usuario = new Usuario(req.body);
        console.log(usuario);
        // version async/await
        const usuarioGuardado = await usuario.save();
        res.json({ success: true, result: usuarioGuardado });
    } catch (err) {
        err=new Error(__('No es posible registrar al usuario, póngase en contacto con el administrador.'));
        next(err);
    }
});

/**
 * Login
 */
router.post('/login', async (req, res, next) => {
    try {
        // recogemos credenciales
        const email = req.body.email;
        var clave = crypto.createHash('sha256').update(req.body.clave).digest('base64');          
        //buscamos en base datos
        const usuario = await Usuario.findOne({ email: email }).exec();
        //si encontramos al usuario 
        if (!usuario) {
            res.json({ succes: true, message: __('invalid credentials')})
            return;
        }
        //Comprobamos su password
        if (clave !== usuario.clave) {
            res.json({ succes: true, message: __('invalid credentials') })
            return;
        }
        // Creamos un JWT
        jwt.sign({ user_id: usuario._id }, localConfig.jwt.secret, {
            expiresIn: localConfig.jwt.expiresIn
        }, (err, token) => {
            res.json({ succes: true, token: token });
        });
        // Respondemos al usuario dandole el  JWT
    } catch (err) {
        err=new Error(__('No es posible autenticar al usuario, póngase en contacto con el administrador.'));
        next(err);
    }
});

/**
 * Update
 */
router.put('/:email', jwtAuth(), async (req, res, next) => {
    try {
        const email = req.params.email;
        const data = req.body;
        const usuarioModificado = await Usuario.findOneAndUpdate({ email: email }, data, { new: true }).exec();
        res.json({ success: true, result: usuarioModificado });
    } catch (err) {
        err=new Error(__('No es posible modificar el usuario'));
        next(err);
    }
});

module.exports = router;