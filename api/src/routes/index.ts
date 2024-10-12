import express from 'express';

const router = express.Router();

/* GET home page. */
router.get('/', (_req: express.Request, res: express.Response) => res.send('hello there'));

export default router;
