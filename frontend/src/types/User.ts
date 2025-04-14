export type User = {
  id: number
  name: string
};

export type InputRegisterUser = {
  name: string
  email: string
  password: string
}

export type InputLoginUser = {
  email: string
  password: string
}