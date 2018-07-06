'use strict';
var i18n = require("i18n");
i18n.configure({
  locales:['en', 'es'],
  directory:  './locales',
  register: global
});
//i18n.setLocale([req, res.locals], req.params.lang);
i18n.setLocale('es');
module.exports=i18n;