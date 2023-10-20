import { queries } from "../database";



export const getServerConnectionDatesRx = [

  {
    id:2,
    connection: [
      {
        clinicName: "Apoquindo",
        ip: process.env.IP_APOQUINDO,
        serverName: "CLINIVIEW",
        user: process.env.API_BD_KAVO_USER,
        password: process.env.API_BD_KAVO_PWD,
        queryUse: queries.getPatientDates_Kavo,
        serverRx:"Kavo"
      },
      {
        clinicName: "Apoquindo",
        ip: process.env.IP_APOQUINDO,
        serverName: "PDATA_SQLEXPRESS",
        user: process.env.API_BD_SIRONA_USER,
        password: process.env.API_BD_SIRONA_PWD,
        queryUse: queries.getPatientDates_Sirona,
        serverRx:"Sirona"

      }
    ]
  },
  {
    id:3,
    connection: [
      {
        clinicName: "Huerfanos",
        ip: process.env.IP_HUERFANOS,
        serverName: "CLINIVIEW",
        user: process.env.API_BD_KAVO_USER,
        password: process.env.API_BD_KAVO_PWD,
        queryUse: queries.getPatientDates_Kavo,
        serverRx:"Kavo"
      },
      {
        clinicName: "Huerfanos",
        ip: process.env.IP_HUERFANOS,
        serverName: "PDATA_SQLEXPRESS",
        user: process.env.API_BD_SIRONA_USER,
        password: process.env.API_BD_SIRONA_PWD,
        queryUse: queries.getPatientDates_Sirona,
        serverRx:"Sirona"

      }
    ]
  },
  {
    id:4,
    connection: [
      {
        clinicName: "Rancagua",
        ip: process.env.IP_RANCAGUA,
        serverName: "CLINIVIEW",
        user: process.env.API_BD_KAVO_USER,
        password: process.env.API_BD_KAVO_PWD,
        queryUse: queries.getPatientDates_Kavo,
        serverRx:"Kavo"
      },
      {
        clinicName: "Rancagua",
        ip: process.env.IP_RANCAGUA,
        serverName: "PDATA_SQLEXPRESS",
        user: process.env.API_BD_SIRONA_USER,
        password: process.env.API_BD_SIRONA_PWD,
        queryUse: queries.getPatientDates_Sirona,
        serverRx:"Sirona"

      }
    ]
  },
  {
    id:5,
    connection: [
      {
        clinicName: "Concepción",
        ip: process.env.IP_CONCEPCION,
        serverName: "PDATA_SQLEXPRESS",
        user: process.env.API_BD_SIRONA_USER,
        password: process.env.API_BD_SIRONA_PWD,
        queryUse: queries.getPatientDates_Sirona,
        serverRx:"Sirona"

      }
    ]
  },
  {
    id:7,
    connection: [
      {
        clinicName: "Viña del Mar",
        ip: process.env.IP_VINA,
        serverName: "CLINIVIEW",
        user: process.env.API_BD_KAVO_USER,
        password: process.env.API_BD_KAVO_PWD,
        queryUse: queries.getPatientDates_Kavo,
        serverRx:"Kavo"
      },
      {
        clinicName: "Viña del Mar",
        ip: process.env.IP_VINA,
        serverName: "PDATA_SQLEXPRESS",
        user: process.env.API_BD_SIRONA_USER,
        password: process.env.API_BD_SIRONA_PWD,
        queryUse: queries.getPatientDates_Sirona,
        serverRx:"Sirona"

      }
    ]
  },
  {
    id:8,
    connection: [
      {
        clinicName: "Temuco",
        ip: process.env.IP_TEMUCO,
        serverName: "PDATA_SQLEXPRESS",
        user: process.env.API_BD_SIRONA_USER,
        password: process.env.API_BD_SIRONA_PWD,
        queryUse: queries.getPatientDates_Sirona,
        serverRx:"Sirona"

      }
    ]
  },
  {
    id:10,
    connection: [
      {
        clinicName: "La Dehesa",
        ip: process.env.IP_DEHESA,
        serverName: "CLINIVIEW",
        user: process.env.API_BD_KAVO_USER,
        password: process.env.API_BD_KAVO_PWD,
        queryUse: queries.getPatientDates_Kavo,
        serverRx:"Kavo"
      }
    ]
  }
]


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

