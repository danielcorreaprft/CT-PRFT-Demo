import express, {ErrorRequestHandler, NextFunction, Request, Response} from "express";
import routes from './routes'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express';
import swaggerSpecification from './swagger/swaggerDef';
import dotenv from 'dotenv'
import fs from 'fs';
import path from 'path';
import session from 'express-session';
import passport from 'passport'
import {AuthenticationProvider, User} from "./types/Auth";

const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const FacebookStrategy = require( 'passport-facebook' ).Strategy;
const OAuth2Strategy = require( 'passport-oauth2' ).Strategy;

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

app.use(session({
  secret: "secret",
  resave: false ,
  saveUninitialized: true ,
}))

app.use(passport.initialize())
app.use(passport.session())

let authUser = (req:Request, accessToken, refreshToken, profile, done) => {
  console.log("access:" + accessToken)
  console.log(refreshToken)
  const authProvider : AuthenticationProvider = accessToken ? AuthenticationProvider.GOOGLE : AuthenticationProvider.FACEBOOK;
  const user : User = {
    profile: profile,
    accessToken: accessToken ? {access_token: accessToken} : refreshToken,
    authenticationProvider: authProvider
  };
  return done(null, user);
}

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:8085/auth/google/callback",
  passReqToCallback: true
}, authUser));

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: "http://localhost:8085/auth/facebook/callback",
  profileFields: ['emails'],
  enableProof: true
}, authUser));

passport.use(new OAuth2Strategy({
      authorizationURL: 'https://api.us-central1.gcp.commercetools.com/'+process.env.CTP_PROJECT_KEY+'/login',
      tokenURL: 'https://auth.us-central1.gcp.commercetools.com/oauth/token',
      clientID: process.env.CTP_CLIENT_ID,
      clientSecret: process.env.CTP_CLIENT_SECRET,
      callbackURL: "http://localhost:8085/auth/credentials/callback"
    }, authUser
));

passport.serializeUser( (user, done) => {
  console.log(user)
  done(null, user)
} )

passport.deserializeUser((user, done) => {
  // This is the {user} that was saved in req.session.passport.user.{user} in the serializationUser()
  // deserializeUser will attach this {user} to the "req.user.{user}", so that it can be used anywhere in the App.
  done (null, user)
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
