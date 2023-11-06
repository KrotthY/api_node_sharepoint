export const isValidRut = (rut) => {
  const cleanedRut = clean(rut);
  if (cleanedRut.length < 7 || cleanedRut.length > 9) {
    return false;
  }

  let cuerpo = cleanedRut.slice(0, -1);
  let dv = cleanedRut.slice(-1).toUpperCase();

  return validateRut(cuerpo, dv);
};

function clean (rut){
  return typeof rut === 'string'
    ? rut.replace(/^0+|[^0-9kK]+/g, '').toUpperCase()
    : '';
};

function validateRut(cuerpo, dv) {
  let suma = 0;
  let multiplo = 2;
  for (let i = 1; i <= cuerpo.length; i++) {
    let index = multiplo * cuerpo.charAt(cuerpo.length - i);
    suma += index;
    multiplo = multiplo < 7 ? multiplo + 1 : 2;
  }

  let dvEsperado = 11 - (suma % 11);
  dv = dv == "K" ? 10 : parseInt(dv);
  dv = dv == 0 ? 11 : dv;

  return dvEsperado == dv;
}