import * as dotenv from 'dotenv';
import './aliases';
import express from 'express';
import {appLoader, databaseLoader} from './loaders';
import {router} from './routers';
dotenv.config();

process.on('uncaughtException', err => {
  console.log(' UNCAUGHT EXCEPTION ');
  console.log(`[Inside 'uncaughtException' event] ${err.stack ?? err.message}`);
});
process.on('unhandledRejection', (reason, promise) => {
  console.log(' UNHANDLED REJECTION ');
  console.log('Unhandled Rejection at: ', promise, 'REASON: ', reason);
});

const app = express();

databaseLoader()
  .then(() => appLoader(app, router))
  .catch(error => {
    console.log(error);
    throw new Error(error.message);
  });

export default app;
