// O que ele faz?

// Ele adiciona um campo user do tipo { id: string }
// dentro da Request do Express. Isso é útil quando você
// trabalha com autenticação e deseja adicionar informações
// do usuário autenticado ao objeto req de forma tipada.
declare namespace Express {
  export interface Request {
    user: {
      id: string
    }
  }
}
