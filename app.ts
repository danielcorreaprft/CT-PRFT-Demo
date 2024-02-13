import express, {ErrorRequestHandler, NextFunction, Request, Response} from "express";
import routes from './routes'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express';
import swaggerSpecification from './swaggerDef';

const  app = express();
const { NODE_ENV } = process.env

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

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecification));

app.use('/', routes);


app.use('*', async (_, res: Response) => {
  return res.status(404).json({
    status: 'error',
    data: {
      message: 'resource not found on this server',
    },
  })
})

export default app
