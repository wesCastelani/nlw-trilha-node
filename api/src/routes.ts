import { Router } from 'express';
import { SendMailController } from './controllers/SendMailController';
import { SurveysController } from './controllers/SurveysController';
import { UserController } from './controllers/UserController';

const router = Router();

const userController = new UserController();
const surveyesController = new SurveysController();
const sendMailController = new SendMailController();

router.post('/users', userController.create);
router.post('/surveys', surveyesController.create);
router.get('/surveys', surveyesController.show);

router.post('/sendmail', sendMailController.execute);

export { router };
