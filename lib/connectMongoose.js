'use strict';

const mongoose = require('mongoose');

const conn = mongoose.connection;

conn.on('error',err =>{
    console.log('Error',err);
});

conn.once('open',()=>{
    console.log('Conectado a MongoDB en ',conn.name);
});

mongoose.connect('mongodb://localhost/nodepod');

module.exports=conn;

