import path from 'path';
import { queries } from "../../database";


export const getServerConnection = [

  {
    id:1,
    connection: [
      {
        clinicName: "Apoquindo",
        ip: process.env.IP_APOQUINDO,
        serverName: "CLINIVIEW",
        user: process.env.API_BD_KAVO_USER,
        password: process.env.API_BD_KAVO_PWD,
        basePath: path.join(`\\\\${process.env.IP_APOQUINDO}\\cvdata\\DB\\Files\\`),
        queryUse: queries.getDataServerKavo,
        serverRx:"Kavo"
      },
      {
        clinicName: "Apoquindo",
        ip: process.env.IP_APOQUINDO,
        serverName: "PDATA_SQLEXPRESS",
        user: process.env.API_BD_SIRONA_USER,
        password: process.env.API_BD_SIRONA_PWD,
        basePath: path.join(`\\\\${process.env.IP_APOQUINDO}\\pdata\\`),
        queryUse: queries.getDataServerSirona,
        serverRx:"Sirona"
      },
      {
        clinicName: "Huerfanos",
        ip: process.env.IP_HUERFANOS,
        serverName: "CLINIVIEW",
        user: process.env.API_BD_KAVO_USER,
        password: process.env.API_BD_KAVO_PWD,
        basePath: path.join(`\\\\${process.env.IP_HUERFANOS}\\cvdata\\DB\\Files\\`),
        queryUse: queries.getDataServerKavo,
        serverRx:"Kavo"
      },
      {
        clinicName: "Huerfanos",
        ip: process.env.IP_HUERFANOS,
        serverName: "PDATA_SQLEXPRESS",
        user: process.env.API_BD_SIRONA_USER,
        password: process.env.API_BD_SIRONA_PWD,
        basePath: path.join(`\\\\${process.env.IP_HUERFANOS}\\pdata\\`),
        queryUse: queries.getDataServerSirona,
        serverRx:"Sirona"
      },
      {
        clinicName: "La Dehesa",
        ip: process.env.IP_DEHESA,
        serverName: "CLINIVIEW",
        user: process.env.API_BD_KAVO_USER,
        password: process.env.API_BD_KAVO_PWD,
        basePath: path.join(`\\\\${process.env.IP_DEHESA}\\cvdata\\DB\\Files\\`),
        queryUse: queries.getDataServerKavo,
        serverRx:"Kavo"
      }
    ]
  },
  {
    id:2,
    connection: [
      {
        clinicName: "Apoquindo",
        ip: process.env.IP_APOQUINDO,
        serverName: "CLINIVIEW",
        user: process.env.API_BD_KAVO_USER,
        password: process.env.API_BD_KAVO_PWD,
        basePath: path.join(`\\\\${process.env.IP_APOQUINDO}\\cvdata\\DB\\Files\\`),
        queryUse: queries.getDataServerKavo,
        serverRx:"Kavo"
      },
      {
        clinicName: "Apoquindo",
        ip: process.env.IP_APOQUINDO,
        serverName: "PDATA_SQLEXPRESS",
        user: process.env.API_BD_SIRONA_USER,
        password: process.env.API_BD_SIRONA_PWD,
        basePath: path.join(`\\\\${process.env.IP_APOQUINDO}\\pdata\\`),
        queryUse: queries.getDataServerSirona,
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
        basePath: path.join(`\\\\${process.env.IP_HUERFANOS}\\cvdata\\DB\\Files\\`),
        queryUse: queries.getDataServerKavo,
        serverRx:"Kavo"
      },
      {
        clinicName: "Huerfanos",
        ip: process.env.IP_HUERFANOS,
        serverName: "PDATA_SQLEXPRESS",
        user: process.env.API_BD_SIRONA_USER,
        password: process.env.API_BD_SIRONA_PWD,
        basePath: path.join(`\\\\${process.env.IP_HUERFANOS}\\pdata\\`),
        queryUse: queries.getDataServerSirona,
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
        basePath: path.join(`\\\\${process.env.IP_RANCAGUA}\\cvdata\\DB\\Files\\`),
        queryUse: queries.getDataServerKavo,
        serverRx:"Kavo"
      },
      {
        clinicName: "Rancagua",
        ip: process.env.IP_RANCAGUA,
        serverName: "PDATA_SQLEXPRESS",
        user: process.env.API_BD_SIRONA_USER,
        password: process.env.API_BD_SIRONA_PWD,
        basePath: path.join(`\\\\${process.env.IP_RANCAGUA}\\pdata\\`),
        queryUse: queries.getDataServerSirona,
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
        basePath: path.join(`\\\\${process.env.IP_CONCEPCION}\\pdata\\`),
        queryUse: queries.getDataServerSirona,
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
        basePath: path.join(`\\\\${process.env.IP_VINA}\\cvdata\\DB\\Files\\`),
        queryUse: queries.getDataServerKavo,
        serverRx:"Kavo"
      },
      {
        clinicName: "Viña del Mar",
        ip: process.env.IP_VINA,
        serverName: "PDATA_SQLEXPRESS",
        user: process.env.API_BD_SIRONA_USER,
        password: process.env.API_BD_SIRONA_PWD,
        basePath: path.join(`\\\\${process.env.IP_VINA}\\pdata\\`),
        queryUse: queries.getDataServerSirona,
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
        basePath: path.join(`\\\\${process.env.IP_TEMUCO}\\pdata\\`),
        queryUse: queries.getDataServerSirona,
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
        basePath: path.join(`\\\\${process.env.IP_DEHESA}\\cvdata\\DB\\Files\\`),
        queryUse: queries.getDataServerKavo,
        serverRx:"Kavo"
      }
    ]
  }
]
