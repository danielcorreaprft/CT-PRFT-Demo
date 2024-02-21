import express, {ErrorRequestHandler, NextFunction, Request, Response} from "express";
import routes from './routes'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express';
import swaggerSpecification from './swagger/swaggerDef';
import dotenv from 'dotenv'
import fs from 'fs';
import path from 'path';

const  app = express();

const nodeEnv = process.env.NODE_ENV || 'development';
const envFile = `.env.${nodeEnv}`;
const envPath = path.resolve(process.cwd(), envFile);

if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
} else {
  dotenv.config();
}

// view engine setup
app.use(cors())
app.use(express.json());
app.use((
    error: ErrorRequestHandler,
    req: Request,
    res: Response,
    next: NextFunction
) => {
  if (error) {
    next(error)
  } else {
    next()
  }
})
app.use(express.urlencoded({ extended: false }));

if (process.env.ENABLE_SWAGGER === 'true') {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecification));
}

app.use('/', routes);


app.use('*', (_, res: Response) => {
  return res.status(404).json({
    status: 'error',
    data: {
      message: 'resource not found on this server',
    },
  })
})

export default app
