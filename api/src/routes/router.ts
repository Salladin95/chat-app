import { Knex } from 'knex';
import express from 'express';
import { upload } from '../utils';
import { createUserHandlers } from '../handlers';
import { createUserRepo } from '../repositories';
import { checkUserId, createUserValidationMid, isAdminMiddleware, signInValidationMid, updateUserValidationMid, verifyToken } from '../middlewares';

const router = express.Router();

/* GET home page. */
router.get('/', (_req: express.Request, res: express.Response) => res.send('hello there'));

function setupRouter(db: Knex) {
  const userRepo = createUserRepo(db);
  const userHandlers = createUserHandlers(userRepo);

  router.post('/sign-up', upload.single('avatar'), createUserValidationMid, userHandlers.signUp);
  router.post('/sign-in', signInValidationMid, userHandlers.signIn);

  router.get('/user', isAdminMiddleware(userRepo), userHandlers.getUsers);

  router.patch('/user/:userId', verifyToken, upload.single('avatar'), updateUserValidationMid, userHandlers.updateUser);
  router.get('/user/:userId', checkUserId, userHandlers.getUser);
  router.delete('/user/:userId', verifyToken, userHandlers.deleteUser);
}

export { router, setupRouter };
