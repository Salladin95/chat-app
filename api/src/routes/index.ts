import path from 'path';
import dotenv from 'dotenv';
import express from 'express';
import { connectToDb, upload } from '../utils';
import { createUserHandlers } from '../handlers';
import { createUserRepo } from '../repositories';
import { userValidationMid, validateUUIDMid } from '../middlewares';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const router = express.Router();

/* GET home page. */
router.get('/', (_req: express.Request, res: express.Response) => res.send('hello there'));

const uri = process.env.DB_URL;
(async function () {
  if (uri) {
    const db = await connectToDb(uri);
    const userRepo = createUserRepo(db);
    const userHandlers = createUserHandlers(userRepo);

    router.post('/sign-up', userValidationMid, upload.single('avatar'), userHandlers.signUp);
    // TODO: NEED TO MAKE ADDITIONAL ADJUSTMENTS
    router.patch('/user', userValidationMid, upload.single('avatar'), userHandlers.updateUser);
    router.get('/user', userHandlers.getUsers);
    router.get('/user/:id', validateUUIDMid, userHandlers.getUser);
    router.delete('/user/:id', validateUUIDMid, userHandlers.getUser);
  } else {
    console.error('process.env.DB_URL IS MISSING');
    process.exit(1);
  }
})();

export default router;
