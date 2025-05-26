import express from 'express';
import swaggerRouter from './swagger.js';
import journalsRoutes from './journals.js';
import commentsRoutes from './comments.js';
import userRoutes from "./users.js";
import { version } from '../server.js';
import { HTTP } from '../util/const.js';

const router = express.Router();

router.use('/', swaggerRouter);

router.get('/version', (req, res) => {
  //#swagger.tags = ['Version']
  //#swagger.summary = 'Get API version'
  //#swagger.description = 'Returns the current version of the API'
  res.send(`This is version ${version}`);
});
router.get('/test', (req, res) => {
  const error = new Error('Test error');
  error.status = HTTP.INTERNAL_SERVER_ERROR;
  error.controller = 'TestController';
  throw error;
});

router.use('/journals', journalsRoutes);
router.use('/comments', commentsRoutes);
router.use('/users', userRoutes);


export default router;
