import  config from "./config.js";
import express from 'express'
import sharePointRoutes from './routes/sharePoint.routes.js';
import cors from 'cors'
import helmet from 'helmet'
import winston from 'winston'
import expressWinston from 'express-winston'
import DailyRotateFile from "winston-daily-rotate-file";

const app =  express();
app.set('trust proxy', 1);

app.set('port', config.port)
//middlewares

//configuracion de winston
const transport = new DailyRotateFile({
  filename: 'src/logs/api-sharepoint-%DATE%.log',
  datePattern:'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d'
})
const logger = winston.createLogger({
  transports: [transport]
});

//configuracion de cors
const corsOptions = {
  origin: ['https://app.cumbredental.cl'],
  methods:'GET,POST,DELETE',
  maxAge: 600
}

app.use(helmet());
app.use(cors(corsOptions));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({extended:false}))

app.use(expressWinston.logger({
  winstonInstance: logger,
  meta: true,
  msg: "HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms - User: {{req.user?.id || 'unknown'}} - IP: {{req.ip}}",
  colorize: true,
  dynamicMeta: (req, res) => {
    return {
      user_id: req.user?.id,
      user_name: req.user?.username,
      query_params: req.query
    };
  }
}));


app.use('/',sharePointRoutes)

app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

const IS_PRODUCTION = process.env.NODE_ENV === 'production';
app.use((err, req, res, next) => {
    logger.error(err.stack);
    if (IS_PRODUCTION) {
        res.status(500).send('Error interno del servidor');
    } else {
        res.status(500).send(err.stack);
    }
});

export default app
