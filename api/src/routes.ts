import { Router } from 'express';
import { SurveysController } from './controllers/SurveysController';
import { UserController } from './controllers/UserController';

const router = Router();

const userController = new UserController();
const surveyesController = new SurveysController();

router.post('/users', userController.create);
router.post('/surveys', surveyesController.create);
router.get('/surveys', surveyesController.show);

export { router };
