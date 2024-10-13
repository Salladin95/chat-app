import Joi from 'joi';
import express from 'express';
import { upload } from '../utils';

const router = express.Router();

/* GET home page. */
router.get('/', (_req: express.Request, res: express.Response) => res.send('hello there'));

const userSchema = Joi.object({
  username: Joi.string().min(1).required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  repeatPassword: Joi.ref('password'),
  email: Joi.string().email().required(),
  avatar: Joi.string(),
}).with('password', 'repeatPassword'); //Ensures that if a password is provided, repeat_password must also be present.

export type SignUpDto = {
  username: string;
  password: string;
  repeatPassword: string;
  email: string;
  avatar?: Express.Multer.File;
};

router.post('/sign-up', upload.single('avatar'), (request: express.Request, res: express.Response) => {
  try {
    const dto = { ...request.body, avatar: request.file?.path };
    const { error } = userSchema.validate(dto);

    if (error) return res.status(400).json({ message: error.details[0].message });

    res.status(201).json({ message: 'User has been validated successfully', dto });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
