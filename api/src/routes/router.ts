import express from 'express';
import { upload } from '../utils';
import { createUserHandlers } from '../handlers';
import { createUserRepo } from '../repositories';
import { createUserValidationMid, updateUserValidationMid, validateUUIDMid } from '../middlewares';
import { Knex } from 'knex';

const router = express.Router();

/* GET home page. */
router.get('/', (_req: express.Request, res: express.Response) => res.send('hello there'));

function setupRouter(db: Knex) {
  const userRepo = createUserRepo(db);
  const userHandlers = createUserHandlers(userRepo);

  router.post('/sign-up', upload.single('avatar'), createUserValidationMid, userHandlers.signUp);
  router.patch('/user/:id', upload.single('avatar'), updateUserValidationMid, userHandlers.updateUser);
  router.get('/user', userHandlers.getUsers);
  router.get('/user/:id', validateUUIDMid, userHandlers.getUser);
  router.delete('/user/:id', validateUUIDMid, userHandlers.deleteUser);
}

export { router, setupRouter };
