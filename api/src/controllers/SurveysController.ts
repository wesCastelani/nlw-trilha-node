import { Request, response, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { SurveyesRepository } from '../Repositories/SurveysRepository';

class SurveysController {
  async create(req: Request, res: Response) {
    const { title, description } = req.body;

    const surveysRepository = getCustomRepository(SurveyesRepository);

    const survey = surveysRepository.create({
      title,
      description,
    });

    await surveysRepository.save(survey);

    return res.status(201).json(survey);
  }

  async show(req: Request, res: Response) {
    const surveysRepository = getCustomRepository(SurveyesRepository);

    const data = await surveysRepository.find();

    return res.json(data);
  }
}

export { SurveysController };
