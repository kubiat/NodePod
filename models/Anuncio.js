'use strict'
const mongoose = require('mongoose');

// Primero definimos un esquema
const anuncioSchema = mongoose.Schema({
    nombre: String,
    venta: Boolean,
    precio: Number,
    foto: String,    
    tags :[]
});

// Metodo estático  
anuncioSchema.statics.list = function (filter,skip,limit,fields,sort) {
    // Crear la query sin ejecutarla
    const query = Anuncio.find(filter);
   
    query.skip(skip);
    query.limit(limit);
    query.select(fields);
    query.sort(sort); // La ordenacion se ejecuta antes que el
    // Ejecutamos la query y devolvemos una promesa
    return query.exec();
}


const Anuncio = mongoose.model('Anuncio', anuncioSchema);

module.exports = Anuncio;