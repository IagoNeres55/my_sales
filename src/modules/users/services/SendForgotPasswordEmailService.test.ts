import FakeUserRepositories from '../domain/repositories/fakes/FakeUserRepositories'
import FakeUserTokenRepositories from '../domain/repositories/fakes/FakeUserTokenRepositories'
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService'
import { sendEmail } from '@config/email'
let fakeUserTokensRepositories: FakeUserTokenRepositories
let fakeUserRepositories: FakeUserRepositories
let sendForgotPassword: SendForgotPasswordEmailService
import AppError from '@shared/erros/AppError'



describe('SendForgotPasswordEmailService.test', () => {
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
    })

    await sendForgotPassword.execute({ email: 'user@example.com' })

    const token = await fakeUserTokensRepositories.generate(user.id)

    // expect(
    //   await fakeUserRepositories.findByEmail('testNotEmail@gmail.com'),
    // ).rejects.toHaveProperty('statusCode', 404)

    expect(sendEmail).toHaveBeenCalledWith({
      to: user.email,
      subject: 'Redefinir Senha',
      body: token.token,
    });
  })

  test('should not send an email if the user does not exist', async () => {
    await expect(
      sendForgotPassword.execute({ email: 'nonexistent@example.com' }),
    ).rejects.toBeInstanceOf(AppError)

    expect(sendEmail).not.toHaveBeenCalled()
  })
})
