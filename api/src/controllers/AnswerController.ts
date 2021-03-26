import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { AppErrors } from '../errors/AppErros';
import { SurveysUsersRepository } from '../Repositories/SurveysUsersRepository';

class AnswerController {
  async execute(req: Request, res: Response) {
    const { value } = req.params;
    const { u } = req.query;
    console.log(value);
    console.log(u);

    const surveyUserRepository = getCustomRepository(SurveysUsersRepository);

    const surveyUser = await surveyUserRepository.findOne({
      id: String(u),
    });

    if (!surveyUser) {
      throw new AppErrors('Survey user does not exist!', 400);
      //return res.status(400).json({ erro: 'Survey user does not exist!' });
    }
    surveyUser.value = Number(value);

    await surveyUserRepository.save(surveyUser);

    return res.json(surveyUser);
  }
}

export { AnswerController };
