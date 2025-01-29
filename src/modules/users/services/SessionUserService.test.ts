import FakeUserRepositories from "../domain/repositories/fakes/FakeUserRepositories"

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import AppError from '@shared/erros/AppError';
import SessionUserService from "./SessionUserService";

let fakeUserRepositories: FakeUserRepositories
let sessionUserService: SessionUserService

jest.mock('bcrypt');
jest.mock('jsonwebtoken');


describe('SessionUserService', () => {
  beforeEach(() => {
    fakeUserRepositories = new FakeUserRepositories()
    sessionUserService = new SessionUserService(fakeUserRepositories)

  })

  test('should return a valid session with token and user data', async () => {
    // Cria um usuário fake
    const user = await fakeUserRepositories.create({
      email: 'user@example.com',
      password: 'hashedPassword',
      name: 'Test User',
    });

    // Mock do bcrypt.compareSync para retornar true (senha válida)
    (bcrypt.compareSync as jest.Mock).mockReturnValue(true);

    // Mock do jwt.sign para retornar um token fake
    (jwt.sign as jest.Mock).mockReturnValue('fake-token');

    const session = await sessionUserService.execute({
      email: 'user@example.com',
      password: 'validPassword',
    });

    // Verifica se o token foi gerado corretamente
    expect(jwt.sign).toHaveBeenCalledWith(
      {},
      process.env.SECRET_KEY_JWT,
      {
        subject: String(user.id),
        expiresIn: '24h',
      },
    );

    // Verifica se a sessão foi retornada corretamente
    expect(session).toEqual({
      user: expect.objectContaining({
        id: user.id,
        email: user.email,
        name: user.name,
      }),
      token_type: 'Bearer',
      access_token: 'fake-token',
    });
  });

  test('should throw an error if the user does not exist', async () => {
    // Mock do bcrypt.compareSync para retornar true (senha válida)
    (bcrypt.compareSync as jest.Mock).mockReturnValue(true);

    // Tenta fazer login com um e-mail que não existe
    await expect(
      sessionUserService.execute({
        email: 'nonexistent@example.com',
        password: 'validPassword',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  test('should throw an error if the password is incorrect', async () => {
    // Cria um usuário fake
    await fakeUserRepositories.create({
      email: 'user@example.com',
      password: 'hashedPassword',
      name: 'Test User',
    });

    // Mock do bcrypt.compareSync para retornar false (senha inválida)
    (bcrypt.compareSync as jest.Mock).mockReturnValue(false);

    // Tenta fazer login com uma senha incorreta
    await expect(
      sessionUserService.execute({
        email: 'user@example.com',
        password: 'invalidPassword',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });



})