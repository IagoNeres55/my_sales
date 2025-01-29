import FakeUserRepositories from '../domain/repositories/fakes/FakeUserRepositories'
import FakeUserTokenRepositories from '../domain/repositories/fakes/FakeUserTokenRepositories'
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService'
import { sendEmail } from '@config/email'
import AppError from '@shared/erros/AppError'
let fakeUserTokensRepositories: FakeUserTokenRepositories
let fakeUserRepositories: FakeUserRepositories
let sendForgotPassword: SendForgotPasswordEmailService

jest.mock('@config/email', () => ({
  sendEmail: jest.fn(),
}))

describe('SendForgotPasswordEmailService', () => {
  beforeEach(() => {
    fakeUserTokensRepositories = new FakeUserTokenRepositories()
    fakeUserRepositories = new FakeUserRepositories()
    sendForgotPassword = new SendForgotPasswordEmailService(
      fakeUserRepositories,
      fakeUserTokensRepositories,
    )
  })

  test('should send a forgot password email to a valid user', async () => {
    const user = await fakeUserRepositories.create({
      email: 'user@example.com',
      password: '123456',
      name: 'Test User',
    });

    // Mock the token generation
    const mockToken = 'mocked-token-123';
    jest.spyOn(fakeUserTokensRepositories, 'generate').mockResolvedValueOnce({
      id: 1,
      token: mockToken,
      user_id: user.id,
      created_at: new Date(),
      updated_at: new Date(),
    });

    await sendForgotPassword.execute({ email: 'user@example.com' });

    expect(sendEmail).toHaveBeenCalledWith({
      to: user.email,
      subject: 'Redefinir Senha',
      body: expect.stringContaining(mockToken),
    });
  });

  test('should not send an email if the user does not exist', async () => {
    await expect(
      sendForgotPassword.execute({ email: 'nonexistent@example.com' }),
    ).rejects.toBeInstanceOf(AppError)

    // Verify that sendEmail was not called
    expect(sendEmail).not.toHaveBeenCalled()
  })
})