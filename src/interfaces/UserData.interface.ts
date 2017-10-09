export interface UserAuth {
  email:string,
  password:string,
}

export interface UserReg {
  email:string,
  password:string,
  name:string,
}

export interface UserData {
  PK:undefined,
  authId:string,
  email:string,
  password:string,
  sex:string,
  birth:string,
  age:number,
  date:string,
  salt:string,
  name:string,
}
