import express, {Express, Router} from 'express';
import morgan from 'morgan';

import {statusCode} from '../../lib';
import {IStatusCode} from '../../lib/interface';
import cors from 'cors';

/**
 * Function to load and start the Express app.
 * @param app contains express app.
 * @param router contains api routes.
 * @returns Promise that resolves to a boolean indicating whether the app was successfully loaded.
 */
const appLoader = (app: Express, router: Router) =>
  new Promise<boolean>(resolve => {
    app.use(
      express.json({
        limit: '10mb',
      })
    );
    app.use(
      express.urlencoded({
        extended: true,
      })
    );
    app.use(cors());
    app.use(morgan('dev'));
    app.use('/', router);
    app.use((req, res) => {
      res.status((statusCode as IStatusCode).notFound).send({
        success: false,
        data: null,
        message: 'the resource you are looking for is not found.',
      });
    });
    app.listen(process.env.PORT || 5000, () => {
      console.log('************ App is running 😁 ***********');
      resolve(true);
    });
  });

export {appLoader};
