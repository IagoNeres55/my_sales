import UserToken from "@modules/users/infra/database/entities/UserToken";

export default interface IUserTokensRepository{
  findByToken(token: string): Promise<UserToken | null>
  generate(user_id: number): Promise<UserToken | undefined>
}