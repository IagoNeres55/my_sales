import AppError from '@shared/erros/AppError'
import { usersRepositories } from '../infra/database/repositories/UserRepositories'
import { UserTokensRepositories } from '../infra/database/repositories/UserTokensRepositories'
import { sendEmail } from '@config/email'

export default class SendForgotPasswordEmailService {
  async execute({ email }: { email: string }): Promise<void> {
    const user = await usersRepositories.findByEmail(email)

    if (!user) {
      throw new AppError('Usuário não existe', 404)
    }

    const token = await UserTokensRepositories.generate(user.id)

    sendEmail({
      to: user.email,
      subject: 'Redefinir Senha',
      body: `<!DOCTYPE html>
<html>
<head>
    <title>Redefinição de Senha</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f2f2f2;
        }
        .container {
            width: 100%;
            margin: 0 auto;
            background-color: #fff;
            padding: 20px;
            text-align: center;

        }
        .header {
            text-align: center;
        }
        .content {
            padding: 20px;
        }

       .title {
        text-align: center;
        background-color: #f1f1f1;
        border-radius: 8px

       }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="sua-logo.png" alt="Logo da sua aplicação">
            <h2>Redefinir Senha</h2>
        </div>
        <div class="content">
            <p>Olá, ${user.name},</p>
            <p>Recebemos uma solicitação para redefinir sua senha. Copie o Token abaixo e cole para redefinir</p>
            <h3 class="title" >${token?.token}</h3>
            <p>Se você não solicitou esta redefinição, por favor, ignore este email.</p>
        </div>
        <div class="footer">
            <p>Atenciosamente,</p>
        </div>
    </div>
</body>
</html>`,
    })
  }
}
