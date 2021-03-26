import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { SurveysUsersRepository } from '../Repositories/SurveysUsersRepository';

class NpsController {
  async execute(req: Request, res: Response) {
    const { survey_id } = req.params;
    console.log(survey_id);

    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    const surveysUsers = await surveysUsersRepository.find({ survey_id });
    console.log(surveysUsers);

    const detractor = surveysUsers.filter((survey) => {
      survey.value >= 0 && survey.value <= 6;
    }).length;

    const promoters = surveysUsers.filter(
      (survey) => survey.value >= 9 && survey.value <= 10
    ).length;

    const passive = surveysUsers.filter(
      (survey) => survey.value >= 7 && survey.value <= 8
    ).length;

    const totalAnswers = surveysUsers.length;

    const nps = Number(
      (((promoters - detractor) / totalAnswers) * 100).toFixed(2)
    );

    return res.json({ detractor, promoters, passive, totalAnswers, nps });
  }
}

export { NpsController };
