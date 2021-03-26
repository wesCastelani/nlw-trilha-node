import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../Repositories/UserRepository';
import * as yup from 'yup';
import { AppErrors } from '../errors/AppErros';

class UserController {
  async create(req: Request, res: Response) {
    const { name, email } = req.body;

    const schema = yup.object().shape({
      name: yup.string().required('Nome é obrigatorio!'),
      email: yup.string().email().required('Email é obrigatorio!'),
    });

    try {
      await schema.validate(req.body, { abortEarly: false });
    } catch (err) {
      return res.status(400).json({ error: err });
    }

    // if (!(await schema.isValid(req.body))) {
    // return res.status(400).json({ error: 'Validation failed!' });
    //}

    const usersRepository = getCustomRepository(UsersRepository);

    const userAlreadyExists = await usersRepository.findOne({ email });

    if (userAlreadyExists) {
      throw new AppErrors('User already exists!', 400);
    }

    const user = usersRepository.create({ name, email });

    await usersRepository.save(user);
    return res.status(201).json(user);
  }
}

export { UserController };
