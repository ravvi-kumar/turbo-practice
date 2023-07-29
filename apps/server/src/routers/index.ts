import {Router} from 'express';
import {userRouter} from '../controllers';

const router = Router();

router.get('/health', (req, res) => {
  res.json({msg: 'success'});
});

router.use('/user', userRouter);

export {router};
