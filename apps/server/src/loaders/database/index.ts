import dotenv from 'dotenv';
dotenv.config();
const {MONGO_HOST, MONGO_USERNAME, MONGO_PASSWORD, MONGO_DBNAME} = process.env;
import {MongoClient} from 'mongodb';

const MONGO_URI = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DBNAME}?retryWrites=true&w=majority`;
const databaseConnection = new MongoClient(MONGO_URI);

/**
 * Function to load and connect to the database
 * @returns Promise that resolves to the connected database instance
 */
const databaseLoader = async () => {
  await databaseConnection
    .connect()
    .then(() => {
      console.log('**** Database Connected Successfully 😁***');
    })
    .catch(() => {
      console.log('*** Database Connection Unsuccessful 😭***');
    });
};
const db = databaseConnection.db();
export {databaseLoader, db};
