import {Request, Response, Router} from 'express';
import {
  makeResponse,
  Error,
  messages,
  statusCode,
  handleError,
} from '@lib/index';
import {addUser, getSingleUser, removeUser, updateUser} from '@services/users';
import {validateRequest} from '@middlewares/index';
import {User, userSchema} from '@models/index';
import {ObjectId} from 'mongodb';

const router = Router();

/**
 * CRUD API's for User
 */
router
  .route('/')
  .post(
    validateRequest({body: userSchema}),
    async (req: Request, res: Response<User>) => {
      try {
        const {email} = req.body;

        const userAlreadyExist = await getSingleUser({
          email: email,
          status: {$ne: 'DELETED'},
        });
        if (userAlreadyExist) {
          return handleError(res, messages.en.USER_EXIST);
        } else {
          await addUser(req.body);

          return makeResponse(
            res,
            statusCode.successful,
            true,
            messages.en.ADD
          );
        }
      } catch (error: Error | any) {
        return handleError(res, error.message);
      }
    }
  )
  .put(
    validateRequest({body: userSchema}),
    async (req: Request, res: Response<User>) => {
      try {
        const {userId, email} = req.body;

        const userAlreadyExist = await getSingleUser({
          email: email,
          status: {$ne: 'DELETED'},
          _id: {$ne: new ObjectId(userId)},
        });
        if (userAlreadyExist) {
          return handleError(res, messages.en.USER_EXIST);
        }
        await updateUser({_id: new ObjectId(userId)}, req.body);
        return makeResponse(
          res,
          statusCode.successful,
          true,
          messages.en.UPDATE
        );
      } catch (error: Error | any) {
        return handleError(res, error.message);
      }
    }
  )
  .delete(async (req: Request, res: Response) => {
    try {
      const {ids}: {ids: string[]} = req.body;
      let idsArray = ids.map(id => new ObjectId(id));
      const query = {
        _id: {$in: idsArray},
      };
      await removeUser(query);
      return makeResponse(res, statusCode.successful, true, messages.en.DELETE);
    } catch (error: Error | any) {
      return handleError(res, error.message);
    }
  })
  .get(async (req: Request, res: Response) => {
    try {
      const {id} = req.query as {id: string};
      const user = await getSingleUser({_id: new ObjectId(id)});
      if (user) {
        return makeResponse(
          res,
          statusCode.successful,
          true,
          messages.en.FETCH,
          user
        );
      } else {
        return makeResponse(res, statusCode.notFound, false, messages.en.FETCH);
      }
    } catch (error: Error | any) {
      return handleError(res, error.message);
    }
  });

export const userRouter = router;
