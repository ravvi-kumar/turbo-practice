import {User, Users} from '@models/';

/**
 * @param data contains value corresponding to USER Model.
 * @returns Create a Promise that saves a new user document.
     Resolves with the saved user if successful,
     or rejects with an error
 */
export const addUser = (data: User) => {
  return new Promise((resolve, reject) => {
    Users.insertOne(data)
      .then(savedUser => resolve(savedUser))
      .catch((error: Error) => reject(error));
  });
};

/**
 * @param query The filter query object used to find the user document.
 * @param options Additional query options.
 * @returns Returns a Promise that resolves with the user document or rejects with an error.
 */
// export const getSingleUser = (
//   query: object = {},
//   options: object = {}
// ): Promise<User> => {
//   return new Promise(async (resolve, reject) => {
//     await Users.findOne(query)
//       .then((user: User | any) => {
//         resolve(user);
//       })
//       .catch((error: Error) => reject(error));
//   });
// };

export const getSingleUser = async (
  query: object = {},
  options: object = {}
): Promise<User | undefined> => {
  // return new Promise(async (resolve, reject) => {
  //   await Users.findOne(query)
  //     .then((user: User | any) => {
  //       resolve(user);
  //     })
  //     .catch((error: Error) => reject(error));
  // });
  try {
    const user = await Users.findOne(query);
    if (user !== null) {
      return user;
    } else {
      return undefined;
    }
  } catch (err) {}
};

/**
 * @param query The filter query object used to find the user document.
 * @param update The update object specifying the updated fields.
 * @returns Returns a Promise that resolves with the updated user document or rejects with an error.
 */
export const updateUser = (
  query: object = {},
  update: object = {}
): Promise<User> => {
  return new Promise<User>((resolve, reject) => {
    Users.findOneAndUpdate(query, {$set: update}, {upsert: true})
      .then((result: any) => resolve(result))
      .catch((error: Error) => reject(error));
  });
};

/**
 * @param query The filter query object used to find the user document.
 * @param options Additional query options.
 * @returns Returns a Promise that resolves with the array of users documents or rejects with an error.
 */
export const getUsers = async (
  query: object = {},
  options: object = {}
): Promise<User[]> => {
  try {
    const users = await Users.find(query, options).sort({_id: -1}).toArray();
    return users;
  } catch (error) {
    throw error;
  }
};

/**
 * @param query The filter query object used to find the user document.
 * @returns Returns a Promise that resolves with the updated user document or rejects with an error.
 */
export const removeUser = (query = {}): Promise<User | null> =>
  new Promise<User>((resolve, reject) => {
    Users.updateMany(query, {$set: {status: 'DELETED'}})
      .then((result: any) => resolve(result))
      .catch(reject);
  });
