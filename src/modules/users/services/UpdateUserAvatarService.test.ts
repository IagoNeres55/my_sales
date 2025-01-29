import uploadConfig from '@config/upload';
import 'reflect-metadata';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import AppError from '@shared/erros/AppError';
import FakeUserRepositories from '../domain/repositories/fakes/FakeUserRepositories';
import fs from 'fs';
import path from 'path';


let fakeUserRepositories: FakeUserRepositories
let updateUserAvatarService: UpdateUserAvatarService


jest.mock('multer', () => {
  return {
    diskStorage: () => ({
      destination: jest.fn(),
      filename: jest.fn(),
    }),
  };
});
jest.mock('fs', () => ({
  promises: {
    stat: jest.fn(),
    unlink: jest.fn(),
  },
  mkdirSync: jest.fn(), // Mock para mkdirSync
}));
jest.mock('typeorm', () => ({
  Entity: () => jest.fn(),
  PrimaryGeneratedColumn: () => jest.fn(),
  Column: () => jest.fn(),
  CreateDateColumn: () => jest.fn(),
  UpdateDateColumn: () => jest.fn(),
  OneToMany: () => jest.fn(),
  ManyToOne: () => jest.fn(),
  JoinColumn: () => jest.fn(),
  getRepository: jest.fn(),
  getConnection: jest.fn(),
  createConnection: jest.fn(),
}));

describe('UpdateUserAvatarService', () => {
  beforeEach(() => {
    fakeUserRepositories = new FakeUserRepositories()
    updateUserAvatarService = new UpdateUserAvatarService(fakeUserRepositories)

    ;(fs.promises.stat as jest.Mock).mockImplementation(() => Promise.resolve({} as any))
    ;(fs.promises.unlink as jest.Mock).mockImplementation(() => Promise.resolve());
  })

  test('Should be able update for avatar', async () => {
   // Mock para simular a verificação do arquivo
   (fs.promises.stat as jest.Mock).mockResolvedValueOnce({} as any);

   // Mock para simular a exclusão do arquivo
   (fs.promises.unlink as jest.Mock).mockResolvedValueOnce('');

   const user = await fakeUserRepositories.create({
    name: 'iago',
    email: 'iago@123.com',
    password: '1234',
    avatar: 'old_avatar.png',
  });

  const updatedUser = await updateUserAvatarService.execute({
    userId: user.id.toString(),
    avatarFileName: 'new_avatar.png',
  });

  await expect(
    updateUserAvatarService.execute({
      userId: '15',
      avatarFileName: 'text',
    }),
  ).rejects.toBeInstanceOf(AppError);

  // const expectedPath = path.resolve(uploadConfig.directory, 'old_avatar.png');
  // const expectedPath = path.normalize(path.join(uploadConfig.directory, 'old_avatar.png'));

    // Debug: Exibe o caminho gerado
    // console.log('Caminho esperado:', expectedPath);

    // Verifica se stat foi chamado com o caminho correto
    // expect(fs.promises.stat).toHaveBeenCalledWith(expectedPath);

    // // Verifica se unlink foi chamado com o caminho correto
    // expect(fs.promises.unlink).toHaveBeenCalledWith(expectedPath);

    // Verifica se o avatar foi atualizado
    expect(updatedUser.avatar).toBe('new_avatar.png');
  })

  // test('Should not remove avatar if no previous avatar exists', async () => {
  //   // Mock do fs.promises.stat para lançar erro (arquivo não encontrado)
  //   const statMock = jest
  //     .spyOn(fs.promises, 'stat')
  //     .mockRejectedValue(new Error('File not found'))
  //   const unlinkMock = jest.spyOn(fs.promises, 'unlink')

  //   // Criação do usuário sem avatar
  //   const user = await fakeUserRepositories.create({
  //     name: 'iago',
  //     email: 'iago@123.com',
  //     password: '1234',

  //   })

  //   // Execução do serviço de atualização de avatar
  //   const updatedUser = await updateUserAvatarService.execute({
  //     userId: user.id.toString(),
  //     avatarFileName: 'new_avatar.jpg',
  //   })

  //   // Verificações
  //   expect(statMock).toHaveBeenCalled() // Deve tentar verificar o arquivo
  //   expect(unlinkMock).not.toHaveBeenCalled() // Não deve tentar excluir
  //   expect(updatedUser.avatar).toBe('new_avatar.jpg') // Avatar atualizado
  // })
})
