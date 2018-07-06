var express = require('express');  //Importa el framwework express
var router = express.Router();  //Crea el router del middleware

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });  //Renderiza la página home cuando es solicitada por el cliente (Navegador).
});

module.exports = router;  //Exporta el router del middleware para que esté disponible en nuestra aplicación.