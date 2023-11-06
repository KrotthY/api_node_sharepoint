"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isValidRut = void 0;
var isValidRut = function isValidRut(rut) {
  var cleanedRut = clean(rut);
  if (cleanedRut.length < 7 || cleanedRut.length > 9) {
    return false;
  }
  var cuerpo = cleanedRut.slice(0, -1);
  var dv = cleanedRut.slice(-1).toUpperCase();
  return validateRut(cuerpo, dv);
};
exports.isValidRut = isValidRut;
function clean(rut) {
  return typeof rut === 'string' ? rut.replace(/^0+|[^0-9kK]+/g, '').toUpperCase() : '';
}
;
function validateRut(cuerpo, dv) {
  var suma = 0;
  var multiplo = 2;
  for (var i = 1; i <= cuerpo.length; i++) {
    var index = multiplo * cuerpo.charAt(cuerpo.length - i);
    suma += index;
    multiplo = multiplo < 7 ? multiplo + 1 : 2;
  }
  var dvEsperado = 11 - suma % 11;
  dv = dv == "K" ? 10 : parseInt(dv);
  dv = dv == 0 ? 11 : dv;
  return dvEsperado == dv;
}